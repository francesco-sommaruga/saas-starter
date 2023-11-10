import type { Metadata } from "next";
import "@/app/globals.css";
import constants from "@/constants";
import { getSession } from "@/supabase-server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: constants.app.name,
  description: constants.app.metaDescription,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <>
      <main className="">{children}</main>
    </>
  );
}
