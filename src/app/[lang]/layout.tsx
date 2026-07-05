import React from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";

import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/Footer";
import ReduxProvider from "@/components/providers/ReduxProvider";
import ChatWidget from "@/components/chat/ChatWidget";
import NavigationLoader from "@/components/ui/NavigationLoader";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import "./globals.css";
import { routing } from "@/i18n/routing";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};
export async function generateMetadata({
  params,
}: Pick<LayoutProps, "params">): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "Meta" });

  return {
    title: t("title"),
    description: t("description"),
    icons: {
      icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
      shortcut: "/logo.svg",
      apple: "/logo.svg",
    },
  };
}
export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { lang } = await params;

  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={lang} className={`h-full antialiased`}>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <body>
        <ReduxProvider>
          <NextIntlClientProvider messages={messages}>
            <Header />
            <NavigationLoader />
            {children}
            <Footer />
            <div className="fixed bottom-5 right-5 z-50">
              <ChatWidget />
            </div>
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
