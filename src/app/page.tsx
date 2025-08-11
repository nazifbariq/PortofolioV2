"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/Loading2";
import ProjectSection from "@/components/ProjectSection";
import Navbar from "@/components/Navbar";
import { projects } from "../data/project";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(1);
  const [isHoveringProject, setIsHoveringProject] = useState(false); 

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" onLoaded={() => setLoading(false)} />
        ) : (
          <motion.main
            key="content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <Navbar />

            {/* Intro Section */}
            <section className="h-screen bg-white text-light flex items-center justify-center">
              <h1 className="text-5xl font-satoshi">Welcome</h1>
            </section>

            {/* Project Sections */}
            {projects.map((proj, i) => (
              <ProjectSection
                key={i}
                {...proj}
                index={i + 1}
                totalProjects={projects.length}
                onActive={() => setActiveIndex(i + 1)}
                onHoverChange={setIsHoveringProject}  
              />
            ))}
 
            <CustomCursor isVisible={isHoveringProject} />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
