import { supabase } from "./supabase";

export async function getOrCreateConversation(
  currentUserId: string,
  otherUserId: string
) {
  const { data: existing } = await supabase
    .from("conversations")
    .select("*")
    .or(
      `and(user1.eq.${currentUserId},user2.eq.${otherUserId}),and(user1.eq.${otherUserId},user2.eq.${currentUserId})`
    )
    .maybeSingle();

  if (existing) {
    return existing.id;
  }

  const { data, error } = await supabase
    .from("conversations")
    .insert({
      user1: currentUserId,
      user2: otherUserId,
    })
    .select()
    .single();

  if (error) throw error;

  return data.id;
}

