import { useEffect, useState } from "react";
import { db} from "../firebaseConfig";
import { collection, addDoc, onSnapshot, getDocs } from "firebase/firestore";

export default function SongList() {
    // const [songs, setSongs] = useState<Array<{ id: string; title: string; artist: string }>>([]);
    const [songs, setSongs] = useState<any[]>([]);
    const [newSong, setNewSong] = useState("");

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db,"songs"), 
            (snapshot) => {
                setSongs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            });
            return () => unsub();
    }, []);

    const addSong = async () => {
        if (newSong.trim()) {
            // Add new songs info here
            await addDoc(collection(db, "songs"), { title: newSong, key: "C", instruments: {}, comments: [] });
            setNewSong("");
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-2">Song List</h2>
            <div className="flex gap-2 mb-4">
                <input
                value = {newSong}
                onChange={(e) => setNewSong(e.target.value)}
                placeholder="Song Title"
                className="flex-1 border p-2 rounded-lg"
                />
                <button onClick={addSong} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add Song</button>
            </div>
            <ul>
                {songs.map((song) => (
                    <li key={song.id} className="border-b py-2">
                        {song.title} <span className="text-gray-500 text-sm">({song.key})</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
