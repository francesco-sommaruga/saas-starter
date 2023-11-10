"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export const handleSignup = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const origin = headers().get("origin");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) console.log(error);

  return { data, error };
};

export const handleGoogleSignup = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const origin = headers().get("origin");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) console.log(error);

  return { data, error };
};

export const handleLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const origin = headers().get("origin");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log(origin);
  return { data, error };
};

export const handleGoogleLogin = async () => {
  const origin = headers().get("origin");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) console.log(error);

  return { data, error };
};

export const handleLogout = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase.auth.signOut();

  if (error) console.log(error);

  if (!error) redirect("/auth/login");
  return { error };
};

export const saveNote = async (note: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error, status, statusText } = await supabase
    .from("notes")
    .insert({ title: note });

  if (error) console.log(error);
  if (status) console.log(status);
  if (statusText) console.log(statusText);
};
