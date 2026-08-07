export const INSTRUMENTS_LIST = [
    "Vocal",
    "Bass",
    "Drum",
    "Keyboard",
    "Guitar1",
    "Guitar2"
] as const;

export const MUSICAL_KEYS = [
  "C", "C#", "D", "D#", "E",
  "F", "F#", "G", "G#", "A",
  "A#", "B", "-"
] as const;
export type MusicalKey = typeof MUSICAL_KEYS[number];
export function isMusicalKey(value: string): value is MusicalKey {
  return (MUSICAL_KEYS as readonly string[]).includes(value);
}