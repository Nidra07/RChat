"use client";

import { useState } from "react";
import { uploadAvatar } from "@/lib/storage";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [uploading, setUploading] = useState(false);

  async function handleFile(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setUploading(true);

    try {
      await uploadAvatar(file, user.id);
      alert("Avatar uploaded!");
    } finally {
      setUploading(false);
    }
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
      <h1>👤 Profile</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
      />

      {uploading && <p>Uploading...</p>}
    </main>
  );
}

