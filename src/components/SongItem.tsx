import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import type { Song } from "../types.ts";
import { deleteSong } from "../services/songService.ts";

interface Props {
  song: Song;
}

export default function SongItem({ song }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  // Update maxHeight when isOpen changes
  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <li className="border rounded-lg mb-2">
      {/* Header */}
      <div
        className="flex justify-between items-center p-2.5 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-gray-800 text-base">{song.title}</span>
        <span
          className={`text-gray-500 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </div>

      {/* Animated Details */}
      <div
        ref={contentRef}
        style={{ maxHeight }}
        className="overflow-hidden transition-all duration-300 px-4 text-gray-600 text-sm"
      >
        {song.key && (
          <p>
            <span className="font-semibold">Key:</span> {song.key}
          </p>
        )}
        {song.lyrics && (
          <p>
            <span className="font-semibold">Lyrics:</span> {song.lyrics}
          </p>
        )}

        {/* Delete button, only visible when expanded */}
        {isOpen && (
          <button
            onClick={() => song.id && deleteSong(song.id)}
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors mb-1"
          >
            Delete
          </button>
        )}
      </div>
    </li>
  );
}
