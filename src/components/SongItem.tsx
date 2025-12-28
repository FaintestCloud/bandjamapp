import { Link } from "react-router-dom";
import type { Song } from "../types.ts";
import { deleteSong } from "../services/songService.ts";

type Props = { song: Song };

export default function SongItem({ song }: Props) {
    return (
        <li className="border-b py-2">
            <Link to={`/song/${song.id}`}>{song.title} </Link>
            <span className="text-gray-500 text-sm"> Key : ({song.key})</span>
            {song.comments && song.comments.length > 0 && (
                <div className="text-sm text-gray-600 mt-1">
                    {song.comments.map((c, i) => (
                        <div key={i}>{(c as any).text}</div>
                    ))}
                </div>
            )}

            
            {/* <button
              onClick={() => song.id && deleteSong(song.id)}
              className="text-red-500"
            >Delete
            </button> */}

            {/* await updateSong(song.id!, { title: "New Title" }); */}

        </li>
    );
}
