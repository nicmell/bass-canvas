import {flatNotes, flatScales, flatScaleConfigurations, sharpScaleConfigurations, positions} from "./constants";
import {BassFretboard} from "./bassFretboard";
import {noteName} from "./utils";

function createBassFretboard(configurations, scaleKey, index) {
  const { canvasWidth, canvasHeight} = BassFretboard
  const {scale, notes, openNotes, positions} = configurations[scaleKey]
  const {startFret, endFret, position} = positions[index]

  const canvasElement = document.createElement("canvas")
  canvasElement.id = [scaleKey, position].join("-")
  canvasElement.width = canvasWidth
  canvasElement.height = canvasHeight

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

function appendScalesHead(parent) {
  const {id: scaleKey} = parent
  const span = document.createElement("span")
  span.innerText = noteName(scaleKey);
  parent.append(span);
}

function addendScales(parent, configurations) {
  const {id: scaleKey} = parent
  Object.keys(positions).forEach((_, index) => {
    parent.append(createBassFretboard(configurations, scaleKey, index));
  })
}

document.querySelectorAll(".scale.flat")
  .forEach((parent) => {
    appendScalesHead(parent);
    addendScales(parent, flatScaleConfigurations);
  });

document.querySelectorAll(".scale.sharp")
  .forEach((parent) => {
    appendScalesHead(parent);
    addendScales(parent, sharpScaleConfigurations);
  });
