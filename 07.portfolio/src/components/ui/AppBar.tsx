"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const AppBar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Trigger the animation after the component mounts
  }, []);
  return (
    <div className="w-full flex justify-center items-center">
      <div
        className={`mt-4 fixed top-0  h-20 md:w-2/3 sm:w-96 w-80 rounded-2xl bg-neutral-500/10 backdrop-blur-sm px-4 flex justify-between items-center z-50 transition-all duration-700 delay-[3200ms] ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
      >
        <Link
          href="#"
          className="flex justify-center items-center md:gap-2 cursor-pointer"
        >
          <Image
            src="/alfaarghyaAvtar.svg"
            width={50}
            height={50}
            alt="alfaarghya logo"
            className="md:h-14 h-10 md:w-14 w-10"
          />
          <span className=" text-[#D8E3EB] font-bold text-lg tracking-widest md:block hidden">
            alfaarghya.dev
          </span>
        </Link>
        <div className="flex items-center gap-2  text-xs text-white/90 leading-none border border-white/30 md:px-4 px-2 md:py-2 py-1 rounded-full md:uppercase lowercase cursor-pointer">
          <span className="relative w-2 h-2 rounded-full bg-green-500">
            <span className="absolute top-0 left-0 w-full h-full animate-ping rounded-full bg-green-500 opacity-75"></span>
          </span>
          open to work
        </div>
      </div>
    </div>
  );
};

export default AppBar;
