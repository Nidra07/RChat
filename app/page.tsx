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
              background: "#1f2937",
              padding: 16,
              borderRadius: 12,
              marginTop: 12,
              cursor: "pointer",
            }}
          >
            <h3>{other?.full_name || "Unknown User"}</h3>

<p style={{ color: "#9CA3AF", marginTop: 4 }}>
  {chat.last_message || "No messages yet"}
</p>

<small style={{ color: "#6B7280" }}>
  {chat.last_message_at
    ? new Date(chat.last_message_at).toLocaleString()
    : ""}
</small>

<p>@{other?.username || "unknown"}</p>

<p
  style={{
    color: "#9CA3AF",
    marginTop: 6,
    fontSize: 14,
  }}
>
  {chat.last_message || "No messages yet"}
</p>

<p
  style={{
    color: "#6B7280",
    fontSize: 12,
    marginTop: 4,
  }}
>
  {chat.last_message_at
    ? new Date(chat.last_message_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : ""}
</p>
          </div>
        );
      })}
    </main>
  );
}

