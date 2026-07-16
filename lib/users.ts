import { supabase } from "./supabase";

export async function searchUsers(query: string) {
  return await supabase
    .from("profiles")
    .select("*")
    .ilike("username", `%${search}%`)
    .limit(20);
}

