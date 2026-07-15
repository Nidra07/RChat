import { supabase } from "./supabase";

export async function sendMessage(message: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  return await supabase.from("messages").insert({
    message,
    user_id: user.id,
  });
}

export async function getMessages() {
  return await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: true });
}

