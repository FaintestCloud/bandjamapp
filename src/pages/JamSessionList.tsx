import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import type { JamSession } from "../types";

export default function JamSessions() {
  const [sessions, setJamSession] = useState<JamSession[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "sessions"), (snap) => {
      setJamSession(
        snap.docs.map((doc) => ({
          id: doc.id,
          date: (doc.data().date).toDate(),
          songIds: Array.isArray(doc.data().songIds) ? doc.data().songIds : [],
        })) as JamSession[]
      );
    });
    return unsub;
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Jam Sessions</h1>

      <ul className="space-y-3">
        {sessions.map((session) => (
          <li key={session.id}>
            <Link
              to={`/jamsession/${session.id}`}
              className="block p-3 border rounded hover:bg-gray-50"
            >
              <div className="font-medium">
                Session Date:{" "}
                {session.date.toLocaleString()}
              </div>

              <div className="text-sm text-gray-500">
                {session.songIds.length} songs
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
