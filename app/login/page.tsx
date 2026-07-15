"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const { error } = await signIn(email, password);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Login successful 🎉");
    router.push("/");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#111827",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "#1f2937",
          padding: "30px",
          borderRadius: "16px",
          color: "white",
        }}
      >
        <h1>🔐 Login to RChat</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginTop: 20, padding: 14 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginTop: 15, padding: 14 }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            marginTop: 20,
            padding: 14,
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
          }}
        >
          Login
        </button>
      </div>
    </main>
  );
}

