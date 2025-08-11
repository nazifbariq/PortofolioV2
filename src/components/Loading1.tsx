"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

export default function LoadingScreen({ onLoaded }: { onLoaded: () => void }) {
  const [progress, setProgress] = useState(0);

  // Untuk animasi scale dan opacity teks AQIL
  const scale = useMotionValue(1);
  const opacity = useMotionValue(1);

  // Animasi loop untuk scale dan opacity
  useEffect(() => {
    let toggle = false;
    const interval = setInterval(() => {
      toggle = !toggle;
      scale.set(toggle ? 1.1 : 1);
      opacity.set(toggle ? 0.7 : 1);
    }, 1500);

    return () => clearInterval(interval);
  }, [scale, opacity]);

  // Progress increment
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onLoaded, 1000);
          return 100;
        }
        return p + 1.5;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onLoaded]);

  // Buat background gradient yang berubah dari hitam ke putih sesuai progress (optional)
  const bgGradient = useMotionValue(0);
  useEffect(() => {
    bgGradient.set(progress / 100);
  }, [progress, bgGradient]);

  // Transform untuk warna background dari black ke white
  const backgroundColor = useTransform(bgGradient, [0, 1], [
    "rgba(0,0,0,1)",
    "rgba(255,255,255,1)",
  ]);

  // Warna teks kebalikannya (putih ke hitam)
  const textColor = useTransform(bgGradient, [0, 1], [
    "rgba(255,255,255,1)",
    "rgba(0,0,0,1)",
  ]);

  return (
    <AnimatePresence>
      <motion.div
        key="loading"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8 } }}
        style={{ background: backgroundColor }}
        className="fixed inset-0 flex flex-col justify-center items-center overflow-hidden"
      >
        {/* Noise Overlay */}
        <div
          style={{
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22noise%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.4%22 numOctaves=%221%22 stitchTiles=%22stitch%22/></filter><rect width=%22200%22 height=%22200%22 filter=%22url(%23noise)%22/></svg>')",
            opacity: 0.05,
            zIndex: 10,
          }}
        />

        {/* Tulisan AQIL */}
        <motion.h1
          style={{ scale: scale, opacity: opacity, color: textColor }}
          className="text-[10vw] font-bold select-none"
        >
          AQIL
        </motion.h1>

        {/* Progress bar */}
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
