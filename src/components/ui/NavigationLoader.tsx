"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NavigationLoader = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 z-[9999] h-1 w-full overflow-hidden">
      <div className="h-full bg-mainBlue animate-[slide_0.5s_ease-in-out_forwards]" />
      <style>{`
        @keyframes slide {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default NavigationLoader;
