"use client";

import React, { useRef } from "react";
import { AnimatedBeam } from "../AnimatedBeam";
import { Circle } from "../Circle";
import Image from "next/image";
import { card1Type } from "@/types/skillType";

const CardType1 = ({ items }: { items: card1Type[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex xl:h-[500px] h-[400px] h md:w-1/2 w-full items-center justify-center overflow-hidden rounded-lg border bg-neutral-900/10 backdrop-blur-sm md:shadow-xl pb-20 px-5"
      ref={containerRef}
    >
      <div className="flex size-full flex-col max-w-lg max-h-[200px] items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col justify-center items-center ">
            <Circle ref={div1Ref}>
              <Image
                src={items[0].icon}
                width={20}
                height={20}
                alt={items[0].title}
              />
            </Circle>
            <p className="font-xs md:capitalize lowercase text-white">
              {items[0].title}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center ">
            <Circle ref={div5Ref}>
              <Image
                src={items[1].icon}
                width={20}
                height={20}
                alt={items[1].title}
              />
            </Circle>
            <p className="font-xs md:capitalize lowercase text-white">
              {items[1].title}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col justify-center items-center ">
            <Circle ref={div2Ref}>
              <Image
                src={items[2].icon}
                width={20}
                height={20}
                alt={items[2].title}
              />
            </Circle>
            <p className="font-xs md:capitalize lowercase text-white">
              {items[2].title}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center ">
            <Circle ref={div4Ref} className="md:size-16">
              <Image
                src={items[3].icon}
                width={20}
                height={20}
                alt={items[3].title}
              />
            </Circle>
            <p className="font-xs md:capitalize lowercase text-white">
              {items[3].title}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center ">
            <Circle ref={div6Ref}>
              <Image
                src={items[4].icon}
                width={20}
                height={20}
                alt={items[4].title}
              />
            </Circle>
            <p className="font-xs md:capitalize lowercase text-white">
              {items[4].title}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col justify-center items-center ">
            <Circle ref={div3Ref}>
              <Image
                src={items[5].icon}
                width={20}
                height={20}
                alt={items[5].title}
              />
            </Circle>
            <p className="font-xs md:capitalize lowercase text-white">
              {items[5].title}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center ">
            <Circle ref={div7Ref}>
              <Image
                src={items[6].icon}
                width={20}
                height={20}
                alt={items[6].title}
              />
            </Circle>
            <p className="font-xs md:capitalize lowercase text-white">
              {items[6].title}
            </p>
          </div>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        reverse
      />
    </div>
  );
};

export default CardType1;
