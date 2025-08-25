import type { Metadata } from "next";
import "../globals.css";
// ...existing code...
import { ThemeProvider } from "@/components/theme-provider";

// ...existing code...

export const metadata: Metadata = {
  title: "Profile | Modern Gaming Hub",
  description: "User profile page.",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
