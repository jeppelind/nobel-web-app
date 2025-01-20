import type { Metadata } from "next";
import { STIX_Two_Text } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Header from "./components/header";

const stixTwoText = STIX_Two_Text({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nobel Prize Laureates",
  description: "Web app for Nobel Prize Laureates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${stixTwoText.className} antialiased bg-slate-100 text-slate-700`} >
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
