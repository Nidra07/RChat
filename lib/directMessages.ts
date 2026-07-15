import { supabase } from "./supabase";

export async function getDirectMessages(conversationId: string) {
  return await supabase
    .from("direct_messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });
}

export async function sendDirectMessage(
  conversationId: string,
  senderId: string,
  message: string
) {
  return await supabase.from("direct_messages").insert({
    conversation_id: conversationId,
    sender_id: senderId,
    message,
  });
}

