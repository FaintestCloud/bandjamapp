import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import type { Song } from "../types";
import SongList from "../components/SongList"

export default function Songs() {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "songs"), (snap) => {
      setSongs(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Song)
        })) as Song[]
      );
    });
    return unsub;
  }, []);


  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Songs</h1>

      <SongList songs={songs} />
    </div>
  );
}
