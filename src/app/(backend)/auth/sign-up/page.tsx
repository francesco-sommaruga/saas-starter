import Logo from "@/components/Logo";
import { getSession } from "@/supabase-server";
import { redirect } from "next/navigation";
import SignUpCard from "./SignUpCard";

const text = { heading: "Sign Up" };

export default async function SignUp() {
  const session = await getSession();
  if (session) redirect("/dashboard");
  return (
    <div className="max-w-md w-full mx-auto flex flex-col items-center justify-center min-h-screen">
      <Logo size="xl" />
      <h1 className="font-bold text-2xl mt-10">{text.heading}</h1>
      <SignUpCard />
    </div>
  );
}
