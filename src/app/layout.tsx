import { RootLayout } from "@/components/root-layout";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bacchus",
  description: "Events and tickets",
};

export default function Layout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootLayout>{props.children}</RootLayout>
      </body>
    </html>
  );
}
