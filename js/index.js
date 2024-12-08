import {flatNotes, flatScales, flatScaleConfigurations, sharpScaleConfigurations} from "./constants";
import {BassFretboard} from "./bassFretboard";
import {noteName} from "./utils";


function createBassFretboard(configurations, scaleKey, index) {
  const { canvasWidth, canvasHeight} = BassFretboard

  const canvasElement = document.createElement("canvas")
  canvasElement.id = [scaleKey, index + 1].join("-")
  canvasElement.width = canvasWidth
  canvasElement.height = canvasHeight
  const {scale, notes, openNotes, positions} = configurations[scaleKey]
  const {startFret, endFret, position} = positions[index]
  const fretboard = new BassFretboard({
    scale,
    notes,
    openNotes,
    startFret,
    endFret,
    position
  });
  fretboard.draw(canvasElement.getContext("2d"))
  return canvasElement
}


document.querySelectorAll(".scale.flat")
  .forEach((parent) => {
    const {id: scaleKey} = parent
    const span = document.createElement("span")
    span.innerText = noteName(scaleKey);
    parent.append(span);
    [...Array(5).keys()].forEach((index) => {
      parent.append(createBassFretboard(flatScaleConfigurations, scaleKey, index));
    })
});

document.querySelectorAll(".scale.sharp")
  .forEach((parent) => {
    const {id: scaleKey} = parent
    const span = document.createElement("span")
    span.innerText = noteName(scaleKey);
    parent.append(span);
    [...Array(5).keys()].forEach((index) => {
      parent.append(createBassFretboard(sharpScaleConfigurations, scaleKey, index));
    })
  });
