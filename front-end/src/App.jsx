import { useState, useEffect } from "react";
import { FiCheckCircle, FiCircle, FiTrash2 } from "react-icons/fi";
import "./App.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/todos`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;
    try {
      const res = await fetch(`${API_BASE_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      if (res.ok) {
        setNewTodo({ title: "", description: "" });
        fetchTodos();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/todos/${id}`, { method: "DELETE" });
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTodos = todos.filter((todo) =>
    filter === "all"
      ? true
      : filter === "completed"
      ? todo.completed
      : !todo.completed
  );

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 Todo Manager</h1>
        <p>Keep your tasks organized</p>
      </header>

      <form className="add-todo-form" onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Add new todo..."
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
        />
        <button className="add-btn">Add</button>
      </form>

      <div className="filter-buttons">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All ({todos.length})
        </button>
        <button
          className={filter === "pending" ? "active" : ""}
          onClick={() => setFilter("pending")}
        >
          Pending ({todos.filter((t) => !t.completed).length})
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed ({todos.filter((t) => t.completed).length})
        </button>
      </div>

      <div className="todo-list">
        {loading ? (
          <p>Loading...</p>
        ) : filteredTodos.length === 0 ? (
          <p>No todos to show.</p>
        ) : (
          filteredTodos.map((todo) => (
            <div key={todo.id} className="todo-item">
              <div className="todo-left">
                <span
                  onClick={() => toggleTodo(todo.id, todo.completed)}
                  className={todo.completed ? "completed" : ""}
                >
                  {todo.completed ? <FiCheckCircle /> : <FiCircle />}
                </span>
                <div className="todo-content">
                  <p className={`todo-title ${todo.completed ? "completed" : ""}`}>
                    {todo.title}
                  </p>
                  {todo.description && (
                    <p className="todo-description">{todo.description}</p>
                  )}
                </div>
              </div>
              <button
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
              >
                <FiTrash2 />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
