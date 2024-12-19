import React, { useState } from "react";
import "./ChatBox.css";

export default function ChatBox({ provider, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { sender: "host", text: input }]);
      setInput("");
    }
  };

  return (
    <div className="chatbox">
      <div className="chatbox-header">
        <h4> {provider.name}</h4>
        <button onClick={onClose}>&times;</button>
      </div>
      <div className="chatbox-body">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbox-footer">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
