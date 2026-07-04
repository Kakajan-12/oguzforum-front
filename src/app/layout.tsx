import React from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/Footer";
import ReduxProvider from "@/components/providers/ReduxProvider";
import ChatWidget from "@/components/chat/ChatWidget";
import NavigationLoader from "@/components/ui/NavigationLoader";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oguz Forum | Expo",
  description: "Oguz Forum | Expo",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
  },
};
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <ReduxProvider>
          <Header />
          <NavigationLoader />
          {children}
          <Footer />
          <div className="fixed bottom-5 right-5 z-50">
            <ChatWidget />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
