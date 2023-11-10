import type { Metadata } from "next";
import "@/app/globals.css";
import constants from "@/constants";

export const metadata: Metadata = {
  title: constants.app.name,
  description: constants.app.metaDescription,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="">{children}</main>
    </>
  );
}
