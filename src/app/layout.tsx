import React from "react";
import type { Metadata } from "next";
import Script from "next/script";

import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/Footer";
import ReduxProvider from "@/components/providers/ReduxProvider";
import ChatWidget from "@/components/chat/ChatWidget";
import NavigationLoader from "@/components/ui/NavigationLoader";
import "./globals.css";

const GA_ID = "G-BDHQKFLC1N";
const GOOGLE_ADS_ID = "AW-18497843377";
const LINKEDIN_PARTNER_ID = "11016025";
const META_PIXEL_ID = "1606492917408642";

export const metadata: Metadata = {
  title: "Oguz Forum | Expo",
  description: "Oguz Forum | Expo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
        {/* LinkedIn Insight Tag */}
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "${LINKEDIN_PARTNER_ID}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])}; window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://px.ads.linkedin.com/collect/?pid=${LINKEDIN_PARTNER_ID}&fmt=gif`}
          />
        </noscript>
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
