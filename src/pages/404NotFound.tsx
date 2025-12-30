import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-indigo-600">404</h1>
      <p className="mt-4 text-lg text-gray-600">
        Sorry, the page you’re looking for can’t be found.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-md bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
