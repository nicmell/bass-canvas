import {flatNotes, flatScales} from "./constants";
import {BassFretboard} from "./bassFretboard";


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
  const { canvasWidth, canvasHeight} = BassFretboard

  const canvasElement = document.createElement("canvas")
  canvasElement.id = [scaleKey, index + 1].join("-")
  canvasElement.width = canvasWidth
  canvasElement.height = canvasHeight
  const {startFret, endFret} = scaleConfigurations[scaleKey][index]
  const fretboard = new BassFretboard({notes: flatNotes, scale: flatScales[scaleKey], startFret, endFret});
  fretboard.draw(canvasElement.getContext("2d"))
  return canvasElement
}

document.querySelectorAll(".scale")
  .forEach((parent) => {
    const {id: scaleKey} = parent
    const span = document.createElement("span")
    span.innerText = scaleKey;
    parent.append(span);
    [...Array(5).keys()].forEach((index) => {
      parent.append(createBassFretboard(scaleKey, index));
    })
});
