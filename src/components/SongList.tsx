import useSongs from "../hooks/useSongs.ts";
import SongItem from "./SongItem";
import AddSongForm from "./AddSongForm";

export default function SongList() {
    const {
        songs
        } = useSongs();

    return (
        <div>
            <h2 className="text-xl font-bold mb-2">Song List</h2>
            <ul>
                {songs.map((song) => (
                    <SongItem key={song.id} song={song} />
                ))}
            </ul>
            <AddSongForm/>
        </div>
    );
}
