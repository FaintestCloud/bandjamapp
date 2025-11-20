type Props = {
    newSong: string;
    setNewSong: (value: string) => void;
    newKey: string;
    setNewKey: (value: string) => void;
    newComment: string;
    setNewComment: (value: string) => void;
    addSong: () => void;
};

export default function SongInput({ newSong, setNewSong, newKey, setNewKey, newComment, setNewComment, addSong }: Props) {
    return (
        <div className="flex flex-col gap-2 mb-4">
            <input
                value={newSong}
                onChange={(e) => setNewSong(e.target.value)}
                placeholder="Song Title"
                className="flex-1 border p-2 rounded-lg"
            />
            <div className="flex gap-2">
                <select
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value)}
                    className="border p-2 rounded-lg"
                >
                    {["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"].map((k) => (
                        <option key={k} value={k}>{k}</option>
                    ))}
                </select>
                <input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Optional comment"
                    className="flex-1 border p-2 rounded-lg"
                />
                <button
                    onClick={addSong}
                    disabled={!newSong.trim()}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                >
                    Add Song
                </button>
            </div>
        </div>
    );
}
