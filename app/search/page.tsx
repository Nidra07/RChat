"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { searchUsers } from "@/lib/users";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<any[]>([]);
 const router = useRouter();
  async function handleSearch() {
    const { data } = await searchUsers(query);
    if (data) setUsers(data);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#111827",
        color: "white",
        padding: "20px",
      }}
    >
      <h1>🔍 Search Users</h1>

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter username..."
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: "10px",
          }}
        />

        <button
          onClick={handleSearch}
          style={{
            padding: "14px 20px",
            borderRadius: "10px",
            border: "none",
            background: "#2563eb",
            color: "white",
          }}
        >
          Search
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {users.map((user) => (
  <div
    key={user.id}
    onClick={() => router.push(`/chat/${user.id}`)}
    style={{
      padding: "15px",
      background: "#1f2937",
      borderRadius: "10px",
      marginBottom: "10px",
      cursor: "pointer",
    }}
  >
    👤 {user.username}
  </div>
))}
      </div>
    </main>
  );
}

