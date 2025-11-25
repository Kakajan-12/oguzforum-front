import Image from "next/image";
import React from "react";

const Media = () => {
    return (
        <div className="relative w-full h-screen">
            <Image
                src="/Career.png"
                alt={"background"}
                width={1920}
                height={1080}
                priority
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950/100 to-transparent"></div>


            <div
                className="flex justify-center items-center h-full w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="text-white text-center text-3xl md:text-6xl font-bold md:max-w-[900px] px-5">
                    <p className="text-white text-sm md:text-base lg:text-lg xl:text-xl">
                        Coming soon
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Media