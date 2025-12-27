import { db } from "../firebaseConfig.ts";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import type { JamSession } from "../types";

const sessionCol = collection(db, "sessions");

export async function addJamSession(data : JamSession) {
    return addDoc(sessionCol, {
    date: Timestamp.fromDate(data.date),
    songIDs: data.songIDs,
    createdAt: serverTimestamp(),
    });
}

export async function updateJamSession(id: string, data: Partial<JamSession>) {
    const ref = doc(db, "sessions", id);
    const updateData: any = {
    ...(data.songIDs && { songIDs: data.songIDs }),
    ...(data.date && { date: Timestamp.fromDate(data.date) }),
    updatedAt: serverTimestamp(),
    };
    return updateDoc(ref, updateData);
}

export async function deleteJamSession(id: string) {
    const ref = doc(db, "sessions", id);
    return deleteDoc(ref);
}