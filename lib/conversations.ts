import { supabase } from "./supabase";

export async function createConversation(user1: string, user2: string) {
  return await supabase.from("conversations").insert({
    user1,
    user2,
  });
}

export async function getConversations(userId: string) {
  return await supabase
    .from("conversations")
    .select("*")
    .or(`user1.eq.${userId},user2.eq.${userId}`);
}

