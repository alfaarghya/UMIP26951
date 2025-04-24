import AppBar from "@/components/ui/AppBar";
import Dock from "@/components/ui/Dock";
import Hero from "@/components/ui/Hero";
import Projects from "@/components/ui/Projects";
import Skills from "@/components/ui/Skills";
import React from "react";

const Landing = () => {
  return (
    <div className="flex flex-col">
      <AppBar />
      <Hero />
      <Skills />
      <Projects />
      <Dock />
    </div>
  );
};

export default Landing;
