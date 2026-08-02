import { useEffect, useState } from "react";
import { updateSong } from "../services/songService"
import {INSTRUMENTS_LIST} from "../constants.ts"

interface Props {
  instruments: Record<string, string>;
  songId: string;
  onClose: () => void;
  onConfirm: (data: Record<string, string>) => void;
}

export default function SongInstrumentEditor({
  instruments,
  songId,
  onClose,
  onConfirm
}: Props) {

  const [editableInstruments, setEditableInstruments] =
    useState<Record<string, string>>({...instruments});

  useEffect(() => {
  }, [editableInstruments]);

  async function handleConfirm() {
    const ordered: Record<string, string> = {};

    INSTRUMENTS_LIST.forEach((instrument) => {
      const player = editableInstruments[instrument];

      if (player?.trim()) {
        ordered[instrument] = player.trim();
      }
    });

    await updateSong(songId, {
      instruments : ordered
    })

    onConfirm(ordered);
  }

  return (
    
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-dark-gray p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">
          Players
        </h2>

        <div className="space-y-3">
          {INSTRUMENTS_LIST.map((instruments) => (
            <div
              key={instruments}
              className="flex items-center gap-3"
            >
              <label className="w-28 font-medium">
                {instruments}
              </label>

              <input
                type="text"
                className="flex-1 rounded border px-2 py-1"
                value={editableInstruments[instruments] ?? ""}
                onChange={(e) =>
                  setEditableInstruments((prev) => ({
                    ...prev,
                    [instruments]: e.target.value,
                  }))
                }
              />
            </div>
          ))}
        </div>

        {/* Editor content here */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={() => handleConfirm()}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Confirm
          </button>
        </div>

      </div>
    </div>
  );
}