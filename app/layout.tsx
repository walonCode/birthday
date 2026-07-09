import type { Metadata, Viewport } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import { config } from "@/content/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const description = "A little surprise made with love — tap to open it. 🎁";

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: `${config.headline} 🎂`,
  description,
  openGraph: {
    title: `${config.headline} 🎂`,
    description,
    url: "/",
    siteName: config.headline,
    type: "website",
    // opengraph-image.png in this folder is attached automatically
  },
  twitter: {
    card: "summary_large_image",
    title: `${config.headline} 🎂`,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1d1023",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
      // Browser extensions (e.g. Dark Reader) inject attributes into <html>
      // before React hydrates — suppress that false-positive mismatch.
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
