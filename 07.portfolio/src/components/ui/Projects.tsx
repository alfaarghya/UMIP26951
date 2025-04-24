"use client";

import { useState } from "react";
import Modal from "../elements/project/Modal";
import Project from "../elements/project/Project";
import { modal } from "@/types/projectType";
import { projects } from "@/stores/projectStore";

const Projects = () => {
  const [modal, setModal] = useState<modal>({ active: false, index: 0 });
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col text-start items-start justify-center px-4 w-full md:w-[700px] lg:w-[1000px]">
        <div className="text-4xl w-full flex flex-col justify-center items-center md:font-extrabold font-bold text-white mt-10 py-4">
          <span className="text-[#b1b1b1]">Recent</span>
          <span>Works</span>
        </div>

        {projects.map((project, index) => {
          return (
            <Project
              index={index}
              description={project.description}
              title={project.title}
              link={project.link}
              setModal={setModal}
              key={index}
            />
          );
        })}
      </div>
      <Modal modal={modal} projects={projects} />
    </div>
  );
};

export default Projects;
