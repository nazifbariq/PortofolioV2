"use client";

import { forwardRef } from "react";

interface ProjectSectionProps {
  image: string;
  title: string;
  bgColor?: string;
}

const ProjectSection = forwardRef<HTMLDivElement, ProjectSectionProps>(
  ({ image, title, bgColor = "#FFD700" }, ref) => {
    return (
      <section
        ref={ref}
        data-bgcolor={bgColor}
        className="h-screen w-screen flex-shrink-0 flex flex-col items-center justify-center bg-dark text-light p-24"
      >
        <div
          className="w-96 h-60 bg-cover bg-center"
          style={{ backgroundImage: `url('${image}')` }}
        ></div>
        <h1 className="text-4xl font-bold mt-8 opacity-0">{title}</h1>
      </section>
    );
  }
);

ProjectSection.displayName = "ProjectSection";
export default ProjectSection;
