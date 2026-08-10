import { ChordProParser, ChordProFormatter, HtmlTableFormatter, ChordLyricsPair } from 'chordsheetjs';
import type {SongDoc} from "../types.ts"

const chordProParser = new ChordProParser;

export function toSongDoc(input : string) {
    return chordProParser.parse(input);
    // let res = convertToSongDoc(rawParsed);
    // return res;
}

export function songDocTo(input : SongDoc) {
    // TODO
    let res = null;
    return res;
}

// function convertToSongDoc(rawParsed: RawParsed) {
//   // ...
// }