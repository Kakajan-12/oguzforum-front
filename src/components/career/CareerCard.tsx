"use client";
import { Career } from "@/types";
import RichText from "@/components/ui/RichText";
import { FiClock, FiMapPin } from "react-icons/fi";

interface Props {
  vacancy: Career;
  onApply: (v: Career) => void;
}

export default function CareerCard({ vacancy, onApply }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 p-6 lg:p-8">
      <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
        {vacancy.en}
      </h3>

      {vacancy.description && (
        <p className="mt-4 text-[0.95rem] leading-relaxed text-gray-600">
          {vacancy.description}
        </p>
      )}

      {vacancy.requirements && (
        <div className="mt-5">
          <h4 className="font-semibold text-gray-900">Requirements:</h4>
          <RichText
            htmlContent={vacancy.requirements}
            className="mt-2 text-[0.95rem] leading-relaxed text-gray-600"
          />
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
          {vacancy.job_type && (
            <span className="flex items-center gap-2">
              <FiClock size={16} className="shrink-0" />
              {vacancy.job_type}
            </span>
          )}
          {vacancy.location && (
            <span className="flex items-center gap-2">
              <FiMapPin size={16} className="shrink-0" />
              {vacancy.location}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => onApply(vacancy)}
          className="rounded-md bg-[#1268B3] px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0f5694]"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
