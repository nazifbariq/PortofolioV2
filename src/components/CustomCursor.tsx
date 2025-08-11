"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CustomCursorProps {
  isVisible: boolean;
}

export default function CustomCursor({ isVisible }: CustomCursorProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      className="fixed z-[9999] pointer-events-none flex items-center justify-center"
      style={{
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <div
        className="px-5 py-2 rounded-full text-white text-sm font-medium"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        See Study Case
      </div>
    </motion.div>
  );
}
