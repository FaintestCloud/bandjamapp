import { ChordProParser, ChordProFormatter, HtmlTableFormatter } from 'chordsheetjs';
import {isMusicalKey} from "../../constants.ts"

const chordProParser = new ChordProParser;
const htmlTableFormatter = new HtmlTableFormatter;

export function parseSong(song : string, OriKey? : string, CurrKey? : string) {
    let res = null;
    const rawParsed = chordProParser.parse(song);

    if (OriKey != null && isMusicalKey(OriKey)) {
        if (CurrKey != null && isMusicalKey(CurrKey))
        {
            rawParsed.setKey(OriKey).changeKey(CurrKey);
        } else {
            rawParsed.setKey(OriKey);
        }
    }
    res = htmlTableFormatter.format(rawParsed);
    return res;
}