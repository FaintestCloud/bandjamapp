import Header from "../components/Header.tsx";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-t from-gray-700 to-gray-200">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

// If ever want to have individual background, page hgiht = screen height - header height (calc(100vh-64px))
// e.g.: min-h-[calc(100vh-64px)] bg-black