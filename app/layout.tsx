import React from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";
import CustomCursor from "./Components/CustomCursor";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "VIBEZ",
  description: "UNLOCK YOUR CITY",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className={`${plusJakartaSans.className} min-h-full flex flex-col`}>
        <ReduxProvider>
          <CustomCursor />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
