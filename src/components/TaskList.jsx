import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onUpdateTask, onDeleteTask, onToggleComplete }) {
  if (tasks.length === 0) {
    return (
      <p className="text-sm text-slate-500 text-center">
        No tasks found. Create a new task to get started.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
}

export default TaskList;
