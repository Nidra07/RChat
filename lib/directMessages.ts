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
  const result = await supabase
    .from("direct_messages")
    .insert({
      conversation_id: conversationId,
      sender_id: senderId,
      message,
    });

  if (!result.error) {
    await supabase
      .from("conversations")
      .update({
        last_message: message,
        last_message_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", conversationId);
  }

  return result;
}

export function subscribeToDirectMessages(
  conversationId: string,
  callback: () => void
) {
  return supabase
    .channel(`dm-${conversationId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "direct_messages",
        filter: `conversation_id=eq.${conversationId}`,
      },
      callback
    )
    .subscribe();
}
