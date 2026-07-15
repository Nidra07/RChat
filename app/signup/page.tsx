"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    const { error } = await signUp(email, password);

    if (error) {
      alert(error.message);
    } else {
      alert("🎉 Account created! Check your email to verify your account.");
    }
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
        <h1>🚀 Create RChat Account</h1>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", marginTop: 15, padding: 14 }}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginTop: 15, padding: 14 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginTop: 15, padding: 14 }}
        />

        <button
          onClick={handleSignup}
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
          Create Account
        </button>
      </div>
    </main>
  );
}

