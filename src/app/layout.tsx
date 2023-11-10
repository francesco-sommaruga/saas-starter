import { getTheme } from "@/components/theme/actions";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await getTheme();
  return (
    <html lang="en" className="h-full w-full">
      <body
        className={`${inter.className} w-full h-full ${
          theme === "dark" ? "dark" : ""
        }`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
