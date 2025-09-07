import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const fireBaseConfig = {
//     apiKey: VITE_FIREBASE_API_KEY,
//     authDomain: VITE_FIREBASE_AUTH_DOMAIN,
//     projectId: VITE_FIREBASE_PROJECT_ID,
//     storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
//     appId: VITE_FIREBASE_APP_ID,
//     // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };

const fireBaseConfig = {
  apiKey: "AIzaSyCIY3sD6PrmZRvXCY0aF7GCkaMc06sBUUM",
  authDomain: "bandjamapp.firebaseapp.com",
  projectId: "bandjamapp",
  storageBucket: "bandjamapp.firebasestorage.app",
  messagingSenderId: "133474136776",
  appId: "1:133474136776:web:5710e881de29c740f5abfd"
};

// Initialize Firebase
const app = initializeApp(fireBaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();