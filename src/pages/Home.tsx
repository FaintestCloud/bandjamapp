import SongList from "../components/SongList";

export default function Home({user}: {user: any}) {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Welcome to Band Jam!</h1>
            <SongList />
        </div>
    );
}