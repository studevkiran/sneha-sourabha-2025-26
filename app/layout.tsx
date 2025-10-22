import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ThemeToggle from "../components/ThemeToggle";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Sneha Sourabha 2025-26 | Rotary District 3181 Conference",
  description: "Register for the prestigious Rotary District 3181 Conference - Sneha Sourabha. Join us on 30th & 31st January, 01st February 2026 at Silent Shores Convention Hall, Hebbal, Mysore.",
  keywords: "Rotary, District 3181, Conference, Sneha Sourabha, Mysore, Registration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`theme-luxury ${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}