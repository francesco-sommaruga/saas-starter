"use client";
import { createContext, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
export const SupabaseContext = createContext(
  createBrowserClient<{}>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
);

const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [supabaseClient] = useState(() =>
    createBrowserClient<{}>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );
  return (
    <SupabaseContext.Provider value={supabaseClient}>
      {children}
    </SupabaseContext.Provider>
  );
};

export default SupabaseProvider;
