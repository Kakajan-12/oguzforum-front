"use client";
import PageHero from "@/components/ui/PageHero";
import RichText from "@/components/ui/RichText";
import Spinner from "@/components/ui/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useGetTermsQuery } from "@/lib/api";

export default function TermsOfUsePage() {
  const { data, error, isLoading } = useGetTermsQuery();
  const terms = data && data.length > 0 ? data[0] : null;

  return (
    <>
      <PageHero
        title="Terms of Use"
        subtitle="The rules and conditions for accessing and using our website."
        image="/header-bg.jpg"
      />

      <section className="bg-white">
        <div className="px-4 lg:px-10 py-6 md:py-14 lg:py-20">
          <div className="mx-auto max-w-4xl">
            {isLoading ? (
              <Spinner />
            ) : error ? (
              <ErrorMessage />
            ) : terms ? (
              <RichText
                htmlContent={terms.en}
                className="space-y-4 text-base leading-relaxed text-gray-600 sm:text-base"
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
