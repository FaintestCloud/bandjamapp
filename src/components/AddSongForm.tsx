import { useState } from "react";
import { addSong } from "../services/songService.ts";

export default function AddSongForm() {
  const [title, setTitle] = useState("");
  const [key, setKey] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    await addSong({ title, key });
    setTitle("");
    setKey("");
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3">
      <input
        className="w-full border p-2 rounded"
        placeholder="Song title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Key (optional)"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded"
      >
        Add Song
      </button>
    </form>
  );
}
