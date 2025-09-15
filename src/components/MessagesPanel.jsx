// src/components/MessagesPanel.jsx
import { useState } from "react";
import { Send } from "lucide-react";

export default function MessagesPanel({ darkMode }) {
  // Mock inbox
  const [messages, setMessages] = useState([
    { id: 1, sender: "Alice", text: "Hey! How's the project going?", timestamp: "09:00 AM" },
    { id: 2, sender: "Bob", text: "Don't forget the meeting at 2 PM.", timestamp: "10:15 AM" },
    { id: 3, sender: "Charlie", text: "Can you review my PR?", timestamp: "11:30 AM" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages((prev) => [
      { id: prev.length + 1, sender: "You", text: newMessage, timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) },
      ...prev,
    ]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col gap-4 messages-panel">
      {/* Compose */}
      <div className="p-4 rounded-2xl shadow-md border-color border-standard card-bg">
        <textarea
          className="w-full p-2 rounded-md border-color border-standard"
          placeholder="Compose a new message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          rows={3}
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={handleSend}
            className="flex items-center gap-1 px-3 py-1 rounded-full hover:bg-blue-600 text-white send-btn"
          >
            Send <Send size={16} />
          </button>
        </div>
      </div>

      {/* Inbox */}
      <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-sm text-muted-foreground">No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="p-3 rounded-xl shadow-sm bg-gray-50 card-bg border-color border-standard"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold">{msg.sender}</span>
                <span className="text-xs ">{msg.timestamp}</span>
              </div>
              <p className="text-sm">{msg.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
