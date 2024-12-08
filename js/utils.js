import {enharmonics, openNotes} from "./constants";

export const adaptNotesForScale = (notes, scale) => {
  return scale.reduce((acc, note) => {
    const enharmonic = enharmonics[note];
    return enharmonic ? acc.map((n) => (n === enharmonic ? note : n)) : acc;
  }, notes);
}

export const createConfiguration = (notes, scale, positions) => {
  return {
    notes: adaptNotesForScale(notes, scale),
    openNotes: adaptNotesForScale(openNotes, scale),
    scale,
    positions,
  }
}

export const noteName = (note) => {
  const n = note.split("_")
  return [
    n[0],
    ...n[1] && n[1] === 'Flat' ? ['b'] : [],
    ...n[1] && n[1] === 'Sharp' ? ['#'] : [],
  ].join('')
}
