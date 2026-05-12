import type { Metadata } from "next";
import { Geist, Manrope } from "next/font/google";

import "@/app/globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lohithnath",
  description: "Premium engineering workspace portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${manrope.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}