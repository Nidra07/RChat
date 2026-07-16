import { supabase } from "./supabase";

export async function getConversations(userId: string) {
  return await supabase
    .from("conversations")
    .select(`
      *,
     user1_profile:profiles!conversations_user1_fkey(
  id,
  full_name,
  username,
  avatar_url
),
user2_profile:profiles!conversations_user2_fkey(
  id,
  full_name,
  username,
  avatar_url
     )
     )
    `)
    .or(`user1.eq.${userId},user2.eq.${userId}`)
    .order("created_at", { ascending: false });
}

export async function getOrCreateConversation(
  user1: string,
  user2: string
) {
  const { data } = await supabase
    .from("conversations")
    .select("*")
    .or(
      `and(user1.eq.${user1},user2.eq.${user2}),and(user1.eq.${user2},user2.eq.${user1})`
    )
    .single();

  if (data) return data.id;

  const { data: created } = await supabase
    .from("conversations")
    .insert({
      user1,
      user2,
    })
    .select()
    .single();

  return created.id;
}

