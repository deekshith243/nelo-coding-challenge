import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import useDebounce from "./hooks/useDebounce";

const SESSION_KEY = "nelo_user";

function App() {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  // Task mail automation – every 20 mins
  useEffect(() => {
    function checkPendingTasks() {
      setTasks((prev) => {
        const pending = prev.filter((t) => !t.completed);
        if (pending.length > 0) {
          console.log("📧 Task Mail Automation: Pending tasks found:");
          pending.forEach((t) => {
            console.log(
              `Reminder email: "${t.title}" is pending and due on ${t.dueDate}`
            );
          });
        } else {
          console.log("📧 Task Mail Automation: No pending tasks.");
        }
        return prev;
      });
    }

    const interval = setInterval(checkPendingTasks, 20 * 60 * 1000);
    // For testing: use 15000 (15 sec) instead while demoing if you want

    return () => clearInterval(interval);
  }, []);

  const handleLogin = (email, password) => {
    const userData = { email };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setUser(null);
    setTasks([]);
  };

  const handleAddTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      dueDate: taskData.dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleUpdateTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Filtering + elastic search style
  const filteredTasks = tasks
    .filter((task) => {
      if (statusFilter === "completed") return task.completed;
      if (statusFilter === "pending") return !task.completed;
      return true;
    })
    .filter((task) => {
      if (priorityFilter === "all") return true;
      return task.priority === priorityFilter;
    })
    .filter((task) => {
      if (!debouncedSearchTerm.trim()) return true;
      const term = debouncedSearchTerm.toLowerCase();
      return (
        task.title.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term)
      );
    });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-semibold text-slate-800">
          Nelo Task Manager
        </h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">
            Logged in as <span className="font-medium">{user.email}</span>
          </span>
          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1 rounded-md border border-slate-300 hover:bg-slate-100"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <TaskForm onAddTask={handleAddTask} />
        </div>

        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <FilterBar
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            priorityFilter={priorityFilter}
            onPriorityFilterChange={setPriorityFilter}
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
          />
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <TaskList
            tasks={filteredTasks}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
