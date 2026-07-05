"use client";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useGetCareerQuery } from "@/lib/api";
import { Career } from "@/types";
import PageHero from "@/components/ui/PageHero";
import CareerCard from "@/components/career/CareerCard";
import ApplyModal from "@/components/career/ApplyModal";
import Spinner from "@/components/ui/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function CareerPage() {
  const { data, error, isLoading } = useGetCareerQuery();
  const [selected, setSelected] = useState<Career | null>(null);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <PageHero
        title="Careers"
        subtitle="Build your career with professionals shaping global conversations."
      />

      <section className="bg-white">
        <div className="container mx-auto px-4 py-6 md:py-14 lg:py-20">
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <ErrorMessage />
          ) : (
            <>
              <h2 className="mb-8 text-3xl text-gray-900 sm:text-4xl lg:text-5xl">
                Active positions{" "}
                <span className="text-4xl text-[#1268B3]">
                  ({data?.length ?? 0})
                </span>
              </h2>

              {data && data.length > 0 ? (
                <div className="space-y-5">
                  {data.map((vacancy) => (
                    <CareerCard
                      key={vacancy.id}
                      vacancy={vacancy}
                      onApply={setSelected}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  No open positions at the moment.
                </p>
              )}
            </>
          )}
        </div>
      </section>

      {selected && (
        <ApplyModal vacancy={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
