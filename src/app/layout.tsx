import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sans = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-sans", weight: "100 900" });

export const metadata: Metadata = {
  title: "Lumen Dental Studio | Gentle family dentistry",
  description:
    "Check-ups, whitening, aligners and emergency care in a calm, modern clinic. Book your appointment online in under a minute.",
  openGraph: {
    title: "Lumen Dental Studio",
    description: "Gentle family dentistry. Book online in under a minute.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} font-sans`}>{children}</body>
    </html>
  );
}
