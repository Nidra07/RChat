import { supabase } from "./supabase";

export async function uploadAvatar(file: File, userId: string) {
  const fileName = `${userId}-${Date.now()}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, {
      upsert: true,
    });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  await supabase
    .from("profiles")
    .update({
      avatar_url: publicUrl,
    })
    .eq("id", userId);

  return publicUrl;
}

