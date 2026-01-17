import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { updateSong } from "../services/songService"
import type { Song } from "../types";
import { mockSongs } from "../mocks/songs.mock";

const useMock = false;
const MUSICAL_KEYS = [
  "C", "C#", "D", "D#", "E",
  "F", "F#", "G", "G#", "A",
  "A#", "B", "-"
];

export default function SongDetail() {
  const { id } = useParams<{ id: string }>();
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [originalKey, setOriginalKey] = useState<string>("-");
  const [currentKey, setCurrentKey] = useState<string>("-");

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
            setCurrentKey(snap.data().key ?? "-");
            setOriginalKey(snap.data().originalKey ?? "-");
          } else {
            setError("Song not found.");
          }
        })
        .catch(() => setError("Failed to load song."))
        .finally(() => setLoading(false));
    }
  }, [id]);

  useEffect(() => {
    if(!song) return;
    if (!song.id) return;
    if (!currentKey) return;

    updateSong(song.id, { key: currentKey }).catch(console.error);
  }, [currentKey]);

  useEffect(() => {
    if(!song) return;
    if (!song.id) return;
    if (!originalKey) return;

    updateSong(song.id, { originalKey: originalKey }).catch(console.error);
  }, [originalKey]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!song) return null;

  return (
    <div className="max-w-dvw mx-auto pt-4 pl-6">
      {/* TODO:<Link to="/" className="text-blue-600 hover:underline">&larr; Back to Songs</Link> */}
      <h1 className="text-5xl text-center font-bold mt-2 mb-2">{song.title}</h1>
      <div className="text-xs text-center font-mono ">by {song.artist}</div>
      
      <div className="mt-4 flex justify-center gap-6 font-mono text-sm">
        {/* Current Key */}
        <label className="flex items-center gap-1">
          <span className="text-gray-600">Key: </span>
          <select
            value={currentKey}
            onChange={(e) => setCurrentKey(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {MUSICAL_KEYS.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </label>

        {/* Original Key */}
        <label className="flex items-center gap-1">
          <span className="text-gray-600">Original Key: </span>
          <select
            value={originalKey}
            onChange={(e) => setOriginalKey(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {MUSICAL_KEYS.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </label>
      </div>

      {song.instruments && Object.keys(song.instruments).length > 0 && (
        <div>
          <span className="songitem-label">Players:</span>
          <ul className="songitem-players">
            {Object.entries(song.instruments).map(([instrument, player]) => (
              <li key={instrument}>
                <span className="font-medium">{instrument.replace(/([A-Z])/g, " $1")}</span> : {player}
              </li>
            ))}
          </ul>
          <button>Add one more</button>
        </div>
      )}

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
