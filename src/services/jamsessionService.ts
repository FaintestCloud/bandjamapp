import { db } from "../firebaseConfig.ts";
import {
  query,
  where,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  doc,
  arrayUnion,
  arrayRemove,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import type { JamSession } from "../types";

const sessionCol = collection(db, "sessions");
const nextSessionDoc = doc(db, "meta", "nextSession")

export async function addJamSession(data : JamSession) {
    const exists = await sessionExistsForDate(data.date);

    if (exists) {
        throw new Error("A JamSession already exists for this date");
    }

    return addDoc(sessionCol, {
    date: Timestamp.fromDate(data.date),
    songIds: data.songIds,
    createdAt: serverTimestamp(),
    });
}

export async function updateJamSession(
    id: string,
    data: Partial<JamSession> & {
        addSongId?: string;
        removeSongId?: string;
    }
) {
    // Only used for partial updates
    const ref = doc(db, "sessions", id);
    const updateData: any = {
    updatedAt: serverTimestamp(),
    };

    if (data.songIds) {
        updateData.songIds = data.songIds;
    }

    if (data.addSongId) {
        updateData.songIds = arrayUnion(data.addSongId);
    }

    if (data.removeSongId) {
        updateData.songIds = arrayRemove(data.removeSongId);
    }

    if (data.date) {
        const exists = await sessionExistsForDate(data.date);
        if (exists) {
            throw new Error("A JamSession already exists for this date");
        }
        updateData.date = Timestamp.fromDate(data.date);
    }

    return updateDoc(ref, updateData);
}

export async function deleteJamSession(id: string) {
    const ref = doc(db, "sessions", id);
    return deleteDoc(ref);
}

export async function getNextSession() : Promise<string | null> {
    const nextSessionSnap = await getDoc(nextSessionDoc);
    if (!nextSessionSnap.exists()) return null;

    const sessionId = nextSessionSnap.data().sessionId;
    if (!sessionId) return null;

    return sessionId;
}

export async function setNextSession(id: string) {
    const updateData = {sessionId : id};
    return updateDoc(nextSessionDoc, updateData);
}

// Internal function
function getDayRange(date: Date) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  return {
    start: Timestamp.fromDate(start),
    end: Timestamp.fromDate(end),
  };
}

async function sessionExistsForDate(date: Date): Promise<boolean> {
  const { start, end } = getDayRange(date);

  const q = query(
    collection(db, "sessions"),
    where("date", ">=", start),
    where("date", "<=", end)
  );

  const snapshot = await getDocs(q);

  return !snapshot.empty;
}