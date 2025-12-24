import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import type { Song } from "../types.ts";

export default function useSongs() {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "songs"), (snapshot) => {
      setSongs(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Song[]
      );
    });

    return unsub;
  }, []);

  return { songs };
}