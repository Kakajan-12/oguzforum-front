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
      <div className="container mx-auto px-4">
        <div className="py-6">
          <h2 className="md:text-4xl text-xl font-bold text-mainBlue flex items-center">
            <NavigationBackKnob />
            {t('privacy')}
          </h2>

          <div className="mt-5 leading-6 md:leading-8 text-sm md:text-text-base lg:text-lg text-mainBlue">
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
