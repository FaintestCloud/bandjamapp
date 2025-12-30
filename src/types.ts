import { Timestamp } from "firebase/firestore";

export interface Song {
  id?: string;
  title: string;
  key?: string;
  originalKey?: string;
  lyrics?: string;
  instruments?: Record<string, string>;
  referenceLink? : string;
  comments?: CommentItem[];
}

export interface CommentItem {
  author?: string;
  text: string;
  createdAt?: Timestamp | number | string;
}

export interface JamSession {
  id?: string;
  date: Date;
  songIds : string[];
}