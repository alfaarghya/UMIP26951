import React from "react";
import { Circle } from "../Circle";
import Image from "next/image";

const CardType2 = () => {
  return (
    <div className="relative flex xl:h-[500px] h-[400px] md:w-1/2 w-full items-center justify-center overflow-hidden rounded-lg border bg-neutral-900/10 backdrop-blur-sm md:shadow-xl  xl:px-5">
      <div className="flex flex-col justify-center items-center ">
        <div className="size-28 z-10 flex items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]">
          <Image
            src="/svg/complete-site.svg"
            width={160}
            height={160}
            alt="complete-site"
          />
        </div>
        <p className="text-white">Complete Site</p>
      </div>
    </div>
  );
};

export default CardType2;
