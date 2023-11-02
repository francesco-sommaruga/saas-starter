import { SupabaseContext } from "@/providers/SupabaseProvider";
import { useContext } from "react";

const useSupabase = () => {
  const supabase = useContext(SupabaseContext);
  return supabase;
};

export default useSupabase;
