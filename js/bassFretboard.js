import {enharmonics, openNotes} from "./constants";

function adaptNotesForScale(notes, scale) {
  return scale.reduce((acc, note) => {
    const enharmonic = enharmonics[note];
    return enharmonic ? acc.map((n) => (n === enharmonic ? note : n)) : acc;
  }, notes);
}

export class BassFretboard {
  static canvasWidth = 300;
  static canvasHeight = 150;

  constructor({
                notes,
                scale,
                startFret,
                endFret,
                stringCount = 4,
              }) {
    const {canvasWidth, canvasHeight} = BassFretboard

    this.notes = adaptNotesForScale(notes, scale);
    this.openNotes = adaptNotesForScale(openNotes, scale);
    this.startFret = startFret;
    this.endFret = endFret;
    this.scale = scale;
    this.stringCount = stringCount;

    this.fretCount = endFret - startFret + 1;
    this.fretWidth = canvasWidth / this.fretCount;
    this.fretHeight = canvasHeight / (stringCount + 1);

    this.emptyFretCount = Math.max(startFret, 1) - startFret
    this.fretboardOffset = this.fretWidth * this.emptyFretCount
  }

  calculateNoteOnFret(string, fret) {
    const {openNotes, notes} = this

    const openNoteIndex = notes.indexOf(openNotes[string - 1]);
    return notes[(openNoteIndex + fret) % notes.length];
  }

  drawFretboardBackground(ctx) {
    const {fretHeight, fretboardOffset} = this
    const {canvasWidth, canvasHeight} = BassFretboard

    ctx.fillStyle = "#f0e4d7";
    ctx.fillRect(fretboardOffset, fretHeight, canvasWidth, canvasHeight - fretHeight);
  }

  drawFretLines(ctx) {
    const {fretWidth, fretHeight, fretCount, emptyFretCount, fretboardOffset} = this;
    const {canvasHeight} = BassFretboard


    for (let i = emptyFretCount; i <= fretCount; i++) {
      const x = i * fretWidth;
      ctx.beginPath();
      ctx.moveTo(x, fretHeight);
      ctx.lineTo(x, canvasHeight);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  drawStrings(ctx) {
    const {stringCount, fretHeight, fretboardOffset} = this;
    const {canvasWidth} = BassFretboard


    for (let i = 0; i <= stringCount; i++) {
      const y = (i + 1) * fretHeight;
      ctx.beginPath();
      ctx.moveTo(fretboardOffset, y);
      ctx.lineTo(canvasWidth, y);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  drawFretMarkers(ctx) {
    const fretMarkers = [3, 5, 7, 9, 15, 17, 19];
    const {fretCount, startFret, fretWidth, fretHeight} = this;
    const {canvasHeight} = BassFretboard

    for (let i = 0; i < fretCount; i++) {
      const fretNum = startFret + i;
      const x = (i + 0.5) * fretWidth;
      const y = fretHeight + (canvasHeight - fretHeight) / 2;

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
    const {fretCount, startFret, fretWidth, fretHeight} = this;
    const headerY = fretHeight / 2;

    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "#000";

    for (let i = 0; i < fretCount; i++) {
      const fretNum = startFret + i;
      const x = (i + 0.5) * fretWidth;

      if (fretNum >= 1) {
        ctx.fillText(fretNum, x, headerY);
      }
    }
  }

  drawScaleNotes(ctx) {
    const {stringCount, startFret, fretCount, fretWidth, fretHeight, scale} = this;

    ctx.font = "12px Arial";
    ctx.textAlign = "center";

    for (let string = 1; string <= stringCount; string++) {
      for (let fret = startFret; fret <= fretCount + startFret - 1; fret++) {
        const note = this.calculateNoteOnFret(string, fret);

        if (scale.includes(note)) {
          const x = (fret - startFret + 0.5) * fretWidth;
          const y = string * fretHeight + fretHeight / 2;

          ctx.beginPath();
          ctx.arc(x, y, 12, 0, Math.PI * 2);
          ctx.fillStyle = "#fff";
          ctx.fill();
          ctx.strokeStyle = "#000";
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = "#000";
          ctx.fillText(note, x, y + 3);
        }
      }
    }
  }

  draw(ctx) {
    this.drawFretboardBackground(ctx);
    this.drawFretHeaders(ctx);
    this.drawFretLines(ctx);
    this.drawStrings(ctx);
    this.drawFretMarkers(ctx);
    this.drawScaleNotes(ctx);
  }
}
