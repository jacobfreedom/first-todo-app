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
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
