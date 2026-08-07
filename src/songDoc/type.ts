interface SongDoc {
  metadata: {
    OriKey?: string;
    CurrKey?: string;
  };

  sections: Section[];
}

interface Section {
  id: string;
  type: "verse" | "chorus" | "bridge" | "custom";
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
