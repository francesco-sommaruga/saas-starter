"use client";
import useSupabase from "@/hooks/useSupabase";
import { Button } from "../ui/button";

const Login = () => {
  const supabase = useSupabase();

  const handleSignup = async () => {
    await supabase.auth.signUp({
      email: "jon@supabase.com",
      password: "supersecure",
      options: {
        emailRedirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };

  const handleLogin = async () => {
    await supabase.auth.signInWithPassword({
      email: "jon@supabase.com",
      password: "supersecure",
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="flex space-x-2 mb-2">
      <Button className="w-max" onClick={handleLogin}>
        Login
      </Button>
      <Button className="w-max" onClick={handleSignup}>
        Register
      </Button>
      <Button className="w-max" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Login;
