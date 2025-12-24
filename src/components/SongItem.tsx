import type { Song } from "../types.ts";
import { deleteSong } from "../services/songService.ts";

type Props = { song: Song };

export default function SongItem({ song }: Props) {
    console.log(song.id + " " + song.title);
    return (
        <li className="border-b py-2">
            {song.title} <span className="text-gray-500 text-sm">({song.key})</span>
            {song.comments && song.comments.length > 0 && (
                <div className="text-sm text-gray-600 mt-1">
                    {song.comments.map((c, i) => (
                        <div key={i}>{(c as any).text}</div>
                    ))}
                </div>
            )}
            
            <button
              onClick={() => song.id && deleteSong(song.id)}
              className="text-red-500"
            >Delete
            </button>

            {/* await updateSong(song.id!, { title: "New Title" }); */}

        </li>
    );
}
