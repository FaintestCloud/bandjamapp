import { ChordProParser, ChordProFormatter, HtmlTableFormatter, ChordLyricsPair, Chord } from 'chordsheetjs';

export function addChords(
    pair: ChordLyricsPair,
    additions: Array<{ position: number ; chord: string }>
) : ChordLyricsPair[] {
    const lyrics = pair.lyrics ?? '';

    const sorted = [...additions]
        .filter(({ position }) => position >- 0 && position < lyrics.length)
        .sort((a,b) => a.position - b.position);

    const result: ChordLyricsPair[] = [];
    let currentPosition = 0;

    for (let i = 0; i < sorted.length; i++) {
        const { position, chord } = sorted[i];

        // Lyrics between previous chord and this chord
        if (position > currentPosition) {
            result.push(
                new ChordLyricsPair(
                    currentPosition === 0 ? pair.chords :'',
                    lyrics.slice(currentPosition, position)
                )
            );
        }

        const nextPosition =
            i + 1< sorted.length
                ? sorted[i +1].position
                : lyrics.length;
        
        result.push(
            new ChordLyricsPair(
                chord,
                lyrics.slice(position, nextPosition)
            )
        );

        currentPosition = nextPosition;
    }

    // No chords were added, or trailiing lyrics remain
    if (currentPosition < lyrics.length) {
        result.push(
            new ChordLyricsPair(
                currentPosition === 0 ? pair.chords :'',
                lyrics.slice(currentPosition)
            )
        )
    }

    return result
}

export function removeChord(
    pairs: ChordLyricsPair[],
    index: number
) : ChordLyricsPair[] {
    if (index < 0 || index >= pairs.length) {
        return pairs;
    }

    const result = [...pairs];
    const removed = result.splice(index, 1)[0];

    if (index > 0 && index < result.length) {
        const previous = result[index - 1];
        const next = result[index];

        result[index - 1] = new ChordLyricsPair(
            previous.chord,
            previous.lyrics + removed.lyrics
        );
    } else if (index > 0 ) {
        // Removing the last chord
        const previous = result[index - 1];
        
        result[index - 1] = new ChordLyricsPair(
            previous.chord,
            previous.lyrics + removed.lyrics
        );
    }

    return result;
}