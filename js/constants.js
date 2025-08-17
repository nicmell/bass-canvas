import {createConfiguration} from "./utils";

export const modes = {
    Major:      'I - Ionian (Major)',
    Dorian:     'II - Dorian',
    Phrygian:   'III - Phrygian',
    // Lydian: 'IV - Lydian',
    Mixolydian: 'V - Mixolydian',
    Minor:      'VI - Aeolian (Minor)',
    // Locrian: 'VII - Locrian',
}

const {
    Phrygian,
    Mixolydian,
    Minor,
    Major,
    Dorian,
} = modes

export const colors = {
    [Major]: {
        light: '#FFEBEB',
        dark: '#FFB8B8'
    },
    [Minor]: {
        light: '#E5F0FC',
        dark: '#AAD1FB'
    },
    [Mixolydian]: {
        light: '#EDE7FF',
        dark: '#CFBFFF'
    },
    [Dorian]: {
        light: '#DEF8D8',
        dark: '#A3E493'
    },
    [Phrygian]: {
        light: '#FFF0B3',
        dark: '#FFBF69'
    },
}


export const Notes = {
    A: "A",
    B: "B",
    C: "C",
    D: "D",
    E: "E",
    F: "F",
    G: "G",
    A_Flat: "A_Flat",
    B_Flat: "B_Flat",
    C_Flat: "C_Flat",
    D_Flat: "D_Flat",
    E_Flat: "E_Flat",
    F_Flat: "F_Flat",
    G_Flat: "G_Flat",
    A_Sharp: "A_Sharp",
    B_Sharp: "B_Sharp",
    C_Sharp: "C_Sharp",
    D_Sharp: "D_Sharp",
    E_Sharp: "E_Sharp",
    F_Sharp: "F_Sharp",
    G_Sharp: "G_Sharp",
};

const {
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    A_Sharp,
    B_Sharp,
    C_Sharp,
    D_Sharp,
    E_Sharp,
    F_Sharp,
    G_Sharp,
    A_Flat,
    B_Flat,
    C_Flat,
    D_Flat,
    E_Flat,
    F_Flat,
    G_Flat,
} = Notes;

export const sharpNotes = [
    C,
    C_Sharp,
    D,
    D_Sharp,
    E,
    F,
    F_Sharp,
    G,
    G_Sharp,
    A,
    A_Sharp,
    B,
];

export const flatNotes = [
    C,
    D_Flat,
    D,
    E_Flat,
    E,
    F,
    G_Flat,
    G,
    A_Flat,
    A,
    B_Flat,
    B,
];

export const enharmonics = {
    [C_Flat]: B,
    [F_Flat]: E,
    [B_Sharp]: C,
    [E_Sharp]: F,
};

export const openNotes = [
    E,
    A,
    D,
    G,
];

export const flatScales = {
    [C]: [C, D, E, F, G, A, B],
    [F]: [F, G, A, B_Flat, C, D, E],
    [B_Flat]: [B_Flat, C, D, E_Flat, F, G, A],
    [E_Flat]: [E_Flat, F, G, A_Flat, B_Flat, C, D],
    [A_Flat]: [A_Flat, B_Flat, C, D_Flat, E_Flat, F, G],
    [D_Flat]: [D_Flat, E_Flat, F, G_Flat, A_Flat, B_Flat, C],
    [G_Flat]: [G_Flat, A_Flat, B_Flat, C_Flat, D_Flat, E_Flat, F],
    [C_Flat]: [C_Flat, D_Flat, E_Flat, F_Flat, G_Flat, A_Flat, B_Flat],
};

export const sharpScales = {
    [C]: [C, D, E, F, G, A, B],
    [G]: [G, A, B, C, D, E, F_Sharp],
    [D]: [D, E, F_Sharp, G, A, B, C_Sharp],
    [A]: [A, B, C_Sharp, D, E, F_Sharp, G_Sharp],
    [E]: [E, F_Sharp, G_Sharp, A, B, C_Sharp, D_Sharp],
    [B]: [B, C_Sharp, D_Sharp, E, F_Sharp, G_Sharp, A_Sharp],
    [F_Sharp]: [F_Sharp, G_Sharp, A_Sharp, B, C_Sharp, D_Sharp, E_Sharp],
    [C_Sharp]: [C_Sharp, D_Sharp, E_Sharp, F_Sharp, G_Sharp, A_Sharp, B_Sharp],
}

export const flatScaleConfigurations = {
    [C]: createConfiguration(flatNotes, flatScales[C], [
        {startFret: 0, endFret: 4, mode: Phrygian},
        {startFret: 2, endFret: 5, mode: Mixolydian},
        {startFret: 4, endFret: 8, mode: Minor},
        {startFret: 7, endFret: 10, mode: Major},
        {startFret: 9, endFret: 13, mode: Dorian},
    ]),
    [F]: createConfiguration(flatNotes, flatScales[F], [
        {startFret: 0, endFret: 4, mode: Major},
        {startFret: 2, endFret: 6, mode: Dorian},
        {startFret: 5, endFret: 8, mode: Phrygian},
        {startFret: 7, endFret: 10, mode: Mixolydian},
        {startFret: 9, endFret: 13, mode: Minor},
    ]),
    [B_Flat]: createConfiguration(flatNotes, flatScales[B_Flat], [
        {startFret: 0, endFret: 4, mode: Mixolydian},
        {startFret: 2, endFret: 6, mode: Minor},
        {startFret: 5, endFret: 8, mode: Major},
        {startFret: 7, endFret: 11, mode: Dorian},
        {startFret: 10, endFret: 13, mode: Phrygian},
    ]),
    [E_Flat]: createConfiguration(flatNotes, flatScales[E_Flat], [
        {startFret: 0, endFret: 4, mode: Dorian},
        {startFret: 3, endFret: 6, mode: Phrygian},
        {startFret: 5, endFret: 8, mode: Mixolydian},
        {startFret: 7, endFret: 11, mode: Minor},
        {startFret: 10, endFret: 13, mode: Major},
    ]),
    [A_Flat]: createConfiguration(flatNotes, flatScales[A_Flat], [
        {startFret: 0, endFret: 4, mode: Minor},
        {startFret: 3, endFret: 6, mode: Major},
        {startFret: 5, endFret: 9, mode: Dorian},
        {startFret: 8, endFret: 11, mode: Phrygian},
        {startFret: 10, endFret: 13, mode: Mixolydian},
    ]),
    [D_Flat]: createConfiguration(flatNotes, flatScales[D_Flat], [
        {startFret: 0, endFret: 4, mode: Phrygian},
        {startFret: 3, endFret: 6, mode: Mixolydian},
        {startFret: 5, endFret: 9, mode: Minor},
        {startFret: 8, endFret: 11, mode: Major},
        {startFret: 10, endFret: 14, mode: Dorian},
    ]),
    [G_Flat]: createConfiguration(flatNotes, flatScales[G_Flat], [
        {startFret: 0, endFret: 4, mode: Major},
        {startFret: 3, endFret: 7, mode: Dorian},
        {startFret: 6, endFret: 9, mode: Phrygian},
        {startFret: 8, endFret: 11, mode: Mixolydian},
        {startFret: 10, endFret: 14, mode: Minor},
    ]),
    [C_Flat]: createConfiguration(flatNotes, flatScales[C_Flat], [
        {startFret: 0, endFret: 4, mode: Mixolydian},
        {startFret: 3, endFret: 7, mode: Minor},
        {startFret: 6, endFret: 9, mode: Major},
        {startFret: 8, endFret: 12, mode: Dorian},
        {startFret: 11, endFret: 14, mode: Phrygian},
    ]),
};

export const sharpScaleConfigurations = {
    [C]: createConfiguration(flatNotes, flatScales[C], [
        {startFret: 2, endFret: 5, mode: Mixolydian},
        {startFret: 4, endFret: 8, mode: Minor},
        {startFret: 7, endFret: 10, mode: Major},
        {startFret: 9, endFret: 13, mode: Dorian},
        {startFret: 12, endFret: 15, mode: Phrygian},
    ]),
    [G]: createConfiguration(sharpNotes, sharpScales[G], [
        {startFret: 2, endFret: 5, mode: Major},
        {startFret: 4, endFret: 8, mode: Dorian},
        {startFret: 7, endFret: 10, mode: Phrygian},
        {startFret: 9, endFret: 12, mode: Mixolydian},
        {startFret: 11, endFret: 15, mode: Minor},
    ]),
    [D]: createConfiguration(sharpNotes, sharpScales[D], [
        {startFret: 2, endFret: 5, mode: Phrygian},
        {startFret: 4, endFret: 7, mode: Mixolydian},
        {startFret: 6, endFret: 10, mode: Minor},
        {startFret: 9, endFret: 12, mode: Major},
        {startFret: 11, endFret: 15, mode: Dorian},
    ]),
    [A]: createConfiguration(sharpNotes, sharpScales[A], [
        {startFret: 1, endFret: 5, mode: Minor},
        {startFret: 4, endFret: 7, mode: Major},
        {startFret: 6, endFret: 10, mode: Dorian},
        {startFret: 9, endFret: 12, mode: Phrygian},
        {startFret: 11, endFret: 14, mode: Mixolydian},
    ]),
    [E]: createConfiguration(sharpNotes, sharpScales[E], [
        {startFret: 1, endFret: 5, mode: Dorian},
        {startFret: 4, endFret: 7, mode: Phrygian},
        {startFret: 6, endFret: 9, mode: Mixolydian},
        {startFret: 8, endFret: 12, mode: Minor},
        {startFret: 11, endFret: 14, mode: Major},
    ]),
    [B]: createConfiguration(sharpNotes, sharpScales[B], [
        {startFret: 1, endFret: 4, mode: Mixolydian},
        {startFret: 3, endFret: 7, mode: Minor},
        {startFret: 6, endFret: 9, mode: Major},
        {startFret: 8, endFret: 12, mode: Dorian},
        {startFret: 11, endFret: 14, mode: Phrygian},
    ]),
    [F_Sharp]: createConfiguration(sharpNotes, sharpScales[F_Sharp], [
        {startFret: 1, endFret: 4, mode: Major},
        {startFret: 3, endFret: 7, mode: Dorian},
        {startFret: 6, endFret: 9, mode: Phrygian},
        {startFret: 8, endFret: 11, mode: Mixolydian},
        {startFret: 10, endFret: 14, mode: Minor},
    ]),
    [C_Sharp]: createConfiguration(sharpNotes, sharpScales[C_Sharp], [
        {startFret: 1, endFret: 4, mode: Phrygian},
        {startFret: 3, endFret: 6, mode: Mixolydian},
        {startFret: 5, endFret: 9, mode: Minor},
        {startFret: 8, endFret: 11, mode: Major},
        {startFret: 10, endFret: 14, mode: Dorian},
    ]),
};

