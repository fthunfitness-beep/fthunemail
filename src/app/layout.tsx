import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "FTHUN — Performance Wear Engineered for the Grind",
  description:
    "Premium performance gymwear designed in Pakistan. Join the waitlist for early access to Collection 01.",
  keywords: ["gymwear", "performance wear", "Pakistan", "athletic", "streetwear"],
  openGraph: {
    title: "FTHUN — The Drop Is Coming",
    description: "Premium performance wear. Collection 01 launching soon.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FTHUN — The Drop Is Coming",
    description: "Premium performance wear. Collection 01 launching soon.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
