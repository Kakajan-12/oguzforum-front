import React from "react";


const PhilosophyText = () => {
  return (
    <div className="container mx-auto px-2">
      <div className="py-12 flex flex-col gap-5">
        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold blue-text">{"Our philosophy"}</h2>
        <p className="text-sm md:text-md lg:text-lg font-normal leading-5">
          {"We believe that successful events and business solutions are built on trust, creativity, and technological innovation. Our philosophy is to bring together people, ideas, and technology, creating platforms for productive collaboration, knowledge exchange, and innovation implementation. We aim not just to organize events, but to create value for our clients and partners, supporting their growth and digital transformation."}
        </p>
      </div>
    </div>
  );
};

export default PhilosophyText;
