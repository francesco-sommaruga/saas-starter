import type { Metadata } from "next";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import constants from "@/constants";
import { getSession, getSubscription } from "@/supabase-server";
import { redirect } from "next/navigation";

export const metadata = {
  title: constants.app.name,
  description: constants.app.metaDescription,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const subscription = await getSubscription();

  if (!subscription) {
    redirect("/dashboard/account");
  }

  return (
    <>
      <Sidebar userEmail={session.user.email} />
      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </>
  );
}
