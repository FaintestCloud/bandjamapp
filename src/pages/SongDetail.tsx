import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { ChordProParser, HtmlTableFormatter } from 'chordsheetjs';

import { db } from "../firebaseConfig";
import { updateSong } from "../services/songService"
import SongInstrumentEditor from "../components/SongInstrumentEditor.tsx";
import type { Song } from "../types";
import useSong from "../hooks/useSong.ts";
import { mockSongs } from "../mocks/songs.mock";

const useMock = false;
const MUSICAL_KEYS = [
  "C", "C#", "D", "D#", "E",
  "F", "F#", "G", "G#", "A",
  "A#", "B", "-"
];
const chordProParser = new ChordProParser;
const htmlTableFormatter = new HtmlTableFormatter;

export default function SongDetail() {
  const { id } = useParams<{ id: string }>();
  const { song , loading, error} = useSong(id);
  const [showInstrumentEditor, setShowInstrumentEditor] = useState(false);

  const [originalKey, setOriginalKey] = useState<string>("-");
  const [currentKey, setCurrentKey] = useState<string>("-");

  const [isEditingLink, setIsEditingLink] = useState(false);
  const [referenceLink, setReferenceLink] = useState("")
  let songChordParsed = null;
  const instruments = song?.instruments ?? {};


  useEffect(() => {
    if (!song) return;
    console.log('useEffect');

    setCurrentKey(song.key ?? "-");
    setOriginalKey(song.originalKey ?? "-");
    setReferenceLink(song.referenceLink ?? "");
  }, [song]);
  

  useEffect(() => {
    if(!song) return;
    if (!song.id) return;
    if (!currentKey) return;
    if (song.key === currentKey) return;

    updateSong(song.id, { key: currentKey }).catch(console.error);
    song.key = currentKey;
  }, [currentKey]);

  useEffect(() => {
    if(!song) return;
    if (!song.id) return;
    if (!originalKey) return;
    if (song.originalKey === originalKey) return;

    updateSong(song.id, { originalKey: originalKey }).catch(console.error);
    song.originalKey = originalKey;
  }, [originalKey]);

  if (loading || !song) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error.message}</div>;
  if (!song) return null;

  if (song.lyrics && MUSICAL_KEYS.includes(originalKey) && originalKey != "-" && MUSICAL_KEYS.includes(currentKey) && currentKey != "-") {
    const rawParsed = chordProParser.parse(song.lyrics).setKey(originalKey).changeKey(currentKey);
    songChordParsed = htmlTableFormatter.format(rawParsed);
  } else {
    songChordParsed = null;
  }

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

      {/* Instruments & Players */}
      <div>
        <div className="flex items-center gap-3">
          <span className="songitem-label">Players</span>
        </div>
      </div>
      <button
        onClick={() => setShowInstrumentEditor(true)}
        className="text-sm text-blue-500"
      >
        Edit Players
      </button>
      {
        showInstrumentEditor && (
          <SongInstrumentEditor
            instruments={instruments}
            songId={song.id}
            onClose={() => setShowInstrumentEditor(false)}
            onConfirm={() => {
              setShowInstrumentEditor(false);
            }}
          />
        )
      }
      <ul className="songitem-players">
        {Object.entries(instruments).map(([instrument, player]) => (
          <li key={instrument}>
            <span className="font-medium">
              {instrument.replace(/([A-Z])/g, " $1")}
            </span>
            {" : "}
            {player}
          </li>
        ))}
      </ul> 

      {/* Reference Link */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="shrink-0 font-medium">Reference:</span>

          {!isEditingLink ? (
            <>
              {referenceLink ? (
                <a
                  href={referenceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:underline hover:text-gray-900 max-w-full"
                  title={referenceLink}
                >
                Link
              </a>
              ) : (
                <span className="text-gray-400">No link</span>
              )}

              <button
                onClick={() => setIsEditingLink(true)}
                className="text-sm text-blue-600 hover:underline"
              >
                Edit
              </button>

            </>
          ) : (
            <>
              <input
                type="text"
                value={referenceLink}
                onChange={(e) => setReferenceLink(e.target.value)}
                className="rounded border px-2 py-1"
              />

              <button
                onClick={async () => {
                  await updateSong(song.id, {
                    referenceLink: referenceLink.trim(),
                  });
                  setIsEditingLink(false);
                }}
                className="rounded bg-blue-500 px-3 py-1 text-white"
              >
                Save
              </button>

              <button
                onClick={() => {
                  setReferenceLink(song.referenceLink ?? "");
                  setIsEditingLink(false);
                }}
                className="rounded border px-3 py-1"
              >
                Cancel
              </button>
          </>
          )}
        </div>
      </div>

      {/* {song.referenceLink && (
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
      )} */}

      {/* Song Lyrics and Chords */}
      {songChordParsed && (
        <div
        className=""
        dangerouslySetInnerHTML={{__html: songChordParsed }}
        />
      )}

      {/* Comments */}
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
