import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import type { Song } from "../types.ts";

export default function useSong(songId: string | undefined) {
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Handle non-exist id
    if (!songId) {
      setSong(null);
      setLoading(false);
      return;
    }

    setLoading(true);

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

        setLoading(false);
    },
    (err) => {
      setError(err)
      setLoading(false);
    });

    return () => unsub();;
  }, [songId]);

  return { song, loading, error};
}