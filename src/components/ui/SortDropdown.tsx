"use client";

import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export type SortOption = {
  value: string;
  label: string;
};

type SortDropdownProps = {
  value: string;
  onChange: (value: string) => void;
  options: SortOption[];
  className?: string;
};

export default function SortDropdown({
  value,
  onChange,
  options,
  className = "",
}: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const select = (next: string) => {
    onChange(next);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className={`relative w-full sm:w-64 ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-11 w-full items-center justify-between border border-[#797979] bg-white px-4 text-left text-sm text-[#797979] outline-none transition focus:border-[#1268B3] ${
          open ? "rounded-t border-b-0" : "rounded"
        }`}
      >
        <span className="truncate">{selected?.label ?? ""}</span>
        <FiChevronDown
          size={18}
          className={`ml-2 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-activedescendant={value}
          className="absolute left-0 right-0 top-full z-20 -mt-px overflow-hidden rounded-b border border-[#797979] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
        >
          {options.map((option) => {
            const highlighted =
              option.value === value || option.value === hovered;

            return (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === value}
              >
                <button
                  type="button"
                  id={option.value}
                  onClick={() => select(option.value)}
                  onMouseEnter={() => setHovered(option.value)}
                  onMouseLeave={() => setHovered(null)}
                  className={`w-full px-4 py-2.5 text-left text-sm transition ${
                    highlighted
                      ? "bg-[#558CBE] text-white"
                      : "text-[#797979] hover:bg-[#558CBE] hover:text-white"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
