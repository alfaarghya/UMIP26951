"use client";
import React from "react";
import DockElement from "@/components/elements/dock/DockElement";
import { motion } from "framer-motion";
import { dockItems } from "@/stores/dockStore";

const Dock = () => {
  return (
    <motion.div
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        type: "spring",
        damping: 10,
        delay: 3.5,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex md:justify-center justify-start "
    >
      <DockElement
        desktopClassName="fixed bottom-4 "
        mobileClassName="fixed bottom-4"
        items={dockItems}
      />
    </motion.div>
  );
};

export default Dock;
