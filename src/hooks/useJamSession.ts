import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import type { JamSession } from "../types.ts";

export default function useJamSession(sessionId: string | undefined) {
  const [jamSession, setJamSession] = useState<JamSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setJamSession(null);
      setLoading(false);
      return;
    }

    const unsub = onSnapshot(
      doc(db, "sessions", sessionId),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setJamSession(
            { id: docSnap.id,
              date: (data.date).toDate(),
              songIds: Array.isArray(data.songIds) ? data.songIds : [],
            });
        } else {
          setJamSession(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [sessionId]);

  return { jamSession, loading, error };
}