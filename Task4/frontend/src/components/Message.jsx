export default function Message({ msg, username }) {
  const mine = msg.username === username;

  return (
    <div className={`flex mb-2 ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-2 rounded max-w-xs ${
          mine ? "bg-teal-600 text-white" : "bg-gray-300 text-gray-900"
        }`}
      >
        <strong>{msg.username}</strong>
        <div>{msg.text}</div>
        <div className="text-xs opacity-60">
          {new Date(msg.createdAt).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
