export const Notes = {
  A: "A",
  B: "B",
  C: "C",
  D: "D",
  E: "E",
  F: "F",
  G: "G",
  A_Flat: "Ab",
  B_Flat: "Bb",
  C_Flat: "Cb",
  D_Flat: "Db",
  E_Flat: "Eb",
  F_Flat: "Fb",
  G_Flat: "Gb",
  A_Sharp: "A#",
  B_Sharp: "B#",
  C_Sharp: "C#",
  D_Sharp: "D#",
  E_Sharp: "E#",
  F_Sharp: "F#",
  G_Sharp: "G#",
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
