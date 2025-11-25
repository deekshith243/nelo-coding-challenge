import React, { useState } from "react";

function priorityBadgeClasses(priority) {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-700";
    case "medium":
      return "bg-yellow-100 text-yellow-700";
    case "low":
    default:
      return "bg-green-100 text-green-700";
  }
}

function TaskItem({ task, onUpdateTask, onDeleteTask, onToggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate,
  });

  const handleSave = () => {
    if (!editValues.title.trim() || !editValues.description.trim()) {
      alert("Title and description are required.");
      return;
    }
    onUpdateTask(task.id, editValues);
    setIsEditing(false);
  };

  return (
    <div className="border rounded-lg p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div className="flex-1">
        {isEditing ? (
          <div className="space-y-2">
            <input
              type="text"
              className="w-full border rounded-lg px-2 py-1 text-sm"
              value={editValues.title}
              onChange={(e) =>
                setEditValues((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <textarea
              className="w-full border rounded-lg px-2 py-1 text-sm"
              rows="2"
              value={editValues.description}
              onChange={(e) =>
                setEditValues((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
            <div className="flex flex-wrap gap-2">
              <select
                className="border rounded-lg px-2 py-1 text-xs"
                value={editValues.priority}
                onChange={(e) =>
                  setEditValues((prev) => ({
                    ...prev,
                    priority: e.target.value,
                  }))
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <input
                type="date"
                className="border rounded-lg px-2 py-1 text-xs"
                value={editValues.dueDate}
                onChange={(e) =>
                  setEditValues((prev) => ({
                    ...prev,
                    dueDate: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-1">
              <h3
                className={`font-semibold text-slate-800 ${
                  task.completed ? "line-through text-slate-400" : ""
                }`}
              >
                {task.title}
              </h3>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${priorityBadgeClasses(
                  task.priority
                )}`}
              >
                {task.priority.toUpperCase()}
              </span>
            </div>
            <p
              className={`text-sm text-slate-600 mb-1 ${
                task.completed ? "line-through text-slate-400" : ""
              }`}
            >
              {task.description}
            </p>
            <p className="text-xs text-slate-500">
              Due: <span className="font-medium">{task.dueDate}</span> | Status:{" "}
              <span className="font-medium">
                {task.completed ? "Completed" : "Pending"}
              </span>
            </p>
          </>
        )}
      </div>

      <div className="flex items-center gap-2 self-start md:self-center">
        <button
          className={`text-xs px-3 py-1 rounded-md border ${
            task.completed
              ? "bg-slate-100 border-slate-300 text-slate-700"
              : "bg-emerald-100 border-emerald-300 text-emerald-700"
          }`}
          onClick={() => onToggleComplete(task.id)}
        >
          {task.completed ? "Mark Pending" : "Mark Complete"}
        </button>

        {isEditing ? (
          <>
            <button
              className="text-xs px-3 py-1 rounded-md bg-blue-600 text-white"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="text-xs px-3 py-1 rounded-md border border-slate-300"
              onClick={() => {
                setIsEditing(false);
                setEditValues({
                  title: task.title,
                  description: task.description,
                  priority: task.priority,
                  dueDate: task.dueDate,
                });
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="text-xs px-3 py-1 rounded-md border border-slate-300"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}

        <button
          className="text-xs px-3 py-1 rounded-md bg-red-600 text-white"
          onClick={() => onDeleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
