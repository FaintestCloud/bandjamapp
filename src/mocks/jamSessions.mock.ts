import type { JamSession } from "../types.ts";

export const mockJamSessions: JamSession[] = [
  {
    id: "260130",
    // Future date so countdown works
    date: new Date("2026-01-30T20:00:00"),
    songIds: ["s001", "s002", "s003"],
  },
  {
    id: "260220",
    date: new Date("2026-02-20T18:30:00"),
    songIds: ["s004", "s005"],
  },
];
