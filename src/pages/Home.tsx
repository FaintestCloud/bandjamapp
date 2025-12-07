import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useAuth } from "../auth/AuthContext";
import SongList from "../components/SongList";

export default function Home() {
    const { user } = useAuth();
    return (
        <div className="p-4 max-w-md mx-auto">
            <div className="flex justify-between mb-4">
                <p className="text-lg">Welcome, {user?.displayName}</p>
                <button onClick={() => signOut(auth)} className="text-red-500">
                    Logout
                </button>
            </div>

            <h1 className="text-3xl font-bold mb-4">Welcome to Band Jam!</h1>
            <SongList />
        </div>
    );
}