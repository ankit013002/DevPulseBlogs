import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Link from "next/link";
import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevPulse",
  description: "Where developers share insights, innovations, and the pulse of modern software development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header>
            <Navbar />
          </header>

          <div className="min-h-[100vh]">{children}</div>
          <footer className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-white">
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="flex flex-col gap-2">
                <Link href="/" className="text-2xl font-bold text-white">
                  Dev<span className="text-white/80">Pulse</span>
                </Link>
                <p className="text-sm text-white/70 max-w-xs">
                  Where developers share insights, innovations, and the pulse of
                  modern software.
                </p>
              </div>

              <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
                <Link href="/articles" className="hover:text-white transition-colors">Articles</Link>
                <Link href="/addArticle" className="hover:text-white transition-colors">Write</Link>
                <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
                <Link href="/register" className="hover:text-white transition-colors">Register</Link>
              </nav>

              <p className="text-sm text-white/60 shrink-0">
                &copy; {new Date().getFullYear()} DevPulse
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
