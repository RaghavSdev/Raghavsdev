import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500", "700"], display: "swap" });

export const metadata: Metadata = {
  title: "Raghav S (@RaghavSdev) | AI & ML Engineer",
  description: "AI & ML Engineer · Predictive Modeling · Generative AI · React · Spring Boot · AWS. Building intelligent models and deploying them at scale.",
  openGraph: {
    title: "Raghav S | AI & ML Engineer & Developer",
    description: "Building intelligent models and deploying them at scale.",
    url: "https://github.com/RaghavSdev",
    images: ["https://avatars.githubusercontent.com/u/169747419?v=4"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans bg-[#111111] text-zinc-100 overflow-x-hidden antialiased grain">
        {children}
      </body>
    </html>
  );
}
