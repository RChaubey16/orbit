import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

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
        <Footer />
      </body>
    </html>
  );
}
