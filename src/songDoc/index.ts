import type { SongDoc } from "./types.ts";
import {
  toSongDoc as chordProToSongDoc,
  songDocTo as chordProSongDocTo,
} from "./adapter/chordpro";

type SongDocInput = {
  chordPro: string;
};

const adapters = {
  chordPro: {
    toSongDoc: chordProToSongDoc,
    songDocTo: chordProSongDocTo,
  },
} as const;

export type SongDocFormat = keyof typeof adapters;

export function toSongDoc<F extends SongDocFormat>(
  format: F,
  input: SongDocInput[F]
) {
  return adapters[format].toSongDoc(input);
}

export function songDocTo<F extends SongDocFormat>(
  format: F,
  input: SongDoc
) {
  return adapters[format].songDocTo(input);
}