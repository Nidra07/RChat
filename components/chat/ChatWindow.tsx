"use client";

import { useEffect, useState } from "react";
import {
  sendMessage,
  getMessages,
  subscribeToMessages,
} from "@/lib/chat";

export default function ChatWindow() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  async function loadMessages() {
    const { data } = await getMessages();
    if (data) setMessages(data);
  }

  useEffect(() => {
  loadMessages();

  const channel = subscribeToMessages(() => {
    loadMessages();
  });

  return () => {
    channel.unsubscribe();
  };
}, []);

  async function handleSend() {
    if (!text.trim()) return;

    const { error } = await sendMessage(text);

    if (error) {
      alert(error.message);
      return;
    }

    setText("");
    loadMessages();
  }

  return (
    <main
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "#111827",
        color: "white",
      }}
    >
      <div
        style={{
          padding: "20px",
          borderBottom: "1px solid #374151",
          fontWeight: "bold",
        }}
      >
        💬 General Chat
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              background: "#1f2937",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          >
            {msg.message}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          padding: "20px",
          borderTop: "1px solid #374151",
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: "10px",
            border: "none",
          }}
        />

        <button
          onClick={handleSend}
          style={{
            padding: "14px 22px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
          }}
        >
          Send
        </button>
      </div>
    </main>
  );
}

import {
  sendMessage,
  getMessages,
  subscribeToMessages,
} from "@/lib/chat";

