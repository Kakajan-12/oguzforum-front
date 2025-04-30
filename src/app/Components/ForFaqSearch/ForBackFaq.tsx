"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import search from "../../../../public/Search_alt_light (1).png";
interface backImg {
  src: string;
  name: string;
}

const ForFaq = () => {
  const [visible, setVisiible] = useState(false);
  const forEl = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");
  const forLengthchech = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const forToggleVisible = (event: MouseEvent) => {
    if (text.length >= 0) {
      setText("");
    }
    if (forEl.current && !forEl.current.contains(event.target as Node)) {
      setVisiible(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", forToggleVisible);
    return () => {
      document.removeEventListener("click", forToggleVisible);
    };
  }, []);

  return (
    <div className="w-full h-screen">
      <Image
        src="/News.png"
        alt="test"
        width={800}
        height={800}
        objectFit="cover"
        className="w-full h-full object-cover"
      />
      <div className="flex justify-center gap-10 flex-col items-center h-full w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="text-white text-center text-3xl md:text-6xl   font-bold md:max-w-[900px]  px-5">
          FAQ
        </div>
        <div
          ref={forEl}
          onClick={() => setVisiible(true)}
          className="relative flex  bg-transparent   max-w-[700px] px-10 w-full"
        >
          <input
            onChange={forLengthchech}
            value={text}
            type="text"
            placeholder="Search..."
            className={`${
              visible ? "pl-5" : "pl-12"
            }  text-white text-lg py-3 backdrop-blur-[45px] outline-none border-none rounded-3xl p-2  bg-transparent w-full`}
          />
          {!visible && (
            <span className="absolute w-8   left-12 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Image className="w-full h-full" src={search} alt="test" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForFaq;
