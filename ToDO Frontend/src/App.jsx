import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import TodoForm from "./pages/TodoForm";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
  <Route path="/" element={<Navigate to="/dashboard" />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route path="/dashboard" element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } />

  <Route path="/todos/new" element={
    <ProtectedRoute>
      <TodoForm />
    </ProtectedRoute>
  } />

  <Route path="/todos/edit/:id" element={
    <ProtectedRoute>
      <TodoForm isEdit />
    </ProtectedRoute>
  } />

  <Route path="/admin" element={
    <ProtectedRoute adminOnly>
      <AdminDashboard />
    </ProtectedRoute>
  } />
</Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
