import { useState } from "react";
import Countdown from "../components/CountdownTimer";
import { mockJamSessions } from "../mocks/jamSessions.mock";
import { mockSongs } from "../mocks/songs.mock";
import SongItem from "../components/SongItem";
import AddSongForm from "../components/AddSongForm";

// Mock Data
const nextSession = mockJamSessions[0];
const songs = mockSongs.filter(song =>
nextSession.songIds.includes(song.id!)
);

export default function Home() {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="
        h-full
        flex
        justify-center
        items-start md:items-center
        ">
            {/* Main Content */}
            <main className="max-w-3xl mx-auto px-6 py-10 flex flex-col space-y-6">
                Next Sessions in
                <Countdown targetDate={nextSession.date}></Countdown>

                <ul>
                    {songs.map((song) => (
                        <SongItem key={song.id} song={song} />
                    ))}
                </ul>

            <button
                onClick={() => setShowForm(true)}
                className="mb-6 w-10 h-10 flex items-center justify-center bg-gray-600 text-white rounded-full hover:bg-gray-800 transition-colors"
                title="Add Song"
                >
                <span className="text-xl font-bold">+</span>
            </button>
            </main>
        
        {/* Modal / Popup */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            {/* Close button */}
            <button
                onClick={() => setShowForm(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-sm"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4 text-black">Add Song</h2>

            {/* The AddSongForm itself */}
            <AddSongForm />
          </div>
        </div>
      )}

        </div>
    );
}