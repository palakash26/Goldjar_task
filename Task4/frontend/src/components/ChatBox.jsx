import { useEffect, useState } from "react";
import { socket } from "../socket.js";
import Message from "./Message";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("User" + Math.floor(Math.random() * 1000));
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));

    socket.on("new_message", (msg) =>
      setMessages((prev) => [...prev, msg])
    );

    return () => socket.off("new_message");
  }, []);

  function sendMessage(e) {
    e.preventDefault();
    if (!text.trim()) return;

    socket.emit("send_message", { username, text });
    setText("");
  }

  return (
    <div className="w-full max-w-lg bg-white rounded shadow p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">💬 Realtime Chat</h2>

      {/* messages */}
      <div className="h-80 overflow-y-auto border p-3 rounded mb-3 bg-gray-50">
        {messages.map((msg) => (
          <Message key={msg._id} msg={msg} username={username} />
        ))}
      </div>

      {/* form */}
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          placeholder="Type message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="px-4 py-2 bg-teal-600 text-white rounded">
          Send
        </button>
      </form>
    </div>
  );
}
