import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./customClasses.css";

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlayLounge",
  description:
    "Play free party games with your friends online, no sign-up required!",
  icons: [
    { rel: "icon", url: "/meta/favicon-96x96.png" },
    { rel: "icon", url: "/meta/favicon.svg" },
    { rel: "shortcut icon", url: "/meta/favicon.ico" },
    { rel: "apple-touch-icon", url: "/meta/apple-touch-icon.png" },
  ],
  manifest: "/meta/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "PlayLounge",
    statusBarStyle: "black",
  },
  keywords: "uno, 4 player games, party games, free games, multiplayer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
