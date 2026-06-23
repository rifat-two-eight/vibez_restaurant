import React from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" className={cn("h-full", "antialiased", plusJakartaSans.variable, "font-sans", geist.variable)}>
      <body className={`${plusJakartaSans.className} min-h-full flex flex-col`}>
        <ReduxProvider>
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Toaster position="top-right" />
        </ReduxProvider>
      </body>
    </html>
  );
}
