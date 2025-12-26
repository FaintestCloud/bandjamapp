import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import SongList from "../components/SongList";
import Countdown from "../components/CountdownTimer";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-t from-gray-700 to-gray-50">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    {/* Logo / Brand */}
                    <h1 className="text-xl font-bold text-indigo-600">
                        Band Jam
                    </h1>

                    {/* Navigation */}
                    <nav className="flex space-x-8 text-sm font-medium">
                        <a
                            href="#"
                            className="text-gray-600 hover:text-indigo-600 transition-colors"
                        >
                            Home
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 hover:text-indigo-600 transition-colors"
                        >
                            Session
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 hover:text-indigo-600 transition-colors"
                        >
                            Songs
                        </a>
                    </nav>

                    {/* User Info + Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Display username */}
                        <span className="text-gray-200 font-medium">
                            {auth.currentUser?.displayName || "Guest"}
                        </span>

                        {/* Logout button */}
                        <button
                            onClick={() => signOut(auth)}
                            className="text-sm font-semibold text-white hover:text-red-500 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-3xl mx-auto px-6 py-10">
                Next Sessions in
                <Countdown targetDate={new Date("2026-06-31T20:00:00")}></Countdown>
            </main>
        </div>
    );
}