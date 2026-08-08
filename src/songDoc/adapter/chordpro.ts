import { ChordProParser, ChordProFormatter, HtmlTableFormatter, ChordLyricsPair } from 'chordsheetjs';
import type {SongDoc} from "../types.ts"

const chordProParser = new ChordProParser;
const htmlTableFormatter = new HtmlTableFormatter;

export function toSongDoc(input : string) {
    const rawParsed = chordProParser.parse(input);
    return htmlTableFormatter.format(rawParsed);
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