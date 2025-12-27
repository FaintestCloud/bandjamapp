import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useJamSession from "../hooks/useJamSession.ts";

export default function JamSession() {
    const { id } = useParams<{ id: string }>();
    const { jamSession, loading, error } = useJamSession(id!);

    return (
        <div className="max-w-xl mx-auto p-4">

            jamSession id = {jamSession?.id}
        </div>
    )
}