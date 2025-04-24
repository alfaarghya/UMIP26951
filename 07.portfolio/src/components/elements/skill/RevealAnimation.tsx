"use client";

import React, { FC, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { CardProps, CardRevealProps } from "@/types/skillType";

const RevealAnimation: FC<CardRevealProps> = ({ children, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.5, 1]);

  return (
    <div
      ref={targetRef}
      className={cn("relative z-0 h-[500vh] w-full", className)}
    >
      <div className="sticky top-0 mx-auto flex flex-col justify-center items-center bg-transparent md:px-[1rem] py-[5rem]">
        {/* Animated Text Section */}
        <motion.div
          className="text-4xl flex flex-col justify-center items-center md:font-extrabold font-bold text-white mt-10"
          style={{ opacity, scale }} // Apply animations here
        >
          <span className="text-[#b1b1b1]">My</span>
          <span>Skillsets</span>
        </motion.div>

        <div className="relative h-1/2 w-full">
          {/* Relative container to position cards */}
          {React.Children.map(children, (child, i) => {
            const start = i * 0.3; // Adjust this value for more/less scroll space
            const end = start + 0.1; // This keeps a small overlap while scrolling

            return (
              <Card
                key={i}
                progress={scrollYProgress}
                range={[start, end]}
                index={i}
              >
                {child}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Card component handling individual card animation
const Card: FC<CardProps> = ({ children, progress, range, index }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const translateY = useTransform(progress, range, [50, 0]); // Control stacking position
  const zIndex = index + 1; // Ensure each card has a higher z-index as it appears

  return (
    <motion.div
      style={{ opacity, translateY, zIndex }}
      className="absolute inset-0 mx-4 my-2 md:p-6 text-center"
    >
      {children}
    </motion.div>
  );
};

export default RevealAnimation;
