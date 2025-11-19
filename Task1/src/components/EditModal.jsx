export default function EditModal({
  editingId,
  editingText,
  setEditingText,
  saveEdit,
  cancelEdit,
}) {
  if (!editingId) return null;

  return (
    <div className="fixed inset-0 flex items-end sm:items-center justify-center p-4 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={cancelEdit} />

      <form
        onSubmit={saveEdit}
        className="relative bg-white rounded-lg p-4 w-full max-w-xl shadow-lg"
      >
        <h3 className="text-lg font-medium mb-2">Edit task</h3>

        <input
          value={editingText}
          onChange={(e) => setEditingText(e.target.value)}
          className="w-full p-3 border rounded mb-3"
          autoFocus
        />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={cancelEdit} className="px-4 py-2 rounded border">
            Cancel
          </button>

          <button type="submit" className="px-4 py-2 rounded bg-teal-600 text-white">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
