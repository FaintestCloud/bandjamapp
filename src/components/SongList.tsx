import useSongs from "../hooks/useSongs.ts";
import SongInput from "./SongInput.tsx";
import SongItem from "./SongItem";

export default function SongList() {
    const {
        songs,
        newSong,
        setNewSong,
        newKey,
        setNewKey,
        newComment,
        setNewComment,
        addSong,
        } = useSongs();

    return (
        <div>
            <h2 className="text-xl font-bold mb-2">Song List</h2>

            <SongInput
                newSong={newSong}
                setNewSong={setNewSong}
                newKey={newKey}
                setNewKey={setNewKey}
                newComment={newComment}
                setNewComment={setNewComment}
                addSong={addSong}
            />
            <ul>
                {songs.map((song) => (
                    <SongItem key={song.id} song={song} />
                ))}
            </ul>
        </div>
    );
}
