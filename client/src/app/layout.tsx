import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./customClasses.css";

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UNO",
  description: "Play UNO online for free, with up to 4 players!",
  // icons: [
  //   { rel: "icon", url: "/meta/favicon-96x96.png" },
  //   { rel: "icon", url: "/meta/favicon.svg" },
  //   { rel: "shortcut icon", url: "/meta/favicon.ico" },
  //   { rel: "apple-touch-icon", url: "/meta/apple-touch-icon.png" },
  // ],
  // manifest: "/meta/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "UNO",
    statusBarStyle: "black",
  },
  keywords: "uno, crazy 8, crazy eight, 4 player uno",
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
