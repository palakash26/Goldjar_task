export default function TaskFilters({ filter, setFilter, total }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex gap-2">
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === f
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-700 border border-gray-200"
            }`}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="text-sm text-gray-600">{total} total</div>
    </div>
  );
}
