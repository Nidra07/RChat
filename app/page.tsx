"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getConversations } from "@/lib/conversations";
import { useRouter } from "next/navigation";

export default function Home() {
  const [chats, setChats] = useState<any[]>([]);
  const [userId, setUserId] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function loadChats() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setUserId(user.id);

      const { data } = await getConversations(user.id);

      if (data) setChats(data);
    }

    loadChats();
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#111827",
        color: "white",
        padding: 20,
      }}
    >
      <h1>💬 RChat</h1>

      {chats.map((chat) => {
        const other =
          chat.user1_profile?.id === userId ? chat.user2_profile : chat.user1_profile;

        return (
         <div
  key={chat.id}
  onClick={() => router.push(`/chat/${chat.id}`)}
  style={{
    display: "flex",
    alignItems: "center",
    gap: 16,
    background: "#1f2937",
    padding: 16,
    borderRadius: 14,
    marginTop: 12,
    cursor: "pointer",
  }}
>
  <img
    src={
      other?.avatar_url ||
      "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(other?.full_name || "User")
    }
    style={{
      width: 56,
      height: 56,
      borderRadius: "50%",
      objectFit: "cover",
    }}
  />

  <div style={{ flex: 1 }}>
    <h3 style={{ margin: 0 }}>
      {other?.full_name || "Unknown User"}
    </h3>

    <p
      style={{
        margin: "4px 0",
        color: "#9CA3AF",
      }}
    >
      {chat.last_message || "No messages yet"}
    </p>
  </div>

  <div
    style={{
      color: "#6B7280",
      fontSize: 12,
    }}
  >
    {chat.last_message_at
      ? new Date(chat.last_message_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : ""}
  </div>
</div>>
        );
      })}
    </main>
  );
}

