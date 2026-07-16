"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    async function loadUsers() {
      const { data } = await supabase
        .from("profiles")
        .select("id, username, full_name");

      if (data) setUsers(data);
    }

    loadUsers();
  }, []);

  return (
    <main
      style={{
        padding: 20,
        color: "white",
        background: "#111827",
        minHeight: "100vh",
      }}
    >
      <h1>👥 Users</h1>

      {users.map((user) => (
        <div
          key={user.id}
          style={{
            background: "#1f2937",
            padding: 15,
            marginTop: 10,
            borderRadius: 10,
          }}
        >
          <div>{user.full_name}</div>
          <div>@{user.username}</div>

          <Link href={`/chat/${user.id}`}>
            Open Chat
          </Link>
        </div>
      ))}
    </main>
  );
}

