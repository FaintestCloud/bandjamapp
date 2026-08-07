import {parseSong as chordProParse} from "./adapter/chordpro"

const parsers = {
  chordPro: chordProParse,
} as const;

const selectedParser = "chordPro"

export function songDocParse(song : string, OriKey? : string, CurrKey? : string) {
    const res = parsers[selectedParser](song, OriKey, CurrKey);
  return res
}