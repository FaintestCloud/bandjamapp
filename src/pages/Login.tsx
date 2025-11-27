import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebaseConfig"

export default function Login() {
    const handleLogin = async() => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.log(error)
        }
    };

    return (
    <div className="flex flex-col h-screen items-center justify-center">
        <div className="bg-white p-6 shadow-md rounded-lg w-80 text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome</h1>
        <p className="mb-4">Sign in to continue your Jam session</p>
        <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
            Login with Google
        </button>
        </div>
    </div>
    );
}