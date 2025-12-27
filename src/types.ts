import { Timestamp } from "firebase/firestore";

export interface Song {
  id?: string;
  title: string;
  key?: string;
  originalKey?: string;
  lyrics?: string;
  instruments?: Record<string, Instrument>;
  comments?: CommentItem[];
}

export interface CommentItem {
  author?: string;
  text: string;
  createdAt?: Timestamp | number | string;
}

export interface Instrument {
  name?: string;
  part?: string;
  [key: string]: any;
}

export interface JamSession {
  id?: string;
  date: Date;
  songIDs : string[];
}