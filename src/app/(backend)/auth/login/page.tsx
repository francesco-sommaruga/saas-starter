import Logo from "@/components/Logo";
import LoginCard from "./LoginCard";
import { getSession } from "@/supabase-server";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getSession();
  if (session) redirect("/dashboard");
  return (
    <div className="max-w-md w-full mx-auto flex flex-col items-center justify-center min-h-screen">
      <Logo size="xl" />
      <h1 className="font-bold text-2xl mt-10">Sign in to your account</h1>
      <LoginCard />
    </div>
  );
}
