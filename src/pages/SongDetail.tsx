import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import type { Song } from "../types";
import { mockSongs } from "../mocks/songs.mock";

const useMock = true;

export default function SongDetail() {
  const { id } = useParams<{ id: string }>();
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    if (useMock) {
      const mockSong = mockSongs.find((s) => s.id === id);
      if (mockSong) {
        setSong(mockSong);
      } else {
        setError("Song not found in mock data.");
      }
      setLoading(false);
    } else {
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
      }
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!song) return null;


  return (
    <div className="max-w-dvw mx-auto pt-4 pl-6">
      {/* TODO:<Link to="/" className="text-blue-600 hover:underline">&larr; Back to Songs</Link> */}
      <h1 className="text-5xl text-center font-bold mt-2 mb-2">{song.title}</h1>
      <div className="text-xs text-center font-mono ">by {song.artist}</div>
      <div className="mt-2 text-center font-mono">Key: {song.key}, Original Key: {song.originalKey}</div>
      {song.referenceLink && (
        <p className="flex gap-1">
          <span className="shrink-0">Reference:</span>
          <a
            href={song.referenceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:underline hover:text-gray-900 max-w-full"
            title={song.referenceLink}
          >
            Link
          </a>
        </p>
      )}
      {song.comments && song.comments.length > 0 && (
        <div className="mt-4">
          <h2 className="font-semibold mb-2">Comments:</h2>
          <ul className="space-y-2">
            {song.comments.map((comment, i) => {
              // Format timestamp if it exists
              let dateStr = "";
              // TODO
              // if (comment.createdAt) {
              //   const date =
              //     typeof comment.createdAt === "number"
              //       ? new Date(comment.createdAt)
              //       : comment.createdAt instanceof Date
              //       ? comment.createdAt
              //       : (comment.createdAt as any).toDate?.() ?? new Date(comment.createdAt);
              //   dateStr = date.toLocaleDateString() + " " + date.toLocaleTimeString();
              // }

              return (
                <li
                  key={i}
                >
                  <p className="font-semibold text-black">{comment.author ?? "Anonymous"}</p>
                  <p className="text-gray-700">{comment.text}</p>
                  {dateStr && <p className="text-xs text-gray-400">{dateStr}</p>}
                </li>
              );
            })}
          </ul>
        </div>
      )}

    </div>
  );
}
