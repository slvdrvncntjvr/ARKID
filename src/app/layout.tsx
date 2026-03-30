import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arkph.tech"),
  title: "ARK | Student Game Dev Community",
  description:
    "ARK is a student game development community. We collaborate, create games, and grow together. Come build with us.",
  icons: {
    icon: "/branding/site-icon.jpg",
    shortcut: "/branding/site-icon.jpg",
    apple: "/branding/site-icon.jpg",
  },
  openGraph: {
    title: "ARK | Student Game Dev Community",
    description:
      "ARK is a student game development community. We collaborate, create games, and grow together. Come build with us.",
    images: [
      {
        url: "/branding/site-icon.jpg",
        width: 1200,
        height: 1200,
        alt: "ARK website icon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARK | Student Game Dev Community",
    description:
      "ARK is a student game development community. We collaborate, create games, and grow together. Come build with us.",
    images: ["/branding/site-icon.jpg"],
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
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
