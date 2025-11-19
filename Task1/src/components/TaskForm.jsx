export default function TaskForm({ input, setInput, addTask }) {
  return (
    <form onSubmit={addTask} className="flex gap-2 mb-4">
      <input
        className="flex-1 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring focus:ring-opacity-50"
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-60"
        disabled={!input.trim()}
      >
        Add
      </button>
    </form>
  );
}
