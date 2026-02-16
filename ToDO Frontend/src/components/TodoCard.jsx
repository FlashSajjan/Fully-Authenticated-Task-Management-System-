import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function TodoCard({ todo, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      try {
        await api.delete(`/todos/${todo._id}`);
        if (onDelete) onDelete(todo._id);
        // Refresh the page to update the list
        window.location.reload();
      } catch (error) {
        console.error("Failed to delete todo:", error);
        alert("Failed to delete todo");
      }
    }
  };

  const toggleComplete = async () => {
    try {
      await api.put(`/todos/${todo._id}`, {
        ...todo,
        completed: !todo.completed
      });
      // Refresh the page to update the list
      window.location.reload();
    } catch (error) {
      console.error("Failed to update todo:", error);
      alert("Failed to update todo");
    }
  };

  return (
    <div className="border border-gray-200 p-4 rounded-lg mb-3 bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className={`font-bold text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {todo.title}
          </h3>
          
          {todo.description && (
            <p className="text-gray-600 mt-1">{todo.description}</p>
          )}

          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              todo.category === 'Urgent' 
                ? 'bg-red-100 text-red-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {todo.category}
            </span>
            
            {todo.dueDate && (
              <span>Due: {new Date(todo.dueDate).toLocaleDateString()}</span>
            )}
            
            <span>Created: {new Date(todo.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="ml-4 flex flex-col gap-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            todo.completed 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {todo.completed ? '✅ Completed' : '⏳ Pending'}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
        <button
          onClick={toggleComplete}
          className={`text-sm px-3 py-1 rounded ${
            todo.completed
              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
              : 'bg-green-100 text-green-800 hover:bg-green-200'
          }`}
        >
          {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/todos/edit/${todo._id}`)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Edit
          </button>
          
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
