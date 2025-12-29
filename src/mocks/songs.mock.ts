import type { Song } from "../types.ts";

export const mockSongs: Song[] = [
  {
    id: "s001",
    title: "Midnight Groove",
    key: "Am",
    originalKey: "Am",
    lyrics: `
    Walking down the empty street
    Heart in rhythm, steady beat
    `,
    instruments: {
        guitar: {
        name: "Guitar",
        player: "Alex",
        },
        drums: {
        name: "Drums",
        player: "Sam",
        },
        bass: {
        name: "Bass",
        player: "Jamie",
        },
    },
},
  {
    id: "s002",
    title: "Sunrise Jam",
    key: "C",
    originalKey: "D",
    lyrics: `
    When the sun comes up again
    We’ll keep playing till the end
    `,
  },
  {
    id: "s003",
    title: "Late Night Blues",
    key: "E",
    originalKey: "E",
  },
];