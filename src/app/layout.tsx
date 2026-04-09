import React from "react";
import type { Metadata, Viewport } from "next";
import { DM_Sans, Cinzel } from "next/font/google";
import { FirefliesBackground } from "@/components/fireflies-background";
import { InitialLoadOverlay } from "@/components/initial-load-overlay";

import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arkph.tech"),
  title: "ARK - Student Game Dev Community",
  description:
    "ARK is a student game development community. We collaborate, create games, and grow together. Come build with us.",
  icons: {
    icon: [
      { url: "/ark-logo.png", type: "image/png", sizes: "32x32" },
      { url: "/ark-logo.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: [{ url: "/ark-logo.png", type: "image/png" }],
    apple: [{ url: "/ark-logo.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "ARK | Student Game Dev Community",
    description:
      "ARK is a student game development community. We collaborate, create games, and grow together. Come build with us.",
    images: [
      {
        url: "/ark.png",
        width: 1200,
        height: 630,
        alt: "ARK community banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARK | Student Game Dev Community",
    description:
      "ARK is a student game development community. We collaborate, create games, and grow together. Come build with us.",
    images: ["/ark.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0d1a1a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${cinzel.variable} font-sans antialiased`}
      >
        <FirefliesBackground count={35} />
        <InitialLoadOverlay />
        {children}
      </body>
    </html>
  );
}
