import ThemeSetter from "@/components/theme/ThemeSetter";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import "@/app/globals.css";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className=" bg-background w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="font-black tracking-tighter text-4xl my-12">404</h1>
      <Link href="/dashboard">
        <Button>Home</Button>
      </Link>
      <ThemeSetter />
    </main>
  );
}
