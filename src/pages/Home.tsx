import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import SongList from "../components/SongList";
import Countdown from "../components/CountdownTimer";

export default function Home() {
    return (
        <div className="
        h-full
        flex
        justify-center
        items-start md:items-center
        ">
            {/* Main Content */}
            <main className="max-w-3xl mx-auto px-6 py-10">
                Next Sessions in
                <Countdown targetDate={new Date("2026-06-30T20:00:00")}></Countdown>
            </main>
        </div>
    );
}