import type { Song } from "../types.ts";

export const mockSongs: Song[] = [
  {
    id: "s001",
    title: "Creep",
    artist: "Radiohead",
    key: "C",
    originalKey: "G",
    lyrics: `
      When you were here before
      Couldn't look you in the eye
      You're just like an angel
      Your skin makes me cry
      You float like a feather
      In a beautiful world
      I wish I was special
      You're so fucking special

      But I'm a creep
      I'm a weirdo
      What the hell am I doing here?
      I don't belong here

      I don't care if it hurts
      I want to have control
      I want a perfect body
      I want a perfect soul
      I want you to notice
      When I'm not around
      You're so fucking special
      I wish I was special

      But I'm a creep
      I'm a weirdo
      What the hell am I doing here?
      I don't belong here

      Oh, oh

      She's running out the door
      She's running out
      She run, run, run, run
      Run

      Whatever makes you happy
      Whatever you want
      You're so fucking special
      I wish I was special

      But I'm a creep
      I'm a weirdo
      What the hell am I doing here?
      I don't belong here
      I don't belong here
    `,
    instruments: {
        ElectricGuitar : "Bob",
        Drum: "James",
        Vocal: "Shaw",
        Keyboard: "Rose",
        Bass: "Dave",
    },
    referenceLink: "https://www.youtube.com/watch?v=XFkzRNyygfk&list=RDXFkzRNyygfk&start_radio=1",
    comments : [
      {
        author : "James",
        text: "This song is bomb.",
        createdAt : new Date("2025-11-30T20:24:00")
      }
    ]
},
  {
    id: "s002",
    title: "Sunrise Jam",
    key: "C",
    originalKey: "D",
    lyrics: `
    When the sun comes up again
    We’ll keep playing till the end
    `,
  },
  {
    id: "s003",
    title: "Late Night Blues",
    key: "E",
    originalKey: "E",
  },
];