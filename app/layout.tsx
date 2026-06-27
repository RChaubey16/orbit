import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Orbit",
    template: "%s · Orbit",
  },
  description: "An open-source component library focused on interaction and physical feel. Copy-paste or install via shadcn.",
  keywords: ["component library", "react", "nextjs", "ui components", "shadcn", "orbit"],
  openGraph: {
    title: "Orbit",
    description: "An open-source component library focused on interaction and physical feel.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbit",
    description: "An open-source component library focused on interaction and physical feel.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased light`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <footer className="mt-auto border-t border-zinc-100 py-6 text-center text-xs text-zinc-400">
          Built with care by{" "}
          <a
            href="https://github.com/RChaubey16"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            Ruturaj
          </a>
          . Open source on{" "}
          <a
            href="https://github.com/RChaubey16/orbit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            GitHub
          </a>
          .
        </footer>
      </body>
    </html>
  );
}
