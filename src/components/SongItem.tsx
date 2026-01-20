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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Update maxHeight when isOpen changes
  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <li className="border rounded-lg mb-2 max-w-lg mx-auto">
      {/* Header */}
      <div
        className="flex justify-between items-center p-2.5 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="songitem-header">{song.title}</span>
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
        className="overflow-hidden transition-all duration-300 px-4 songitem-text"
      >
        {song.originalKey && (
          <p>
            <span className="songitem-label">Original Key:</span> {song.key}
          </p>
        )}
        {song.key && (
          <p>
            <span className="songitem-label">Key:</span> {song.key}
          </p>
        )}

        {/* Players Section */}
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
          </div>
        )}

        {song.referenceLink && (
          <p className="flex gap-1">
            <span className="songitem-label shrink-0">Reference:</span>
            <a
              href={song.referenceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="songitem-link max-w-full"
              title={song.referenceLink}
            >
              Link
            </a>
          </p>
        )}

        <div className="flex gap-3">
          <Link
            to={`/song/${song.id}`}
            className="my-1 px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-600 transition-colors"
          >
            More
          </Link>

        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="my-1 px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Delete
        </button>
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-80 shadow-xl">
              <h2 className="text-lg font-semibold mb-2">
                Confirm Deletion
              </h2>

              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this song?
              </p>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    if (song.id) deleteSong(song.id);
                    setShowDeleteConfirm(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </li>
  );
}
