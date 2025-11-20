import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import type { Song } from "../types.ts";

export default function useSongs() {
    const [songs, setSongs] = useState<Song[]>([]);
    const [newSong, setNewSong] = useState("");
    const [newKey, setNewKey] = useState("");
    const [newComment, setNewComment] = useState("");
    
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "songs"), (snapshot) => {
            const mapped: Song[] = snapshot.docs.map((doc) => {
                const data = doc.data() as Partial<Song>;
                return {
                    id: doc.id,
                    title: data.title ?? "",
                    key: data.key ?? "C",
                    instruments: (data.instruments as Record<string, any>) ?? {},
                    comments: (data.comments as any[]) ?? [],
                };
            });
            setSongs(mapped);
        });
        return () => unsub();
    }, []);

    const addSong = async () => {
        if (!newSong.trim())
            return;

        const commentArray = newComment.trim()
            ? [{ text: newComment.trim(), createdAt: serverTimestamp() }]
            : [];


        await addDoc(collection(db, "songs"), {
            title: newSong,
            key: newKey,
            instruments: {},
            comments: commentArray });

        setNewSong("");
        setNewKey("C");
        setNewComment("");
    };

    return {
        songs,
        newSong,
        setNewSong,
        newKey,
        setNewKey,
        newComment,
        setNewComment,
        addSong,
    };
}