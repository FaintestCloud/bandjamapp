export interface SongDoc {
  sections: Section[];
}

interface Section {
  id: string;
  name?: string;
  lines: Line[];
}

interface Line {
  id: string;
  segments: Segment[];
}

interface Segment {
  id: string;
  chord?: string;
  lyric: string;
}
