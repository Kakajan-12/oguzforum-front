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
    <div className="container mx-auto ">
      <div className="py-12 md:py-32 px-5">
        <h2 className="md:text-4xl flex items-center text-xl font-bold text-mainBlue">
          <NavigationBackKnob/>
          {t("cookie")}
        </h2>

        <div className="mt-5 leading-6  md:leading-8 text-sm md:text-xl text-mainBlue">
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
