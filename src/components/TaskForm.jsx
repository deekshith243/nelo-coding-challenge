import React, { useState } from "react";

const initialForm = {
  title: "",
  description: "",
  priority: "medium",
  dueDate: "",
};

function TaskForm({ onAddTask }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required.";
    if (!form.description.trim()) e.description = "Description is required.";
    if (!form.priority) e.priority = "Priority is required.";
    if (!form.dueDate) e.dueDate = "Due date is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onAddTask(form);
    setForm(initialForm);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3 text-slate-800">
        Create New Task
      </h2>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm mb-1 text-slate-600">Title</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-100"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Task title"
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1 text-slate-600">
            Priority
          </label>
          <select
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-100"
            value={form.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <p className="text-xs text-red-500 mt-1">{errors.priority}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1 text-slate-600">
            Due Date
          </label>
          <input
            type="date"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-100"
            value={form.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
          />
          {errors.dueDate && (
            <p className="text-xs text-red-500 mt-1">{errors.dueDate}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm mb-1 text-slate-600">
            Description
          </label>
          <textarea
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-100"
            rows="3"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Task details"
          />
          {errors.description && (
            <p className="text-xs text-red-500 mt-1">{errors.description}</p>
          )}
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
