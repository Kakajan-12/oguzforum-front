import React from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer";
import ForBackKnob from "./Components/ForBackKnob/ForBackKnob";
import ReduxProvider from "./ProviderRedux";
import ChatWidget from "@/app/chat/ChatWidget";
import NavigationLoader from "@/app/Components/UI/NavigationLoader";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oguz Forum & Expo",
  description: "Oguz Forum & Expo",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/ico.svg", type: "image/svg+xml" }],
  },
};

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
          <ForBackKnob />
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
