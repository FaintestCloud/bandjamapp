import SongItem from "./SongItem";
import type { Song } from "../types.ts";

type SongListProps = {
    songs: Song[];
};

export default function SongList({songs}: SongListProps) {
    return (
        <div>
            <h2 className="text-xl font-bold mb-2">Song List</h2>
            <ul>
                {songs.map((song) => (
                    <SongItem key={song.id} song={song} />
                ))}
            </ul>
        </div>
    );
}
