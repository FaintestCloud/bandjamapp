# Band Jam App

A collaborative web application for musicians to share, manage, and comment on song ideas and jam sessions. Built with React, Firebase, and Vite.

## Features

- Google authentication (Firebase Auth)
- Add, view, and delete songs
- Store song title, key, and comments
- Jam session management (view individual sessions)
- Protected routes for authenticated users
- Animated loading splash screen
- Modular React hooks and components

## Tech Stack

- React + TypeScript
- Firebase (Auth & Firestore)
- Vite
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Firebase project ([Get started here](https://console.firebase.google.com/))

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/bandjamapp.git
   cd bandjamapp/band-jam-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure Firebase:**
   - Create a `.env.local` file in the project root:
     ```
     VITE_FIREBASE_API_KEY=your-api-key
     VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
     VITE_FIREBASE_PROJECT_ID=your-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     VITE_FIREBASE_APP_ID=your-app-id
     ```
   - Replace the values with your Firebase project credentials.

4. **Start the development server:**
   ```sh
   npm run dev
   ```

### Usage

- Visit `/login` to sign in with Google.
- Add new songs with title, key, and comments.
- View, delete, and comment on songs.
- View individual jam sessions at `/jamsession/:id`.
- Only authenticated users can access the main app.

## Project Structure

```
src/
  components/      # UI components (SongList, SongItem, etc.)
  hooks/           # Custom React hooks (useSongs, useJamSession, etc.)
  pages/           # Route pages (Home, Login, SongDetail, JamSession)
  auth/            # Auth context
  services/        # Firestore service functions
  firebaseConfig.ts
  types.ts         # TypeScript types
public/
  index.html
.env.local         # Firebase credentials (not committed)
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT


TO DO:
- Hooks : clean all the data and normalize them : handle empty data
- Back link for song detail page
- Handle error message (e.g. 'throw error' in updateJamSession)
- Handledelete of SongItem (when collapse, button disappear without animation ; consider swiping for mobile user)