import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useAuth } from "../auth/AuthContext";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo / Brand */}
        <Link
          to="/"
          className="text-xl font-bold text-gray-200"
        >
          Band Jam
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8 md:space-x-12 lg:space-x-16 text-sm font-medium">
          <Link
            to="/"
            className="text-gray-300 hover:text-indigo-400 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/jamsessionlist"
            className="text-gray-300 hover:text-indigo-400 transition-colors"
          >
            Session
          </Link>
          <Link
            to="/songlist"
            className="text-gray-300 hover:text-indigo-400 transition-colors"
          >
            Songs
          </Link>
        </nav>

        {/* User Info + Actions */}
        <div className="flex items-center space-x-4">
          {/* Username */}
          <span className="text-gray-200 font-medium">
            {user?.displayName || "Guest"}
          </span>

          {/* Logout */}
          <button
            onClick={() => signOut(auth)}
            className="text-sm font-semibold text-white hover:text-red-500 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
