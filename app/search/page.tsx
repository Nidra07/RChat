"use client";

import { useEffect, useState } from "react";
import { searchUsers } from "@/lib/users";
import { getOrCreateConversation } from "@/lib/conversations";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [myId, setMyId] = useState("");
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setMyId(data.user.id);
    });
  }, []);

  useEffect(() => {
    async function load() {
      if (!query.trim()) {
        setUsers([]);
        return;
      }

      const { data } = await searchUsers(query);

      if (data) {
        setUsers(data.filter((u) => u.id !== myId));
      }
    }

    load();
  }, [query, myId]);

  async function openChat(user: any) {
    const id = await getOrCreateConversation(myId, user.id);
    router.push(`/chat/${id}`);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#111827",
        color: "white",
        padding: 20,
      }}
    >
      <h1>🔍 Search Users</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search username..."
        style={{
          width: "100%",
          padding: 14,
          borderRadius: 10,
          marginTop: 20,
        }}
      />

      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => openChat(user)}
          style={{
            background: "#1f2937",
            padding: 16,
            borderRadius: 12,
            marginTop: 12,
            cursor: "pointer",
          }}
        >
          <h3>{user.full_name}</h3>
          <p>@{user.username}</p>
        </div>
      ))}
    </main>
  );
}

