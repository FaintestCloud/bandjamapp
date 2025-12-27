import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useJamSession from "../hooks/useJamSession.ts";

export default function JamSession() {
    const { id } = useParams<{ id: string }>();
    const { jamSession, loading, error } = useJamSession(id!);

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4">Error loading session</div>;
    if (!jamSession) return <div className="p-4">Session not found</div>;
    console.log(jamSession.date);
    return (
    <div className="p-4">
        <div className="font-medium text-black mb-2">
            Session Date:{" "}
            {jamSession.date.toLocaleString()}
        </div>
        <div className="text-gray-600 mb-4">
        Songs in this session: {jamSession.songIds.length}
        </div>

        <ul className="list-disc pl-5 space-y-1">
        {jamSession.songIds.map((songId) => (
            <li key={songId}>{songId}</li>
        ))}
        </ul>
    </div>
    );
}