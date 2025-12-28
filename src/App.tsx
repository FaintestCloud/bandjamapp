// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import SplashScreen from "./components/LoadingSplashScreen";
import SongDetail from "./pages/SongDetail";
import JamSession from "./pages/JamSessionDetail";
import JamSessionList from "./pages/JamSessionList";

function AppContent() {
  const { loading } = useAuth();

  if (loading) return <SplashScreen />;

  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Route */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/song/:id" element={<SongDetail />} />
        <Route path="/jamsession/:id" element={<JamSession />} />
        <Route path="/jamsessionlist" element={<JamSessionList />} />
      </Route>

      {/* New Route Example */}
      {/* <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      /> */}

      {/* Catch-all / 404 Route */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
