import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

export default function App() {
  // TODO: Add auth guard and proper session handling
  const isAuthenticated = false;

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}
