import { supabase } from "./supabase";

export async function searchUsers(query: string) {
  return await supabase
    .from("profiles")
    .select("*")
    .ilike("username", `%${query}%`)
    .limit(20);
}

