"use client";

const Spinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-mainBlue/20" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-mainBlue animate-spin" />
      </div>
    </div>
  );
};

export default Spinner;
