
const canvasWidth = 300
const canvasHeight = 150

const sharpNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const flatNotes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const enharmonics = { "Cb": "B", "Fb": "E", "B#": "C", "E#": "F" };
const openNotes = ["E", "A", "D", "G"]

function adaptNotesForScale(notes, scale) {
  return scale.reduce((acc, note) => {
    const enharmonic = enharmonics[note];
    return enharmonic ? acc.map((n) => (n === enharmonic ? note : n)) : acc;
  }, notes);
}

class BassFretboard {

  constructor(config) {
    this.notes = adaptNotesForScale(config.notes, config.scale);
    this.openNotes = adaptNotesForScale(openNotes, config.scale);
    this.startFret = config.startFret
    this.endFret = config.endFret
    this.scale = config.scale;
    this.stringCount = config.stringCount || 4

    this.fretCount = this.endFret - this.startFret + 1;
    this.fretWidth = canvasWidth / this.fretCount;
    this.fretHeight = canvasHeight / (this.stringCount + 1);

    this.fretboardOffset = this.fretWidth * (
      Math.max(this.startFret, 1) - this.startFret
    )
  }

  calculateNoteOnFret(string, fret, notes, openNotes) {
    const openNoteIndex = this.notes.indexOf(this.openNotes[string - 1]);
    return this.notes[(openNoteIndex + fret) % this.notes.length];
  }

  drawFretboardBackground(ctx) {
    ctx.fillStyle = "#f0e4d7";
    ctx.fillRect(this.fretboardOffset, this.fretHeight, canvasWidth, canvasHeight - this.fretHeight);
  }

  drawFretLines(ctx) {
    for (let i = this.fretboardOffset / this.fretWidth; i <= this.fretCount; i++) {
      const x = i * this.fretWidth;
      ctx.beginPath();
      ctx.moveTo(x, this.fretHeight);
      ctx.lineTo(x, canvasHeight);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  drawStrings(ctx) {
    for (let i = 0; i <= this.stringCount; i++) {
      const y = (i + 1) * this.fretHeight;
      ctx.beginPath();
      ctx.moveTo(this.fretboardOffset, y);
      ctx.lineTo(canvasWidth, y);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  drawFretMarkers(ctx) {
    const fretMarkers = [3, 5, 7, 9, 15, 17, 19];
    for (let i = 0; i < this.fretCount; i++) {
      const fretNum = this.startFret + i;
      const x =  (i + 0.5) * this.fretWidth;
      const y = this.fretHeight + (canvasHeight - this.fretHeight) / 2;

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
    const headerY = this.fretHeight / 2;  // Posiziona il numero al centro del tasto

    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "#000";
    for (let i = 0; i < this.fretCount; i++) {
      const fretNum = this.startFret + i;
      const x = (i + 0.5) * this.fretWidth;
      if (fretNum >= 1) {
        ctx.fillText(fretNum, x, headerY);  // Centra il numero nella parte superiore
      }
    }
  }

  drawScaleNotes(ctx) {
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    for (let string = 1; string <= this.stringCount; string++) {
      for (let fret = this.startFret; fret <= this.fretCount + this.startFret - 1; fret++) {
        const note = this.calculateNoteOnFret(string, fret);
        if (this.scale.includes(note)) {
          const x = (fret - this.startFret + 0.5) * this.fretWidth;
          const y = string * this.fretHeight + this.fretHeight / 2;

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

const scales = {
  C: ["C", "D", "E", "F", "G", "A", "B"],
  F: ["F", "G", "A", "Bb", "C", "D", "E"],
  Bb: ["Bb", "C", "D", "Eb", "F", "G", "A"],
  Eb: ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
  Ab: ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
  Db: ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
  Gb: ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"],
  Cb: ["Cb", "Db", "Eb", "Fb", "Gb", "Ab", "Bb"],
};

function drawFretboardForScale(scaleKey, scaleNotes, configurations) {
  configurations.forEach(({ startFret, endFret }, index) => {
    const canvasId = [scaleKey, index + 1].join("-")
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    const config = {
      notes: flatNotes,
      stringCount: 4,
      startFret,
      endFret,
      scale: scaleNotes,
    };
    (new BassFretboard(config)).draw(ctx)
  });
}

// Configurazioni per ogni scala
const scaleConfigurations = {
  C: [
    { startFret: 0, endFret: 4 },
    { startFret: 2, endFret: 5 },
    { startFret: 4, endFret: 8 },
    { startFret: 7, endFret: 10 },
    { startFret: 9, endFret: 13 },
  ],
  F: [
    { startFret: 0, endFret: 4 },
    { startFret: 2, endFret: 6 },
    { startFret: 5, endFret: 8 },
    { startFret: 7, endFret: 10 },
    { startFret: 9, endFret: 13 },
  ],
  Bb: [
    { startFret: 0, endFret: 4 },
    { startFret: 2, endFret: 6 },
    { startFret: 5, endFret: 8 },
    { startFret: 7, endFret: 11 },
    { startFret: 10, endFret: 13 },
  ],
  Eb: [
    { startFret: 0, endFret: 4 },
    { startFret: 3, endFret: 6 },
    { startFret: 5, endFret: 8 },
    { startFret: 7, endFret: 11 },
    { startFret: 10, endFret: 13 },
  ],
  Ab: [
    { startFret: 0, endFret: 4 },
    { startFret: 3, endFret: 6 },
    { startFret: 5, endFret: 9 },
    { startFret: 8, endFret: 11 },
    { startFret: 10, endFret: 13 },
  ],
  Db: [
    { startFret: 0, endFret: 4 },
    { startFret: 3, endFret: 6 },
    { startFret: 5, endFret: 9 },
    { startFret: 8, endFret: 11 },
    { startFret: 10, endFret: 14 },
  ],
  Gb: [
    { startFret: 0, endFret: 4 },
    { startFret: 3, endFret: 7 },
    { startFret: 6, endFret: 9 },
    { startFret: 8, endFret: 11 },
    { startFret: 10, endFret: 14 },
  ],
  Cb: [
    { startFret: 0, endFret: 4 },
    { startFret: 3, endFret: 7 },
    { startFret: 6, endFret: 9 },
    { startFret: 8, endFret: 12 },
    { startFret: 11, endFret: 14 },
  ],
};

function createBassFretboard(scaleKey, index) {
  const canvasElement = document.createElement('canvas')
  canvasElement.id = [scaleKey, index + 1].join("-")
  const {startFret, endFret} = scaleConfigurations[scaleKey][index]
  const fretboard = new BassFretboard({notes: flatNotes, scale: scales[scaleKey], startFret, endFret});
  fretboard.draw(canvasElement.getContext("2d"))
  return canvasElement
}

document.querySelectorAll('.scale')
  .forEach((parent) => {
    const {id: scaleKey} = parent
    const span = document.createElement("span")
    span.innerText = scaleKey;
    parent.append(span);
    [...Array(5).keys()].forEach((index) => {
      parent.append(createBassFretboard(scaleKey, index));
    })
});
