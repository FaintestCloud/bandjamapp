import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import type { Song } from "../types";

export default function SongDetail() {
  const { id } = useParams<{ id: string }>();
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getDoc(doc(db, "songs", id))
      .then((snap) => {
        if (snap.exists()) {
          setSong({ id: snap.id, ...(snap.data() as Song) });
        } else {
          setError("Song not found.");
        }
      })
      .catch(() => setError("Failed to load song."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!song) return null;

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* TODO:<Link to="/" className="text-blue-600 hover:underline">&larr; Back to Songs</Link> */}
      <h1 className="text-2xl font-bold mt-4 mb-2">{song.title}</h1>
      <div className="mb-2 text-gray-700">Key: <span className="font-mono">{song.key}</span></div>
      {song.comments && song.comments.length > 0 && (
        <div className="mt-4">
          <h2 className="font-semibold mb-1">Comments:</h2>
          <ul className="list-disc pl-5">
            {song.comments.map((c, i) => (
              <li key={i} className="mb-1">{(c as any).text}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Add more song details here if needed */}
    </div>
  );
}
