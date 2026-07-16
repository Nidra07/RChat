import { supabase } from "./supabase";

export async function getConversations(userId: string) {
  return await supabase
    .from("conversations")
    .select(`
      *,
      user1:profiles!conversations_user1_id_fkey(
        id,
        full_name,
        username
      ),
      user2:profiles!conversations_user2_id_fkey(
        id,
        full_name,
        username
      )
    `)
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
    .order("updated_at", { ascending: false });
}

export async function getOrCreateConversation(
  user1: string,
  user2: string
) {
  const { data } = await supabase
    .from("conversations")
    .select("*")
    .or(
      `and(user1_id.eq.${user1},user2_id.eq.${user2}),and(user1_id.eq.${user2},user2_id.eq.${user1})`
    )
    .single();

  if (data) return data.id;

  const { data: created } = await supabase
    .from("conversations")
    .insert({
      user1_id: user1,
      user2_id: user2,
    })
    .select()
    .single();

  return created.id;
}

