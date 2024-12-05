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
  constructor(canvasId, config) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.notes = adaptNotesForScale(config.notes, config.scale);
    this.openNotes = adaptNotesForScale(openNotes, config.scale);
    this.startFret = config.startFret
    this.endFret = config.endFret
    this.scale = config.scale;
    this.stringCount = config.stringCount

    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.fretCount = this.endFret - this.startFret + 1;
    this.fretWidth = this.canvasWidth / this.fretCount;
    this.fretHeight = this.canvasHeight / (this.stringCount + 1);

    this.fretboardOffset = this.fretWidth * (
      Math.max(this.startFret, 1) - this.startFret
    )
  }

  calculateNoteOnFret(string, fret, notes, openNotes) {
    const openNoteIndex = this.notes.indexOf(this.openNotes[string - 1]);
    return this.notes[(openNoteIndex + fret) % this.notes.length];
  }

  drawFretboardBackground() {
    this.ctx.fillStyle = "#f0e4d7";
    this.ctx.fillRect(this.fretboardOffset, this.fretHeight, this.canvasWidth, this.canvasHeight - this.fretHeight);
  }

  drawFretLines() {
    for (let i = this.fretboardOffset / this.fretWidth; i <= this.fretCount; i++) {
      const x = i * this.fretWidth;
      this.ctx.beginPath();
      this.ctx.moveTo(x, this.fretHeight);
      this.ctx.lineTo(x, this.canvasHeight);
      this.ctx.strokeStyle = "#000";
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    }
  }

  drawStrings() {
    for (let i = 0; i <= this.stringCount; i++) {
      const y = (i + 1) * this.fretHeight;
      this.ctx.beginPath();
      this.ctx.moveTo(this.fretboardOffset, y);
      this.ctx.lineTo(this.canvasWidth, y);
      this.ctx.strokeStyle = "#000";
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    }
  }

  drawFretMarkers() {
    const fretMarkers = [3, 5, 7, 9, 15, 17, 19];
    for (let i = 0; i < this.fretCount; i++) {
      const fretNum = this.startFret + i;
      const x =  (i + 0.5) * this.fretWidth;
      const y = this.fretHeight + (this.canvasHeight - this.fretHeight) / 2;

      if (fretNum >= 1 && fretMarkers.includes(fretNum)) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 8, 0, Math.PI * 2);
        this.ctx.fillStyle = "#000";
        this.ctx.fill();
      }

      if (fretNum === 12) {
        this.ctx.beginPath();
        this.ctx.arc(x, y - 10, 8, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(x, y + 10, 8, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
  }

  drawFretHeaders() {
    const fretHeight = (this.canvasHeight - this.fretHeight) / (this.endFret - this.startFret + 1); // Altezza di un tasto
    const headerY = this.fretHeight / 2;  // Posiziona il numero al centro del tasto

    this.ctx.font = "16px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#000";
    for (let i = 0; i < this.fretCount; i++) {
      const fretNum = this.startFret + i;
      const x = (i + 0.5) * this.fretWidth;
      if (fretNum >= 1) {
        this.ctx.fillText(fretNum, x, headerY);  // Centra il numero nella parte superiore
      }
    }
  }

  drawScaleNotes() {
    this.ctx.font = "12px Arial";
    this.ctx.textAlign = "center";
    for (let string = 1; string <= this.stringCount; string++) {
      for (let fret = this.startFret; fret <= this.fretCount + this.startFret - 1; fret++) {
        const note = this.calculateNoteOnFret(string, fret);
        if (this.scale.includes(note)) {
          const x = (fret - this.startFret + 0.5) * this.fretWidth;
          const y = string * this.fretHeight + this.fretHeight / 2;

          this.ctx.beginPath();
          this.ctx.arc(x, y, 12, 0, Math.PI * 2);
          this.ctx.fillStyle = "#fff";
          this.ctx.fill();
          this.ctx.strokeStyle = "#000";
          this.ctx.lineWidth = 1;
          this.ctx.stroke();

          this.ctx.fillStyle = "#000";
          this.ctx.fillText(note, x, y + 3);
        }
      }
    }
  }

  draw() {
    this.drawFretboardBackground();
    this.drawFretHeaders();
    this.drawFretLines();
    this.drawStrings();
    this.drawFretMarkers();
    this.drawScaleNotes();
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
  configurations.forEach(({ canvasId, startFret, endFret }) => {
    const config = {
      notes: flatNotes,
      stringCount: 4,
      startFret,
      endFret,
      scale: scaleNotes,
    };
    const fretboard = new BassFretboard(canvasId, config);
    fretboard.draw();
  });
}

// Configurazioni per ogni scala
const scaleConfigurations = {
  C: [
    { canvasId: "C-1", startFret: 0, endFret: 4 },
    { canvasId: "C-2", startFret: 2, endFret: 5 },
    { canvasId: "C-3", startFret: 4, endFret: 8 },
    { canvasId: "C-4", startFret: 7, endFret: 10 },
    { canvasId: "C-5", startFret: 9, endFret: 13 },
  ],
  F: [
    { canvasId: "F-1", startFret: 0, endFret: 4 },
    { canvasId: "F-2", startFret: 2, endFret: 6 },
    { canvasId: "F-3", startFret: 5, endFret: 8 },
    { canvasId: "F-4", startFret: 7, endFret: 10 },
    { canvasId: "F-5", startFret: 9, endFret: 13 },
  ],
  Bb: [
    { canvasId: "Bb-1", startFret: 0, endFret: 4 },
    { canvasId: "Bb-2", startFret: 2, endFret: 6 },
    { canvasId: "Bb-3", startFret: 5, endFret: 8 },
    { canvasId: "Bb-4", startFret: 7, endFret: 11 },
    { canvasId: "Bb-5", startFret: 10, endFret: 13 },
  ],
  Eb: [
    { canvasId: "Eb-1", startFret: 0, endFret: 4 },
    { canvasId: "Eb-2", startFret: 3, endFret: 6 },
    { canvasId: "Eb-3", startFret: 5, endFret: 8 },
    { canvasId: "Eb-4", startFret: 7, endFret: 11 },
    { canvasId: "Eb-5", startFret: 10, endFret: 13 },
  ],
  Ab: [
    { canvasId: "Ab-1", startFret: 0, endFret: 4 },
    { canvasId: "Ab-2", startFret: 3, endFret: 6 },
    { canvasId: "Ab-3", startFret: 5, endFret: 9 },
    { canvasId: "Ab-4", startFret: 8, endFret: 11 },
    { canvasId: "Ab-5", startFret: 10, endFret: 13 },
  ],
  Db: [
    { canvasId: "Db-1", startFret: 0, endFret: 4 },
    { canvasId: "Db-2", startFret: 3, endFret: 6 },
    { canvasId: "Db-3", startFret: 5, endFret: 9 },
    { canvasId: "Db-4", startFret: 8, endFret: 11 },
    { canvasId: "Db-5", startFret: 10, endFret: 14 },
  ],
  Gb: [
    { canvasId: "Gb-1", startFret: 0, endFret: 4 },
    { canvasId: "Gb-2", startFret: 3, endFret: 7 },
    { canvasId: "Gb-3", startFret: 6, endFret: 9 },
    { canvasId: "Gb-4", startFret: 8, endFret: 11 },
    { canvasId: "Gb-5", startFret: 10, endFret: 14 },
  ],
  Cb: [
    { canvasId: "Cb-1", startFret: 0, endFret: 4 },
    { canvasId: "Cb-2", startFret: 3, endFret: 7 },
    { canvasId: "Cb-3", startFret: 6, endFret: 9 },
    { canvasId: "Cb-4", startFret: 8, endFret: 12 },
    { canvasId: "Cb-5", startFret: 11, endFret: 14 },
  ],
};

// Disegna le tastiere per ogni scala
Object.entries(scales).forEach(([key, scaleNotes]) => {
  drawFretboardForScale(key, scaleNotes, scaleConfigurations[key]);
});
