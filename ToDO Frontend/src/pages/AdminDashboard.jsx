import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers();
    } else {
      fetchAllTodos();
    }
  }, [activeTab]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllTodos = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/todos");
      setTodos(res.data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      await api.patch(`/admin/users/${userId}/role`, { role: newRole });
      fetchUsers(); // Refresh the list
      alert("User role updated successfully!");
    } catch (error) {
      console.error("Failed to update user role:", error);
      alert("Failed to update user role");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
            <span className="text-sm text-gray-600">Welcome, {user.username}!</span>
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
              Admin
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Back to Dashboard
            </button>
            
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

        <div className="p-4 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
          {/* Tab Navigation */}
          <div className="flex mb-6 border-b">
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 font-medium ${
                activeTab === "users"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Users ({users.length})
            </button>
            <button
              onClick={() => setActiveTab("todos")}
              className={`px-4 py-2 font-medium ml-4 ${
                activeTab === "todos"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              All Todos ({todos.length})
            </button>
          </div>

          {loading && (
            <div className="text-center py-8">Loading...</div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && !loading && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((userItem) => (
                    <tr key={userItem._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{userItem.username}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {userItem.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          userItem.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {userItem.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {new Date(userItem.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {userItem._id !== user._id && (
                          <select
                            value={userItem.role}
                            onChange={(e) => updateUserRole(userItem._id, e.target.value)}
                            className="border rounded px-2 py-1 text-sm"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        )}
                        {userItem._id === user._id && (
                          <span className="text-gray-400 text-sm">Current User</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Todos Tab */}
          {activeTab === "todos" && !loading && (
            <div className="space-y-4">
              {todos.map((todo) => (
                <div key={todo._id} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{todo.title}</h3>
                      {todo.description && (
                        <p className="text-gray-600 mt-1">{todo.description}</p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>By: {todo.user?.username || 'Unknown'}</span>
                        <span>Category: {todo.category}</span>
                        <span>Created: {new Date(todo.createdAt).toLocaleDateString()}</span>
                        {todo.dueDate && (
                          <span>Due: {new Date(todo.dueDate).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                    <div className="ml-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        todo.completed 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {todo.completed ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {todos.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No todos found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }