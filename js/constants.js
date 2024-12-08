import {createConfiguration} from "./utils";

export const positions = {
  I: 'I',
  II: 'II',
  III: 'III',
  IV: 'IV',
  V: 'V'
}

const {
  I,
  II,
  III,
  IV,
  V,
} = positions

export const colors = {
  [I]: {
    light: '#FFEBEB',
    dark: '#FFB8B8'
  },
  [II]: {
    light: '#E5F0FC',
    dark: '#AAD1FB'
  },
  [III]: {
    light: '#DEF8D8',
    dark: '#A3E493'
  },
  [IV]: {
    light: '#FFF0B3',
    dark: '#FFBF69'
  },
  [V]: {
    light: '#EDE7FF',
    dark: '#CFBFFF'
  }
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
    {startFret: 0, endFret: 4, position: I},
    {startFret: 2, endFret: 5, position: II},
    {startFret: 4, endFret: 8, position: III},
    {startFret: 7, endFret: 10, position: IV},
    {startFret: 9, endFret: 13, position: V},
  ]),
  [F]: createConfiguration(flatNotes, flatScales[F],  [
    {startFret: 0, endFret: 4, position: IV},
    {startFret: 2, endFret: 6, position: V},
    {startFret: 5, endFret: 8, position: I},
    {startFret: 7, endFret: 10, position: II},
    {startFret: 9, endFret: 13, position: III},
  ]),
  [B_Flat]: createConfiguration(flatNotes, flatScales[B_Flat], [
    {startFret: 0, endFret: 4, position: II},
    {startFret: 2, endFret: 6, position: III},
    {startFret: 5, endFret: 8, position: IV},
    {startFret: 7, endFret: 11, position: V},
    {startFret: 10, endFret: 13, position: I},
  ]),
  [E_Flat]: createConfiguration(flatNotes, flatScales[E_Flat], [
    {startFret: 0, endFret: 4, position: V},
    {startFret: 3, endFret: 6, position: I},
    {startFret: 5, endFret: 8, position: II},
    {startFret: 7, endFret: 11, position: III},
    {startFret: 10, endFret: 13, position: IV},
  ]),
  [A_Flat]: createConfiguration(flatNotes, flatScales[A_Flat], [
    {startFret: 0, endFret: 4, position: III},
    {startFret: 3, endFret: 6, position: IV},
    {startFret: 5, endFret: 9, position: V},
    {startFret: 8, endFret: 11, position: I},
    {startFret: 10, endFret: 13, position: II},
  ]),
  [D_Flat]: createConfiguration(flatNotes, flatScales[D_Flat],  [
    {startFret: 0, endFret: 4, position: I},
    {startFret: 3, endFret: 6 , position: II},
    {startFret: 5, endFret: 9, position: III},
    {startFret: 8, endFret: 11, position: IV},
    {startFret: 10, endFret: 14, position: V},
  ]),
  [G_Flat]: createConfiguration(flatNotes,flatScales[G_Flat],[
    {startFret: 0, endFret: 4, position: IV},
    {startFret: 3, endFret: 7, position: V},
    {startFret: 6, endFret: 9, position: I},
    {startFret: 8, endFret: 11, position: II},
    {startFret: 10, endFret: 14, position: III},
  ]),
  [C_Flat]: createConfiguration(flatNotes, flatScales[C_Flat], [
    {startFret: 0, endFret: 4, position: II},
    {startFret: 3, endFret: 7, position: III},
    {startFret: 6, endFret: 9, position: IV},
    {startFret: 8, endFret: 12, position: V},
    {startFret: 11, endFret: 14, position: I},
  ]),
};

export const sharpScaleConfigurations = {
  [C]: createConfiguration(flatNotes, flatScales[C], [
    {startFret: 2, endFret: 5, position: II},
    {startFret: 4, endFret: 8, position: III},
    {startFret: 7, endFret: 10, position: IV},
    {startFret: 9, endFret: 13, position: V},
    {startFret: 12, endFret: 15, position: I},
  ]),
  [G]: createConfiguration(sharpNotes, sharpScales[G], [
    {startFret: 2, endFret: 5, position: IV},
    {startFret: 4, endFret: 8, position: V},
    {startFret: 7, endFret: 10, position: I},
    {startFret: 9, endFret: 12, position: II},
    {startFret: 11, endFret: 15, position: III},
  ]),
  [D]: createConfiguration(sharpNotes, sharpScales[D], [
    {startFret: 2, endFret: 5, position: I},
    {startFret: 4, endFret: 7, position: II},
    {startFret: 6, endFret: 10, position: III},
    {startFret: 9, endFret: 12, position: IV},
    {startFret: 11, endFret: 15, position: V},
  ]),
  [A]: createConfiguration(sharpNotes, sharpScales[A], [
    {startFret: 1, endFret: 5, position: III},
    {startFret: 4, endFret: 7, position: IV},
    {startFret: 6, endFret: 10, position: V},
    {startFret: 9, endFret: 12, position: I},
    {startFret: 11, endFret: 14, position: II},
  ]),
  [E]: createConfiguration(sharpNotes, sharpScales[E], [
    {startFret: 1, endFret: 5, position: V},
    {startFret: 4, endFret: 7, position: I},
    {startFret: 6, endFret: 9, position: II},
    {startFret: 8, endFret: 12, position: III},
    {startFret: 11, endFret: 14, position: IV},
  ]),
  [B]: createConfiguration(sharpNotes, sharpScales[B], [
    {startFret: 1, endFret: 4, position: II},
    {startFret: 3, endFret: 7, position: III},
    {startFret: 6, endFret: 9, position: IV},
    {startFret: 8, endFret: 12, position: V},
    {startFret: 11, endFret: 14, position: I},
  ]),
  [F_Sharp]: createConfiguration(sharpNotes, sharpScales[F_Sharp], [
    {startFret: 1, endFret: 4, position: IV},
    {startFret: 3, endFret: 7, position: V},
    {startFret: 6, endFret: 9, position: I},
    {startFret: 8, endFret: 11, position: II},
    {startFret: 10, endFret: 14, position: III},
  ]),
  [C_Sharp]: createConfiguration(sharpNotes, sharpScales[C_Sharp], [
    {startFret: 1, endFret: 4, position: I},
    {startFret: 3, endFret: 6, position: II},
    {startFret: 5, endFret: 9, position: III},
    {startFret: 8, endFret: 11, position: IV},
    {startFret: 10, endFret: 14, position: V},
  ]),
};

