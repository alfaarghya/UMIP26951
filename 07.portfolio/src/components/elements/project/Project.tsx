import Link from "next/link";
import { ProjectProps } from "@/types/projectType";

const Project = ({
  index,
  title,
  description,
  setModal,
  link,
}: ProjectProps) => {
  return (
    <div
      className=" w-[100%] px-0 md:px-[100px] py-[25px] md:py-[50px]  border-t border-t-zinc-800 border-b-zinc-800 last:border-b  project-hover"
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
    >
      <Link href={link} target="_blank">
        <div className="flex items-center justify-between gap-4">
          <h2 className="w-2/5 text-white font-bold text-xl md:text-2xl m-0 transition-[all_0.4s]">
            {title}
          </h2>
          <p className="w-3/5  text-center transition-[all_0.4s] m-0 text-xs md:text-base text-[#B1B1B1] font-medium">
            {description}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Project;
