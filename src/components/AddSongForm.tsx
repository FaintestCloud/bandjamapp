import { useState } from "react";
import { addSong } from "../services/songService.ts";
import { updateJamSession } from "../services/jamsessionService.ts";

interface AddSongFormProps {
  jamSessionId?: string; // optional
}

export default function AddSongForm({jamSessionId}: AddSongFormProps) {
  const [title, setTitle] = useState("");
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    setError(null);

    try{
      const newSongRef = await addSong({ title, key });
      if (jamSessionId) {
        await updateJamSession(jamSessionId, {
          addSongId : newSongRef.id,
        });
      }
      setTitle("");
      setKey("");
    } catch (err: any) {
      setError("Failed to add song")
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3">
      {error && <p className="text-red-500">{error}</p>}
      <input
        className="w-full border p-2 rounded"
        placeholder="Song title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Key (optional)"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        disabled={loading}
      />

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Song"}
      </button>
    </form>
  );
}
