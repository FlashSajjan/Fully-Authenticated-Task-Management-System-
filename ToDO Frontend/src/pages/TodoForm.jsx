import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function TodoForm({ isEdit = false }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("Non-Urgent");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch todo when editing
  useEffect(() => {
    if (isEdit && id) {
      setLoading(true);
      api
        .get(`/todos/${id}`)
        .then((res) => {
          const todo = res.data;
          setTitle(todo.title);
          setDescription(todo.description || "");
          setDueDate(todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : "");
          setCategory(todo.category || "Non-Urgent");
          setCompleted(todo.completed);
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to load todo");
        })
        .finally(() => setLoading(false));
    }
  }, [isEdit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todoData = {
      title,
      description,
      category,
      ...(dueDate && { dueDate: new Date(dueDate).toISOString() }),
      ...(isEdit && { completed })
    };

    try {
      if (isEdit) {
        await api.put(`/todos/${id}`, todoData);
      } else {
        await api.post("/todos", todoData);
      }

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isEdit ? "Edit Todo" : "Create Todo"}
        </h2>

        {/* Title */}
        <input
          type="text"
          placeholder="Todo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={100}
          className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Description */}
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={500}
          rows={3}
          className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Non-Urgent">Non-Urgent</option>
          <option value="Urgent">Urgent</option>
        </select>

        {/* Due Date */}
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Completed (edit only) */}
        {isEdit && (
          <label className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="rounded"
            />
            <span>Mark as completed</span>
          </label>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-2"
        >
          {isEdit ? "Update Todo" : "Create Todo"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="w-full border py-2 rounded hover:bg-gray-50"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
