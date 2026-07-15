import { sendDirectMessage } from "@/lib/directMessages";
import { supabase } from "@/lib/supabase";

"use client";

import { useState } from "react";

export default function DirectChat({
  params,
}: {
  params: { id: string };
}) {
  const [message, setMessage] = useState("");

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
          padding: "20px",
        }}
      >
        Conversation ID: {params.id}
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
  onClick={async () => {
    if (!message.trim()) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      return;
    }

    const { error } = await sendDirectMessage(
      params.id,
      user.id,
      message
    );

    if (error) {
      alert(error.message);
      return;
    }

    setMessage("");
  }}
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
