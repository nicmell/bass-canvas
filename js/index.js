import {flatScaleConfigurations, sharpScaleConfigurations, modes} from "./constants";
import {BassFretboard} from "./bassFretboard";
import {noteName} from "./utils";

function getCanvasElement(scaleKey, mode) {
    const canvasElement = document.createElement("canvas")
    const {canvasWidth, canvasHeight} = BassFretboard
    canvasElement.id = [scaleKey, mode].join("-")
    canvasElement.width = canvasWidth
    canvasElement.height = canvasHeight
    return canvasElement;
}

function createBassFretboard(configurations, scaleKey, index) {
    const {scale, notes, openNotes, modes} = configurations[scaleKey]
    const {startFret, endFret, mode} = modes[index]
    const canvasElement = getCanvasElement(scaleKey, mode);

    BassFretboard.draw(
        canvasElement.getContext("2d"),
        {
            scale,
            notes,
            openNotes,
            startFret,
            endFret,
            mode
        })

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
    Object.keys(modes).forEach((_, index) => {
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
