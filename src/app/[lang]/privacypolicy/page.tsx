"use client";
import PageHero from "@/components/ui/PageHero";
import RichText from "@/components/ui/RichText";
import Spinner from "@/components/ui/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useGetPrivacyQuery } from "@/lib/api";

export default function PrivacyPolicyPage() {
  const { data, error, isLoading } = useGetPrivacyQuery();
  const policy = data && data.length > 0 ? data[0] : null;

  return (
    <>
      <PageHero
        title="Privacy Policy"
        subtitle="Protecting your data with transparency, security, and care."
        image="/header-bg.jpg"
      />

      <section className="bg-white">
        <div className="px-4 lg:px-10 py-6 md:py-14 lg:py-20">
          <div className="mx-auto max-w-4xl">
            {isLoading ? (
              <Spinner />
            ) : error ? (
              <ErrorMessage />
            ) : policy ? (
              <RichText
                htmlContent={policy.en}
                className="text-base leading-relaxed text-gray-600 sm:text-base"
              />
            ) : (
              <p className="text-gray-500">No data available.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
