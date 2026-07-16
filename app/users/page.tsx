"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getOrCreateConversation } from "@/lib/conversations";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function loadUsers() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("id, username, full_name")
        .neq("id", user.id);

      if (data) setUsers(data);
    }

    loadUsers();
  }, []);

  async function openChat(otherUserId: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const conversationId = await getOrCreateConversation(
      user.id,
      otherUserId
    );

    router.push(`/chat/${conversationId}`);
  }

  return (
    <main
      style={{
        padding: 20,
        minHeight: "100vh",
        background: "#111827",
        color: "white",
      }}
    >
      <h1>👥 Users</h1>

      {users.map((u) => (
        <div
          key={u.id}
          onClick={() => openChat(u.id)}
          style={{
            background: "#1f2937",
            padding: 16,
            borderRadius: 10,
            marginTop: 12,
            cursor: "pointer",
          }}
        >
          <strong>{u.full_name}</strong>
          <br />
          @{u.username}
        </div>
      ))}
    </main>
  );
}

