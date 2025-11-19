import React from "react";

export default function TaskList({ tasks, toggleComplete, deleteTask, startEdit }) {
  return (
    <ul className="space-y-2">
      {tasks.length === 0 && (
        <li className="p-4 rounded-lg bg-white border border-dashed border-gray-200 text-center text-gray-500">
          No tasks
        </li>
      )}

      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between p-3 bg-white border rounded-lg"
        >
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
              className="w-5 h-5"
            />
            <div>
              <div
                className={`text-sm ${
                  task.completed
                    ? "line-through text-gray-400"
                    : "text-gray-900"
                }`}
              >
                {task.text}
              </div>
              <div className="text-xs text-gray-400">
                {new Date(task.createdAt).toLocaleString()}
              </div>
            </div>
          </label>

          <div className="flex gap-2">
            <button
              onClick={() => startEdit(task)}
              className="p-2 rounded hover:bg-gray-100"
            >
              ✏️
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="p-2 rounded hover:bg-gray-100 text-red-600"
            >
              🗑
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
