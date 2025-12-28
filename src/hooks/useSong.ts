import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import type { Song } from "../types.ts";

export default function useSong(songId: string | undefined) {
  const [song, setSong] = useState<Song | null>(null);

  useEffect(() => {
    // Handle non-exist id
    if (!songId) {
      setSong(null);
      return;
    }

    const unsub = onSnapshot(
      doc(db, "songs", songId), 
      (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSong(
          { id : docSnap.id,
            ...data,
          } as Song);
        } else {
          setSong(null);
        }
    });

    return unsub;
  }, []);

  return { song };
}