"use client";
import PageHero from "@/components/ui/PageHero";
import RichText from "@/components/ui/RichText";
import Spinner from "@/components/ui/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useGetCookieQuery } from "@/lib/api";

export default function CookieTermsPage() {
  const { data, error, isLoading } = useGetCookieQuery();
  const cookie = data && data.length > 0 ? data[0] : null;

  return (
    <>
      <PageHero
        title="Cookie Policy"
        subtitle="Optimizing your experience through responsible cookie usage."
        image="/header-bg.jpg"
      />

      <section className="bg-white">
        <div className="px-4 lg:px-10 py-6 md:py-14 lg:py-20">
          <div className="mx-auto">
            {isLoading ? (
              <Spinner />
            ) : error ? (
              <ErrorMessage />
            ) : cookie ? (
              <RichText
                htmlContent={cookie.en}
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
