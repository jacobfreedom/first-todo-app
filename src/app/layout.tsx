import "../styles/globals.css";
import type { Metadata } from "next";
import Head from "next/head";
import { Providers } from "@/providers/providers";

export const metadata: Metadata = {
  title: "Todo App by Jakub",
  description: "First App Ever",
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
