import { db } from "../firebaseConfig.ts";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import type { Song } from "../types";

const songsCol = collection(db, "songs");

export async function addSong(data : Song) {
    return addDoc(songsCol, {
        ...data,
        createdAt : serverTimestamp(),
    });
}

export async function updateSong(id: string, data: Partial<Song>) {
    const ref = doc(db, "songs", id);
    return updateDoc(ref, data);
}

export async function deleteSong(id: string) {
    const ref = doc(db, "songs", id);
    return deleteDoc(ref);
}