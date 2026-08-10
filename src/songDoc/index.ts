import type { SongDoc } from "./types.ts";
import { Song, HtmlTableFormatter } from "chordsheetjs"
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

// TODO: move this Renderer out after creating dedicated feature or component for songDoc
const htmlTableFormatter = new HtmlTableFormatter;
export function rederSongDoc(input : Song) {
  return htmlTableFormatter.format(input);
}