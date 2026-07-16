import { supabase } from "./supabase";

export async function searchUsers(search: string) {
  return await supabase
    .from("profiles")
    .select("*")
    .ilike("username", `%${search}%`)
    .limit(20);
}

