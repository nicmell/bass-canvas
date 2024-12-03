const stringCount = 4;

// const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const notes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const openNotes = ["E", "A", "D", "G"];

function calculateNoteOnFret(string, fret) {
  const openNoteIndex = notes.indexOf(openNotes[string - 1]);
  return notes[(openNoteIndex + fret) % notes.length];
}

function drawFretboardBackground(ctx, canvasWidth, canvasHeight, stringSpacing, columnWidth) {
  ctx.fillStyle = "#f0e4d7";
  ctx.fillRect(columnWidth, stringSpacing, canvasWidth - columnWidth, canvasHeight - stringSpacing);
}

function drawFretLines(ctx, fretCount, fretWidth, neckTop, neckBottom, columnWidth) {
  for (let i = 0; i <= fretCount; i++) {
    const x = columnWidth + i * fretWidth;
    ctx.beginPath();
    ctx.moveTo(x, neckTop);
    ctx.lineTo(x, neckBottom);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function drawStrings(ctx, stringCount, stringSpacing, canvasWidth, columnWidth) {
  for (let i = 0; i <= stringCount; i++) {
    const y = (i + 1) * stringSpacing;
    ctx.beginPath();
    ctx.moveTo(columnWidth, y);
    ctx.lineTo(canvasWidth, y);
    ctx.strokeStyle = "#555";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function drawFretMarkers(ctx, fretCount, fretWidth, neckTop, neckBottom, columnWidth, startFret) {
  const fretMarkers = [3, 5, 7, 9, 15, 17, 19];
  for (let i = 0; i < fretCount; i++) {
    const fretNum = startFret + i;
    const x = columnWidth + (i + 0.5) * fretWidth;
    const y = neckTop + (neckBottom - neckTop) / 2;

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

function drawFretHeaders(ctx, fretCount, fretWidth, columnWidth, neckTop, neckBottom, startFret, endFret) {
  const fretHeight = (neckBottom - neckTop) / (endFret - startFret + 1); // Altezza di un tasto
  const headerY = neckTop / 2;  // Posiziona il numero al centro del tasto

  ctx.font = "16px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "#000";
  for (let i = 0; i < fretCount; i++) {
    const fretNum = startFret + i;
    const x = columnWidth + (i + 0.5) * fretWidth;
    if (fretNum >= 1) {
      ctx.fillText(fretNum, x, headerY);  // Centra il numero nella parte superiore
    }
  }
}

function drawScaleNotes(ctx, fretCount, fretWidth, stringCount, stringSpacing, scale, columnWidth, startFret) {
  ctx.font = "12px Arial";
  ctx.textAlign = "center";
  for (let string = 1; string <= stringCount; string++) {
    for (let fret = startFret; fret <= fretCount + startFret - 1; fret++) {
      const note = calculateNoteOnFret(string, fret);
      if (scale.includes(note)) {
        const x = columnWidth + (fret - startFret + 0.5) * fretWidth;
        const y = string * stringSpacing + stringSpacing / 2;

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

function drawOpenStringNames(ctx, stringCount, stringSpacing, scale, columnWidth) {
  ctx.font = "12px Arial";
  ctx.textAlign = "center";
  for (let string = 1; string <= stringCount; string++) {
    const y = string * stringSpacing + stringSpacing / 2;
    const openNote = openNotes[string - 1];

    if (scale.includes(openNote)) {
      const x = columnWidth / 2;
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = "#000";
      ctx.fillText(openNote, x, y + 3);
    }
  }
}

function drawBassFretboard(canvaName, scale, startFret, endFret,  showOpenStringNames = false, stringCount = 4) {
  const canvas = document.getElementById(canvaName);
  const ctx = canvas.getContext('2d');
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  const fretCount = endFret - startFret + 1;
  const columnWidth = showOpenStringNames ? canvasWidth / (fretCount + 1) : 0;
  const fretWidth = (canvasWidth - columnWidth) / fretCount;
  const stringSpacing = canvasHeight / (stringCount + 1);

  const neckTop = stringSpacing;
  const neckBottom = canvasHeight;

  drawFretboardBackground(ctx, canvasWidth, canvasHeight, stringSpacing, columnWidth);
  drawFretHeaders(ctx, fretCount, fretWidth, columnWidth, neckTop, neckBottom, startFret, endFret);
  drawFretLines(ctx, fretCount, fretWidth, neckTop, neckBottom, columnWidth);
  drawStrings(ctx, stringCount, stringSpacing, canvasWidth, columnWidth);
  drawFretMarkers(ctx, fretCount, fretWidth, neckTop, neckBottom, columnWidth, startFret);

  if (showOpenStringNames) {
    drawOpenStringNames(ctx, stringCount, stringSpacing, scale, columnWidth);
  }

  drawScaleNotes(ctx, fretCount, fretWidth, stringCount, stringSpacing, scale, columnWidth, startFret);
}

const cMajorScale = ["C", "D", "E", "F", "G", "A", "B"];
// Scala di Fa maggiore
const fMajorScale = ["F", "G", "A", "Bb", "C", "D", "E"];
// Scala di Si bemolle maggiore
const bbMajorScale = ["Bb", "C", "D", "Eb", "F", "G", "A"];
// Scala di Mi bemolle maggiore
const ebMajorScale = ["Eb", "F", "G", "Ab", "Bb", "C", "D"];
// Scale aggiuntive in bemolle
const abMajorScale = ["Ab", "Bb", "C", "Db", "Eb", "F", "G"];  // La bemolle maggiore
const dbMajorScale = ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"];  // Re bemolle maggiore
const gbMajorScale = ["Gb", "Ab", "Bb", "B", "Db", "Eb", "F"];  // Sol bemolle maggiore
const cbMajorScale = ["Cb", "Db", "Eb", "Fb", "Gb", "Ab", "Bb"];  // Do bemolle maggiore



// C
drawBassFretboard('C-1', cMajorScale, 1, 4, true);
drawBassFretboard('C-2', cMajorScale, 2, 5);
drawBassFretboard('C-3', cMajorScale, 4, 8);
drawBassFretboard('C-4', cMajorScale, 7, 10);
drawBassFretboard('C-5', cMajorScale, 9, 13);
// F
drawBassFretboard('F-1', fMajorScale, 1, 4, true);
drawBassFretboard('F-2', fMajorScale, 2, 6);
drawBassFretboard('F-3', fMajorScale, 5, 8);
drawBassFretboard('F-4', fMajorScale, 7, 10);
drawBassFretboard('F-5', fMajorScale, 9, 13);
// Bb
drawBassFretboard('Bb-1', bbMajorScale, 1, 4, true);
drawBassFretboard('Bb-2', bbMajorScale, 2, 6);
drawBassFretboard('Bb-3', bbMajorScale, 5, 8);
drawBassFretboard('Bb-4', bbMajorScale, 7, 11);
drawBassFretboard('Bb-5', bbMajorScale, 10, 13);
// Eb
drawBassFretboard('Eb-1', ebMajorScale, 1, 4, true);
drawBassFretboard('Eb-2', ebMajorScale, 3, 6);
drawBassFretboard('Eb-3', ebMajorScale, 5, 8);
drawBassFretboard('Eb-4', ebMajorScale, 7, 11);
drawBassFretboard('Eb-5', ebMajorScale, 10, 13);
// Ab
drawBassFretboard('Ab-1', abMajorScale, 1, 4, true);
drawBassFretboard('Ab-2', abMajorScale, 3, 6);
drawBassFretboard('Ab-3', abMajorScale, 5, 9);
drawBassFretboard('Ab-4', abMajorScale, 8, 11);
drawBassFretboard('Ab-5', abMajorScale, 10, 13);
// Db
drawBassFretboard('Db-1', dbMajorScale, 1, 4, true);
drawBassFretboard('Db-2', dbMajorScale, 3, 6);
drawBassFretboard('Db-3', dbMajorScale, 5, 9);
drawBassFretboard('Db-4', dbMajorScale, 8, 11);
drawBassFretboard('Db-5', dbMajorScale, 10, 14);
// Gb
drawBassFretboard('Gb-1', gbMajorScale, 1, 4, true);
drawBassFretboard('Gb-2', gbMajorScale, 3, 7);
drawBassFretboard('Gb-3', gbMajorScale, 6, 9);
drawBassFretboard('Gb-4', gbMajorScale, 8, 11);
drawBassFretboard('Gb-5', gbMajorScale, 10, 14);
