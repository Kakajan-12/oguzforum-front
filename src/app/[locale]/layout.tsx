import React from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ForBackKnob from "../Components/ForBackKnob/ForBackKnob";
import { NextIntlClientProvider } from "next-intl";
import ReduxProvider from "../ProviderRedux";

const mont = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oguz Forum",
  description: "Oguz Forum",
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
      <body className={`${mont.className} antialiased`}>
      <ReduxProvider>
        <NextIntlClientProvider locale={params.locale}>
          <Header />
          <ForBackKnob />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </ReduxProvider>
      </body>
      </html>
  );
}
