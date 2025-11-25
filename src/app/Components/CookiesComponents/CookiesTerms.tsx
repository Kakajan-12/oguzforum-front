"use client";
import React from "react";
import NavigationBackKnob from "../ForBackKnob/NavigationBackKnob";
import {useTranslations} from "next-intl";
import { useGetCookieQuery } from '@/app/Apis/api';
import useAppLocale from '@/app/Hooks/GetLocale';
import RichText from "@/app/Hooks/Richtext";

const CookiesTerms = () => {
  const t = useTranslations("BackText");
  const { data, error, isLoading } = useGetCookieQuery();
  const locale = useAppLocale();

  const cookieData = data && data.length > 0 ? data[0] : null;

  return (
    <div className="container mx-auto px-4">
      <div className="py-6">
        <h2 className="md:text-4xl text-xl font-bold text-mainBlue flex items-center">
          <NavigationBackKnob/>
          {t("cookie")}
        </h2>

        <div className="mt-5 leading-6 md:leading-8 text-sm md:text-text-base lg:text-lg text-mainBlue">
          {cookieData ? (
              <RichText htmlContent={cookieData[locale]} />
          ) : (
              <p>{isLoading ? "Loading..." : "No data available."}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookiesTerms;
