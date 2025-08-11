"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo"; // path ke file Logo.tsx

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

const linksVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBgDark, setIsBgDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Disable scroll saat menu terbuka (mobile)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Detect scroll untuk toggle scrolled state
  useEffect(() => {
    function onScroll() {
      if (window.scrollY > 50) {
        setScrolled(true);
        setIsBgDark(false);
        setIsOpen(false);
      } else {
        setScrolled(false);
        setIsBgDark(true);
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-50 transition-colors duration-500 ${
          isBgDark ? "bg-dark text-light" : "bg-light text-dark"
        }`}
      >
        <Logo inverted={isBgDark} size={60} />

        {/* Tombol Hamburger */}
        <AnimatePresence mode="wait">
          {!scrolled && !isOpen && (
            <motion.button
              key="menu-button"
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-md bg-accent text-dark hover:opacity-80 transition"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={buttonVariants}
            >
              <Menu size={20} />
            </motion.button>
          )}

          {/* Tombol Close */}
          {!scrolled && isOpen && (
            <motion.button
              key="close-button"
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md bg-accent text-dark hover:opacity-80 transition"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={buttonVariants}
            >
              <X size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Link langsung saat scrolled */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              key="nav-links"
              className="flex gap-6 text-lg font-semibold font-satoshi"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={linksVariants}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <a href="#home" className="hover:text-accent transition">
                Home
              </a>
              <a href="#about" className="hover:text-accent transition">
                About
              </a>
              <a href="#projects" className="hover:text-accent transition">
                Projects
              </a>
              <a href="#contact" className="hover:text-accent transition">
                Contact
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Menu dropdown mobile */}
      <AnimatePresence>
        {isOpen && !scrolled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`flex flex-col items-center justify-center gap-8 overflow-hidden ${
              isBgDark ? "bg-dark text-light" : "bg-light text-dark"
            }`}
          >
            <a
              href="#home"
              onClick={() => setIsOpen(false)}
              className="text-3xl font-satoshi hover:text-accent transition py-4"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => setIsOpen(false)}
              className="text-3xl font-satoshi hover:text-accent transition py-4"
            >
              About
            </a>
            <a
              href="#projects"
              onClick={() => setIsOpen(false)}
              className="text-3xl font-satoshi hover:text-accent transition py-4"
            >
              Projects
            </a>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="text-3xl font-satoshi hover:text-accent transition py-4"
            >
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main>{/* konten utama */}</main>
    </>
  );
}
