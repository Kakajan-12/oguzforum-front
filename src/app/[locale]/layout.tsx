import React from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import ForBackKnob from "../Components/ForBackKnob/ForBackKnob";
import { NextIntlClientProvider } from "next-intl";
import ReduxProvider from "../ProviderRedux";
import ChatWidget from "@/app/chat/ChatWidget";
import SnowEffect from "@/app/Components/Snowfall/Snowfall";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oguz Forum & Expo",
  description: "Oguz Forum & Expo",
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/ico.svg", type: "image/svg+xml" },
        ],
    }
};

export default function RootLayout({
                                     children,
                                     params,
                                   }: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
      <html lang={params.locale}>
      <body className={`${montserrat.className}`}>
      <ReduxProvider>
          <NextIntlClientProvider locale={params.locale}>
              <SnowEffect/>
              <Header/>
              <ForBackKnob/>
              {children}
              <Footer/>
              <div className="fixed bottom-5 right-5 z-50">
                  <ChatWidget/>
              </div>
          </NextIntlClientProvider>
      </ReduxProvider>
      </body>
      </html>
  );
}
