"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getConversations } from "@/lib/conversations";
import { useRouter } from "next/navigation";

export default function Home() {
  const [chats, setChats] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function loadChats() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

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

      {chats.map((chat) => (
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
          Conversation
          <br />
          {chat.id}
        </div>
      ))}
    </main>
  );
}

