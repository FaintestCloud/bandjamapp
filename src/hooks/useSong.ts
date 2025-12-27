import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import type { Song } from "../types.ts";

export default function useSongs(songId: string | undefined) {
  const [songs, setSongs] = useState<Song | null>(null);

  useEffect(() => {
    // Handle non-exist id
    if (!songId) {
      setSongs(null);
      return;
    }

    const unsub = onSnapshot(
      doc(db, "songs", songId), 
      (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSongs(
          { id : docSnap.id,
            ...data,
          } as Song);
        } else {
          setSongs(null);
        }
    });

    return unsub;
  }, []);

  return { songs };
}