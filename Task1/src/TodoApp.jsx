import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";
import EditModal from "./components/EditModal";

export default function TodoApp() {
  const STORAGE_KEY = "todo_app_tasks_v1";

  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function addTask(e) {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;
    const newTask = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((t) => [newTask, ...t]);
    setInput("");
  }

  function toggleComplete(id) {
    setTasks((t) =>
      t.map((x) => (x.id === id ? { ...x, completed: !x.completed } : x))
    );
  }

  function startEdit(task) {
    setEditingId(task.id);
    setEditingText(task.text);
  }

  function saveEdit(e) {
    e?.preventDefault();
    const text = editingText.trim();
    if (!text) return;

    setTasks((t) =>
      t.map((x) => (x.id === editingId ? { ...x, text } : x))
    );

    setEditingId(null);
    setEditingText("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingText("");
  }

  function deleteTask(id) {
    if (!confirm("Delete this task?")) return;
    setTasks((t) => t.filter((x) => x.id !== id));
  }

  function clearCompleted() {
    setTasks((t) => t.filter((x) => !x.completed));
  }

  const visible = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl">
        
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Todo List
          </h1>
          <p className="text-sm text-gray-600">
            Add, edit, delete & complete tasks — saved in your browser.
          </p>
        </header>

        {/* Add Task */}
        <TaskForm
          input={input}
          setInput={setInput}
          addTask={addTask}
        />

        {/* Filters */}
        <TaskFilters
          filter={filter}
          setFilter={setFilter}
          total={tasks.length}
        />

        {/* Task List */}
        <TaskList
          tasks={visible}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          startEdit={startEdit}
        />

        {/* Footer */}
        <footer className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {tasks.filter((t) => !t.completed).length} remaining
          </div>

          <div className="flex gap-2">
            <button
              onClick={clearCompleted}
              className="text-sm px-3 py-1 rounded bg-white border border-gray-200"
            >
              Clear completed
            </button>
            <button
              onClick={() => {
                if (confirm("Clear all tasks?")) setTasks([]);
              }}
              className="text-sm px-3 py-1 rounded bg-white border border-gray-200"
            >
              Clear all
            </button>
          </div>
        </footer>

        {/* Edit Modal */}
        <EditModal
          editingId={editingId}
          editingText={editingText}
          setEditingText={setEditingText}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
        />
      </div>
    </div>
  );
}
