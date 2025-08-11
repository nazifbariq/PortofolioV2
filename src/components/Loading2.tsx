"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const targetText = "AQIL";

function randomChar() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

export default function RandomizedTextLoading({ onLoaded }: { onLoaded: () => void }) {
  const [displayText, setDisplayText] = useState(Array(targetText.length).fill(""));
  const [done, setDone] = useState(false);

useEffect(() => {
let iteration = 0;
  const interval = setInterval(() => {
    setDisplayText((prev) =>
      prev.map((char, i) => {
        if (iteration > i * 5) {
          return targetText[i];
        }
        return randomChar();
      })
    );

    iteration++;
    if (iteration > targetText.length * 5 + 10) {
      clearInterval(interval);
      setDone(true);
      setTimeout(() => {
        onLoaded();
      }, 800);
    }
  }, 80);

  return () => clearInterval(interval);
}, [onLoaded]);


  return (
    <AnimatePresence>
      <motion.div
        key="loading"
        className="fixed inset-0 bg-black flex items-center justify-center z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
      >
        <h1 className="text-white text-[12vw] font-extrabold select-none tracking-widest">
          {displayText.map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              animate={{ opacity: char === targetText[i] ? 1 : 0.7 }}
              transition={{ duration: 0.3 }}
            >
              {char}
            </motion.span>
          ))}
        </h1>
      </motion.div>
    </AnimatePresence>
  );
}
