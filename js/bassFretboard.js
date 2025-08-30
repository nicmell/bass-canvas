import {colors} from "./constants";
import {noteName, noteGrade, gradeName} from "./utils";

const clamp = (value, lowerBound, upperBound) => {
    return Math.max(Math.min(value, Math.max(lowerBound, upperBound)), Math.min(lowerBound, upperBound));
};

export class BassFretboard {
    static canvasWidth = 300;
    static canvasHeight = 150;

    constructor({
                    notes,
                    openNotes,
                    scale,
                    startFret,
                    endFret,
                    startNoteFret = startFret,
                    endNoteFret = endFret,
                    mode,
                    stringCount = 4,
                    drawHeader = true,
                    drawFretboard = true,
                    noteGrade = false
                }) {

        this.drawHeader = drawHeader;
        this.drawFretboard = drawFretboard;
        this.noteGrade = noteGrade;

        this.notes = notes;
        this.openNotes = openNotes;

        this.startFret = startFret;
        this.endFret = endFret;

        this.startNoteFret = startNoteFret;
        this.endNoteFret = endNoteFret;

        this.scale = scale;
        this.stringCount = stringCount;

        this.fretCount = endFret - startFret + 1;
        this.noteFretCount = endNoteFret - startNoteFret + 1;

        this.emptyFretCount = Math.max(startFret, 1) - startFret

        this.mode = mode
    }

    fretWidth(ctx) {
        return ctx.canvas.width / this.fretCount;
    }

    fretHeight(ctx) {
        return (ctx.canvas.height - this.headerHeight(ctx)) / this.stringCount;
    }

    fretboardOffset(ctx) {
        return this.fretWidth(ctx) * this.emptyFretCount
    }

    headerHeight(ctx) {
        return this.drawHeader ? ctx.canvas.height / (this.stringCount + 1) : 0;
    }

    calculateNoteOnFret(string, fret) {
        const {openNotes, notes} = this

        const openNoteIndex = notes.indexOf(openNotes[string - 1]);
        return notes[(openNoteIndex + fret) % notes.length];
    }

    drawFretboardBackground(ctx) {
        const fretHeight = this.fretHeight(ctx)
        const fretboardOffset = this.fretboardOffset(ctx)

        const headerHeight = this.headerHeight(ctx)

        ctx.fillStyle = "#f0e4d7";
        ctx.fillRect(fretboardOffset, this.drawHeader ? fretHeight : 0, ctx.canvas.width, ctx.canvas.height - headerHeight);
    }

    drawFretLines(ctx) {
        const {fretCount, emptyFretCount} = this;
        const fretWidth = this.fretWidth(ctx)
        const headerHeight = this.headerHeight(ctx)

        for (let i = emptyFretCount; i <= fretCount; i++) {
            const x = clamp(i * fretWidth, 1, ctx.canvas.width - 1);
            ctx.beginPath();
            ctx.moveTo(x, headerHeight);
            ctx.lineTo(x, ctx.canvas.height);
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }

    drawStrings(ctx) {
        const {stringCount} = this;

        const fretHeight = this.fretHeight(ctx)
        const fretboardOffset = this.fretboardOffset(ctx)

        const headerHeight = this.headerHeight(ctx)

        for (let i = 0; i <= stringCount; i++) {
            const y = clamp(headerHeight + i * fretHeight, 1, ctx.canvas.height - 1);
            ctx.beginPath();
            ctx.moveTo(fretboardOffset, y);
            ctx.lineTo(ctx.canvas.width, y);
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }

    drawFretMarkers(ctx) {
        const fretMarkers = [3, 5, 7, 9, 15, 17, 19];
        const {fretCount, startFret} = this;
        const fretWidth = this.fretWidth(ctx)
        const fretHeight = this.fretHeight(ctx)
        const headerHeight = this.headerHeight(ctx)

        for (let i = 0; i < fretCount; i++) {
            const fretNum = startFret + i;
            const x = (i + 0.5) * fretWidth;
            const y = headerHeight + (this.stringCount * fretHeight) / 2;

            if (fretNum >= 1 && fretMarkers.includes(fretNum)) {
                ctx.beginPath();
                ctx.arc(x, y, 8, 0, Math.PI * 2);
                ctx.fillStyle = "#000";
                ctx.fill();
            }

            if (fretNum === 12) {
                ctx.beginPath();
                ctx.arc(x, y - 10, 8, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x, y + 10, 8, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    drawFretHeaders(ctx) {
        const {fretCount, startFret} = this;
        const fretWidth = this.fretWidth(ctx)
        const fretHeight = this.fretHeight(ctx)

        const headerY = fretHeight / 2;

        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "#000";

        for (let i = 0; i < fretCount; i++) {
            const fretNum = startFret + i;
            const x = (i + 0.5) * fretWidth;
            ctx.fillText(fretNum, x, headerY);
        }
    }

    drawScaleNotes(ctx) {
        const {
            stringCount, startFret, startNoteFret, fretCount, noteFretCount, scale, mode
        } = this;
        const fretWidth = this.fretWidth(ctx)
        const fretHeight = this.fretHeight(ctx)
        const headerHeight = this.headerHeight(ctx)

        ctx.font = "12px Arial";
        ctx.textAlign = "center";

        for (let string = 1; string <= stringCount; string++) {

            for (let fret = startNoteFret; fret <= noteFretCount + startNoteFret - 1; fret++) {
                const noteOffset = fretWidth * (startNoteFret - startFret);

                const note = this.calculateNoteOnFret(string, fret);
                const text = this.noteGrade ? gradeName(scale.indexOf(note)) : noteName(note);

                if (scale.includes(note)) {
                    const x = noteOffset + (fret - startNoteFret + 0.5) * fretWidth;
                    const y = headerHeight + (stringCount - string) * fretHeight + fretHeight / 2;

                    ctx.beginPath();
                    ctx.arc(x, y, 12, 0, Math.PI * 2);

                    if (mode) {
                        const {light, dark} = colors[mode]
                        if (note === scale[0]) {
                            ctx.fillStyle = dark
                        } else {
                            ctx.fillStyle = light
                        }
                    } else {
                        ctx.fillStyle = "#fff";
                    }
                    ctx.fill();
                    ctx.strokeStyle = "#000";
                    ctx.lineWidth = 1;
                    ctx.stroke();

                    ctx.fillStyle = "#000";
                    ctx.fillText(text, x, y + 3);
                }
            }
        }
    }

    draw(ctx) {
        if (this.drawHeader) {
            this.drawFretHeaders(ctx);
        }
        if (this.drawFretboard) {
            this.drawFretboardBackground(ctx);
            this.drawFretLines(ctx);
            this.drawStrings(ctx);
            this.drawFretMarkers(ctx);
        }
        this.drawScaleNotes(ctx);
    }

    static draw(ctx, options) {
        (new BassFretboard(options)).draw(ctx);
    }

}
