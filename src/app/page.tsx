"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import LoadingScreen from "@/components/Loading2";
import ProjectSection from "@/components/ProjectSection";
import Navbar from "@/components/Navbar";


export default function Home() {
  const [loading, setLoading] = useState(true);

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
            <section className="h-screen bg-white text-light flex items-center justify-center no-scrollbar">
              <h1 className="text-5xl font-satoshi">Welcome</h1>
            </section>

            <ProjectSection
              image="/images/wayang3.jpg"
              title="Project One"
              bgColor="#FFB400"
            />
            <ProjectSection
              image="/images/wayang3.jpg"
              title="Project Two"
              bgColor="#f0cc76ff"
            />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
