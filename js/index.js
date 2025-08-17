import {flatScaleConfigurations, sharpScaleConfigurations, positions} from "./constants";
import {BassFretboard} from "./bassFretboard";
import {noteName} from "./utils";

function createBassFretboard(configurations, scaleKey, index) {
    const {scale, notes, openNotes, positions} = configurations[scaleKey]
    const {startFret, endFret, position} = positions[index]

    const canvasElement = document.createElement("canvas")
    const {canvasWidth, canvasHeight} = BassFretboard
    canvasElement.id = [scaleKey, position].join("-")
    canvasElement.width = canvasWidth
    canvasElement.height = canvasHeight

    BassFretboard.draw(
        canvasElement.getContext("2d"),
        {
            scale,
            notes,
            openNotes,
            startFret,
            endFret,
            position
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
