import type React from "react"
import { Suspense } from "react"
import PagePreloader from "@/components/ui/page-preloader"
import type { Metadata } from "next"
import "./globals.css"
import { Inter, Anton } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider" // Import ThemeProvider
// Navbar is now handled in with-navbar/layout.tsx

// Define font instances
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Modern Gaming Hub",
  description: "Redefine Gaming. Enter the Metagame. Unleash the Play Economy.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${anton.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <PagePreloader>{children}</PagePreloader>
        </ThemeProvider>
      </body>
    </html>
  )
}
