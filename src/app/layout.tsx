import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "FTHUN - Built for the Days You Refuse to Quit",
  description:
    "Performance gymwear designed in Pakistan for the reps, restarts, and sessions that do not get seen.",
  keywords: ["gymwear", "performance wear", "Pakistan", "athletic", "streetwear"],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "FTHUN - The First Drop Is Being Earned",
    description: "Built for the days you refuse to quit.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FTHUN - The First Drop Is Being Earned",
    description: "Built for the days you refuse to quit.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
