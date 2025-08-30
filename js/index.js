import {flatScaleConfigurations, sharpScaleConfigurations, modes} from "./constants";
import {BassFretboard} from "./bassFretboard";
import {noteName, gradeName, modeName} from "./utils";

function getCanvasElement(scaleKey, mode) {
    const canvasElement = document.createElement("canvas")
    canvasElement.id = [scaleKey, mode].join("-");
    return canvasElement;
}

function createBassFretboard(configurations, scaleKey, index) {
    const {scale, notes, openNotes, modes} = configurations[scaleKey];
    const {startFret, endFret, mode} = modes[index];
    const canvasElement = getCanvasElement(scaleKey, mode);

    BassFretboard.draw(canvasElement.getContext("2d"), {
        scale, notes, openNotes, startFret, endFret, mode
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


document.querySelectorAll(".scale-full.flat")
    .forEach((parent) => {

    })

document.querySelectorAll(".scale-full.sharp")
    .forEach((parent) => {

        const [scaleKey, m] = parent.id.split("-");
        const span = document.createElement("span")
        span.innerText = modeName(m);
        parent.append(span);

        const {scale, notes, openNotes, modes} = sharpScaleConfigurations[scaleKey];
        const {mode, startFret, endFret} = modes.find(({mode}) => mode === m);

        const canvasElement = document.createElement("canvas");
        canvasElement.width = parent.clientWidth;
        canvasElement.height = 130;

        BassFretboard.draw(canvasElement.getContext("2d"), {
            drawHeader: false,
            drawFretboard: false,
            noteGrade: true,
            scale,
            notes,
            openNotes,
            startFret: 2,
            endFret: 15,
            startNoteFret: startFret,
            endNoteFret: endFret,
            mode: mode,
        })
        parent.append(canvasElement);

    });
