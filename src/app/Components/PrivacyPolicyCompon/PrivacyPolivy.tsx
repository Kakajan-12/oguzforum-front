"use client"
import React from "react";
import NavigationBackKnob from "../ForBackKnob/NavigationBackKnob";
import { useTranslations } from "next-intl";
import { useGetPrivacyQuery } from '@/app/Apis/api';
import useAppLocale from '@/app/Hooks/GetLocale';
import RichText from "@/app/Hooks/Richtext";

const PrivacyPolicy = () => {
  const t = useTranslations('BackText');
  const { data, error, isLoading } = useGetPrivacyQuery();
  const locale = useAppLocale();

  const policyData = data && data.length > 0 ? data[0] : null;

  return (
      <div className="container mx-auto">
        <div className="py-12 md:py-32 px-5">
          <h2 className="md:text-4xl flex items-center text-xl font-bold text-mainBlue">
            <NavigationBackKnob />
            {t('privacy')}
          </h2>

          <div className="mt-5 leading-6 md:leading-8 text-sm md:text-xl text-mainBlue">
            {policyData ? (
                <RichText htmlContent={policyData[locale]} />
            ) : (
                <p>{isLoading ? "Loading..." : "No data available."}</p>
            )}
          </div>
        </div>
      </div>
  );
};

export default PrivacyPolicy;
