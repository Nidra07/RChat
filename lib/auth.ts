export async function signUp(
  email: string,
  password: string,
  fullName: string,
  username: string
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return { data, error };

  if (data.user) {
    await supabase.from("profiles").insert({
      id: data.user.id,
      full_name: fullName,
      username,
    });
  }

  return { data, error };
}

export async function signIn(email: string, password: string) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signOut() {
  return await supabase.auth.signOut();
}

