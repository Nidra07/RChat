"use client";

import { useEffect, useState } from "react";
import {
  getDirectMessages,
  sendDirectMessage,
  subscribeToDirectMessages,
} from "@/lib/directMessages";
import { supabase } from "@/lib/supabase";

export default function DirectChat({
  params,
}: {
  params: { id: string };
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  async function loadMessages() {
    const { data } = await getDirectMessages(params.id);
    if (data) setMessages(data);
  }

  useEffect(() => {
    loadMessages();

    const channel = subscribeToDirectMessages(params.id, () => {
      loadMessages();
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  async function handleSend() {
alert("Send button clicked");

    if (!message.trim()) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

   if (!user) {
  alert("User not logged in");
  return;
}

alert(`Logged in as ${user.id}`);

    const { error } = await sendDirectMessage(
      params.id,
      user.id,
      message
    );

   if (error) {
  alert(error.message);
} else {
  alert("Message saved!");
}
  }

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
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
        💬 Private Chat
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: "10px",
          }}
        />

        <button
          onClick={handleSend}
          style={{
            padding: "14px 24px",
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
