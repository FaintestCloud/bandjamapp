# Band Jam App

A simple jam session planner and song idea manager for musicians.

## What it does

- Authenticate users with Google via Firebase Auth
- Add, view, and delete songs
- Save song title, key, and comments
- Show individual jam session details
- Protect routes so only signed-in users can access the app

## Built with

- React 19 + TypeScript
- Vite
- Firebase Auth and Firestore
- Tailwind CSS

## Setup

### Requirements

- Node.js 18 or newer
- Firebase project

### Install

1. Clone the repo and open the project folder:
   ```sh
   git clone https://github.com/your-username/bandjamapp.git
   cd band-jam-app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Add Firebase environment variables in a `.env.local` file at the project root:
   ```env
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

4. Start the app:
   ```sh
   npm run dev
   ```

## Usage

- Open the app and sign in with Google
- Add songs with title, key, and comments
- Browse songs and jam sessions
- Use song and session detail pages for more information

## Project structure

- `src/components/` — reusable UI components
- `src/hooks/` — custom React hooks
- `src/pages/` — route pages
- `src/auth/` — authentication context
- `src/services/` — data and Firestore helpers
- `src/firebaseConfig.ts` — Firebase initialization
- `src/types.ts` — shared TypeScript types

## Scripts

- `npm run dev` — start development server
- `npm run build` — build production assets
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint

## Notes

This app uses Vite environment variables for Firebase configuration. Keep `.env.local` out of source control.

## SongDoc Architecture

`SongDoc` is the canonical internal representation of a song's lyrics and chords. It acts as an abstraction layer between the application and external song formats such as ChordPro, plain text, PDF, or image-based input.

The main principle is that all external formats are converted into `SongDoc` before being used by the application, and `SongDoc` is converted back into the required format when saving or exporting.

```text
External Format
      │
      │  songDocFrom()
      ▼
   SongDoc
      │
      ├── Editor
      │     └── SongDoc → SongDoc
      │
      ├── Renderer / UI
      │
      │  songDocTo()
      ▼
External Format
```

### Adapter

Each adapter handles conversion between `SongDoc` and one external format.

Each adapter exposes two public operations:
```ts
toSongDoc()
fromSongDoc()
```

For example, the ChordPro adapter handles:

```text
ChordPro → SongDoc
SongDoc  → ChordPro
```

### SongDoc Editor

The editor contains operations that modify the `SongDoc` itself.


### Public API

`index.ts` provides the main API for interacting with the SongDoc system:

```ts
songDocFrom("chordPro", input)
songDocTo("chordPro", songDoc)
```

This keeps the rest of the application independent of the specific adapter implementation.


### Design Principle

`SongDoc` is the central interchange format.

```text
PDF ───────┐
Image ─────┤
Text ──────┼──→ SongDoc ──→ ChordPro
ChordPro ──┤       │
Other ─────┘       ├──────→ UI
                   │
                   └──────→ Editor
```

This allows new import/export formats to be added without changing the core `SongDoc` model, editor logic, or UI.

## TODO next
Func
- update song details : artists, chords/lyrics


- Hooks : clean all the data and normalize them : handle empty data
- Back link for song detail page
- Handle error message (e.g. 'throw error' in updateJamSession)
- Handle delete/more ui of SongItem (when collapse, button disappear without animation ; consider swiping for mobile user)
- refine 'no upcoming jam session' on homepage
- add deletion confirm
- handle adblock scenario where login page couldn't be loaded
- beautify anonymous login ; add passcode

- Handle concurrent editing / real-time updates (current behaviour : pages automatically refreshes on db data changes)
   - Investigate how onSnapshot updates should interact with in-progress edits.
   - Prevent users from losing unsaved changes when another user updates the same song.
   - Consider approaches such as:
      - Pause applying live updates while editing.
      - Detect document version/timestamp changes and prompt the user to reload or merge changes.
      - Implement optimistic updates with conflict detection.
      - Add document locking if simultaneous editing becomes a common use case.

- Instruments
   - Beautify components and edit button

- Enhance UI with MUI or shadcn/ui

## SongDoc
- Create songDoc model : import -> parse -> songDoc -> serialize -> chordPro -> firebase
- seperate transpose from parsing
- chord: "C#m7/G#" or 
{
    root: "C#",
    quality: "m7",
    bass: "G#"
}
- consider using chordsheet as songDoc