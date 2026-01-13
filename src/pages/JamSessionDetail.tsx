import { useParams } from "react-router-dom";
import SplashScreen from "../components/LoadingSplashScreen";
import useJamSession from "../hooks/useJamSession.ts";
import useSongs from "../hooks/useSongs.ts";
import SongItem from "../components/SongItem";

export default function JamSession() {
    const { id } = useParams<{ id: string }>();
    const { jamSession, loading : sessionLoading, error : sessionErr } = useJamSession(id!);
    const { songs, loading : songsLoading } = useSongs(jamSession?.songIds);

    if (sessionLoading ||songsLoading ) return <SplashScreen />;
    if (sessionErr) return <div className="p-4">Error loading session</div>;
    if (!jamSession) return <div className="p-4">Session not found</div>;

    return (
    <div className="p-4">
        <div className="font-medium text-black mb-2">
            Session Date:{" "}
            {jamSession.date.toLocaleString()}
        </div>
        <div className="text-gray-600 mb-4">
        {jamSession.songIds.length} songs
        </div>

        <ul>
            {songs.map((song) => (
                <SongItem key={song.id} song={song} />
            ))}
        </ul>
    </div>
    );
}