import {modes, enharmonics, openNotes} from "./constants";

export const adaptNotesForScale = (notes, scale) => {
    return scale.reduce((acc, note) => {
        const enharmonic = enharmonics[note];
        return enharmonic ? acc.map((n) => (n === enharmonic ? note : n)) : acc;
    }, notes);
}

export const createConfiguration = (notes, scale, modes) => {
    return {
        notes: adaptNotesForScale(notes, scale), openNotes: adaptNotesForScale(openNotes, scale), scale, modes,
    }
}

export const noteName = (note) => {
    const n = note.split("_")
    return [n[0], ...n[1] && n[1] === 'Flat' ? ['b'] : [], ...n[1] && n[1] === 'Sharp' ? ['#'] : [],].join('')
}


export const gradeName = (grade) => {
    return ["I", "II", "III", "IV", "V", "VI", "VII"][grade]
}

export const modeName = (mode) => {
    switch (mode) {
        case modes.Ionian:
            return 'I - Ionian (Major)';
        case modes.Dorian:
            return 'II - Dorian';
        case modes.Phrygian:
            return 'III - Phrygian';
        case modes.Mixolydian:
            return 'V - Mixolydian';
        case modes.Aeolian:
            return 'VI - Aeolian (Minor)';
    }
}
