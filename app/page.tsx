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
          chat.user1?.id === userId ? chat.user2 : chat.user1;

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
            <p>@{other?.username || "unknown"}</p>
          </div>
        );
      })}
    </main>
  );
}

