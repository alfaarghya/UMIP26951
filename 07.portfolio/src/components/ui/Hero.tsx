"use client";
import { motion } from "framer-motion";
import HeroSvg from "../elements/hero/HeroSvg";
import CliCommand from "../elements/hero/CliCommand";
import Spotlight from "../elements/hero/Spotlight";

const Hero = () => {
  return (
    <div className="flex flex-col gap-4 h-screen size-screen mx-auto justify-center">
      <Spotlight
        // -top-40 left-0
        className=" hidden md:block  md:left-60 md:-top-20"
        fill="#0957dd"
      />
      <HeroSvg />
      <motion.div
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          type: "spring",
          damping: 10,
          delay: 3,
        }}
        initial={{ y: -20, opacity: 0 }}
        className="max-w-7xl mx-auto px-4 flex flex-col gap-4 items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center">
          <span className="tracking-tighter text-2xl md:text-3xl text-center font-medium text-[#e4e4e4] ">
            Hii, I&apos;m
          </span>
          <h1 className="tracking-tighter text-6xl md:text-7xl xl:text-8xl text-center font-bold my-2">
            <span className="font-bold bg-gradient-to-b from-[#1b4284] to-blue-700 bg-clip-text text-transparent">
              Arghya Das
            </span>{" "}
          </h1>
        </div>
        <p className="text-primary/80 max-w-lg text-center tracking-tight md:text-lg font-light text-[#c9c9c9]">
          FullStack Developer , Bringing Ideas to Life through Code and Design.
        </p>

        <CliCommand />
      </motion.div>
    </div>
  );
};

export default Hero;
