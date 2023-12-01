import "../styles/globals.css";
import type { Metadata } from "next";
import { Providers } from "@/providers/providers";
import { Viewport } from 'next'

export const metadata: Metadata = {
  title: "Todo App by Jakub",
  description: "First App Ever",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

