// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import TodoCard from "../components/TodoCard";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState([]);
  const [adminView, setAdminView] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const url =
      user.role === "admin" && adminView
        ? "/admin/todos"
        : "/todos";

    api.get(url).then(res => setTodos(res.data));
  }, [adminView, user.role]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-800">Todo App</h1>
            <span className="text-sm text-gray-600">Welcome, {user.username}!</span>
            {user.role === 'admin' && (
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                Admin
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {user.role === "admin" && (
              <button
                onClick={() => navigate("/admin")}
                className="text-purple-600 hover:text-purple-800 text-sm font-medium"
              >
                Admin Panel
              </button>
            )}
            
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="p-4 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Dashboard</h2>

          <button
            onClick={() => navigate("/todos/new")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + New Todo
          </button>
        </div>

        {user.role === "admin" && (
          <button
            onClick={() => setAdminView(!adminView)}
            className="mb-4 text-blue-600 underline"
          >
            {adminView ? "View My Todos" : "View All Todos"}
          </button>
        )}

        {todos.length === 0 && (
          <p className="text-gray-500">No todos found.</p>
        )}

        {todos.map(todo => (
          <TodoCard key={todo._id} todo={todo} />
        ))}
      </div>
    </div>
  );
}
