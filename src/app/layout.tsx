import React from "react";
import type { Metadata } from "next";

import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/Footer";
import ReduxProvider from "@/components/providers/ReduxProvider";
import ChatWidget from "@/components/chat/ChatWidget";
import NavigationLoader from "@/components/ui/NavigationLoader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oguz Forum | Expo",
  description: "Oguz Forum | Expo",
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <body>
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
