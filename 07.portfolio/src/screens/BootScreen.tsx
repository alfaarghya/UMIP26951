"use client";

import Preloader from "@/components/elements/bootscreen/BootElement";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

const BootScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);
  return (
    <AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>
  );
};

export default BootScreen;
