import {createConfiguration} from "./utils";

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
    {startFret: 0, endFret: 4},
    {startFret: 2, endFret: 5},
    {startFret: 4, endFret: 8},
    {startFret: 7, endFret: 10},
    {startFret: 9, endFret: 13},
  ]),
  [F]: createConfiguration(flatNotes, flatScales[F],  [
    {startFret: 0, endFret: 4},
    {startFret: 2, endFret: 6},
    {startFret: 5, endFret: 8},
    {startFret: 7, endFret: 10},
    {startFret: 9, endFret: 13},
  ]),
  [B_Flat]: createConfiguration(flatNotes, flatScales[B_Flat], [
    {startFret: 0, endFret: 4},
    {startFret: 2, endFret: 6},
    {startFret: 5, endFret: 8},
    {startFret: 7, endFret: 11},
    {startFret: 10, endFret: 13},
  ]),
  [E_Flat]: createConfiguration(flatNotes, flatScales[E_Flat], [
    {startFret: 0, endFret: 4},
    {startFret: 3, endFret: 6},
    {startFret: 5, endFret: 8},
    {startFret: 7, endFret: 11},
    {startFret: 10, endFret: 13},
  ]),
  [A_Flat]: createConfiguration(flatNotes, flatScales[A_Flat], [
    {startFret: 0, endFret: 4},
    {startFret: 3, endFret: 6},
    {startFret: 5, endFret: 9},
    {startFret: 8, endFret: 11},
    {startFret: 10, endFret: 13},
  ]),
  [D_Flat]: createConfiguration(flatNotes, flatScales[D_Flat],  [
    {startFret: 0, endFret: 4},
    {startFret: 3, endFret: 6},
    {startFret: 5, endFret: 9},
    {startFret: 8, endFret: 11},
    {startFret: 10, endFret: 14},
  ]),
  [G_Flat]: createConfiguration(flatNotes,flatScales[G_Flat],[
    {startFret: 0, endFret: 4},
    {startFret: 3, endFret: 7},
    {startFret: 6, endFret: 9},
    {startFret: 8, endFret: 11},
    {startFret: 10, endFret: 14},
  ]),
  [C_Flat]: createConfiguration(flatNotes, flatScales[C_Flat], [
    {startFret: 0, endFret: 4},
    {startFret: 3, endFret: 7},
    {startFret: 6, endFret: 9},
    {startFret: 8, endFret: 12},
    {startFret: 11, endFret: 14},
  ]),
};

export const sharpScaleConfigurations = {
  [C]: createConfiguration(flatNotes, flatScales[C], [
    {startFret: 2, endFret: 5},
    {startFret: 4, endFret: 8},
    {startFret: 7, endFret: 10},
    {startFret: 9, endFret: 13},
    {startFret: 12, endFret: 15},
  ]),
  [G]: createConfiguration(sharpNotes, sharpScales[G], [
    {startFret: 2, endFret: 5},
    {startFret: 4, endFret: 8},
    {startFret: 7, endFret: 10},
    {startFret: 9, endFret: 12},
    {startFret: 11, endFret: 15},
  ]),
  [D]: createConfiguration(sharpNotes, sharpScales[D], [
    {startFret: 2, endFret: 5},
    {startFret: 4, endFret: 7},
    {startFret: 6, endFret: 10},
    {startFret: 9, endFret: 12},
    {startFret: 11, endFret: 15},
  ]),
  [A]: createConfiguration(sharpNotes, sharpScales[A], [
    {startFret: 1, endFret: 5},
    {startFret: 4, endFret: 7},
    {startFret: 6, endFret: 10},
    {startFret: 9, endFret: 12},
    {startFret: 11, endFret: 14},
  ]),
  [E]: createConfiguration(sharpNotes, sharpScales[E], [
    {startFret: 1, endFret: 5},
    {startFret: 4, endFret: 7},
    {startFret: 6, endFret: 9},
    {startFret: 8, endFret: 12},
    {startFret: 11, endFret: 14},
  ]),
  [B]: createConfiguration(sharpNotes, sharpScales[B], [
    {startFret: 1, endFret: 4},
    {startFret: 3, endFret: 7},
    {startFret: 6, endFret: 9},
    {startFret: 8, endFret: 12},
    {startFret: 11, endFret: 14},
  ]),
  [F_Sharp]: createConfiguration(sharpNotes, sharpScales[F_Sharp], [
    {startFret: 1, endFret: 4},
    {startFret: 3, endFret: 7},
    {startFret: 6, endFret: 9},
    {startFret: 8, endFret: 11},
    {startFret: 10, endFret: 14},
  ]),
  [C_Sharp]: createConfiguration(sharpNotes, sharpScales[C_Sharp], [
    {startFret: 1, endFret: 4},
    {startFret: 3, endFret: 6},
    {startFret: 5, endFret: 9},
    {startFret: 8, endFret: 11},
    {startFret: 10, endFret: 14},
  ]),
};
