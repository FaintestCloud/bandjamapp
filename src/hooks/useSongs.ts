import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot, query, where, documentId } from "firebase/firestore";
import type { Song } from "../types.ts";

export default function useSongs(songIds?: string[]) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  
  useEffect(() => {
    setLoading(true);

    if (!songIds || songIds.length === 0) {
      setSongs([]);  // No songs to load
      setLoading(false);
      return;
    }

    setLoading(true);  // Set loading state while fetching songs

    const q =
      songIds && songIds.length > 0
        ? query(collection(db, "songs"), where(documentId(), "in", songIds))
        : collection(db, "songs");

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        setSongs(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Song[]
        );
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [songIds]);

  return { songs, loading, error };
}