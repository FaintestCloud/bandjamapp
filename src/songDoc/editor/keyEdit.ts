import { Song } from 'chordsheetjs';
import {isMusicalKey} from "../../constants.ts";

export function setKey(input : Song, OriKey : string | null, CurrKey : string | null) : Song {
    if (OriKey != null && isMusicalKey(OriKey)) {
        if (CurrKey != null && isMusicalKey(CurrKey))
        {
            input = input.setKey(OriKey).changeKey(CurrKey);
        } else {
            input = input.setKey(OriKey);
        }
    }
    return input
}
