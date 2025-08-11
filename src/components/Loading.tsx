"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const letters = ["A", "Q", "I", "L"];

export default function LoadingScreen({ onLoaded }: { onLoaded: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onLoaded, 1000); // delay sebelum loading hilang
          return 100;
        }
        return p + 1.5;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8 } }}
        className="fixed inset-0 bg-black flex flex-col justify-center items-center"
      >
        <div className="flex gap-4">
          {letters.map((letter, i) => (
            <motion.span
              key={letter}
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: [20, 0, -10, 0, 20],
                opacity: [0, 1, 1, 1, 0],
              }}
              transition={{
                delay: i * 0.25,
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-white text-7xl font-extrabold select-none"
            >
              {letter}
            </motion.span>
          ))}
        </div>
        <motion.div
          className="fixed bottom-8 left-0 right-0 h-1 bg-gray-700"
          style={{ width: `${progress}%` }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeInOut", duration: 0.1 }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
