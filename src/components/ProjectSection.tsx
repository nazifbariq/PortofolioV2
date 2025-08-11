"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface ProjectSectionProps {
  image: string;
  title: string;
  bgColor?: string;
}

export default function ProjectSection({
  image,
  title,
  bgColor = "#FFD700",
}: ProjectSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const defaultBg = "#1a1a1a"; // warna default

  useEffect(() => {
    const section = sectionRef.current;
    const imageEl = imageRef.current;
    const titleEl = titleRef.current;

    if (!section || !imageEl || !titleEl) return;

    const playAnimation = () => {
      gsap.timeline()
        .to(window, { scrollTo: { y: section, autoKill: false }, duration: 0.4 })
        .to(imageEl, { scaleX: 1.2, duration: 0.4, ease: "power2.out" })
        .to(imageEl, { scale: 1.1, duration: 0.6, ease: "power2.inOut" })
        .to(section, { backgroundColor: bgColor, duration: 0.5 }, "-=0.5")
        .fromTo(titleEl, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .to(imageEl, { scale: 1, scaleX: 1, duration: 0.5 });
    };

    const resetBackground = () => {
      gsap.to(section, { backgroundColor: defaultBg, duration: 0.5 });
      gsap.to(titleEl, { opacity: 0, y: 50, duration: 0.3 });
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "+=100%",
        onEnter: playAnimation,      // scroll masuk dari atas
        onEnterBack: playAnimation,  // scroll masuk dari bawah
        onLeave: resetBackground,    // keluar ke bawah
        onLeaveBack: resetBackground // keluar ke atas
      });
    });

    return () => ctx.revert();
  }, [bgColor]);

  return (
    <section
      ref={sectionRef}
      className="h-screen flex flex-col items-center justify-center bg-dark text-light transition-colors p-24"
    >
      <div
        ref={imageRef}
        className="w-100 h-200 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
      ></div>
      <h1 ref={titleRef} className="text-4xl font-bold mt-8 opacity-0">
        {title}
      </h1>
    </section>
  );
}
