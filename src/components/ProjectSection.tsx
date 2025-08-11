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
  link?: string;
  index: number;
  totalProjects: number;
  onActive?: () => void;
  onHoverChange: (hovering: boolean) => void;
}

export default function ProjectSection({
  image,
  title,
  bgColor = "#FFD700",
  link,
  index,
  totalProjects,
  onHoverChange,
}: ProjectSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const defaultBg = "#1a1a1a";

  useEffect(() => {
    const section = sectionRef.current;
    const imageEl = imageRef.current;
    const titleEl = titleRef.current;

    if (!section || !imageEl || !titleEl) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
        // onActive?.();
          // Snap ke section ini
          gsap.to(window, {
            scrollTo: { y: section, autoKill: false },
            duration: 0.6,
            onComplete: () => {
              // Animasi masuk
              gsap.timeline()
                .to(imageEl, { scale: 1.2, duration: 0.4, ease: "power2.out" })
                .to(section, { backgroundColor: bgColor, duration: 0.4 }, "<")
                .fromTo(titleEl, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4 }, "<");
            },
          });
        },
        onEnterBack: () => {
          gsap.to(window, {
            scrollTo: { y: section, autoKill: false },
            duration: 0.6,
            onComplete: () => {
              gsap.timeline()
                .to(imageEl, { scale: 1.2, duration: 0.4, ease: "power2.out" })
                .to(section, { backgroundColor: bgColor, duration: 0.4 }, "<")
                .fromTo(titleEl, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4 }, "<");
            },
          });
        },
        onLeave: () => {
          // Reset ketika keluar ke bawah
          gsap.to(section, { backgroundColor: defaultBg, duration: 0.3 });
          gsap.to(imageEl, { scale: 1, duration: 0.3 });
          gsap.to(titleEl, { opacity: 0, y: 40, duration: 0.3 });
        },
        onLeaveBack: () => {
          // Reset ketika keluar ke atas
          gsap.to(section, { backgroundColor: defaultBg, duration: 0.3 });
          gsap.to(imageEl, { scale: 1, duration: 0.3 });
          gsap.to(titleEl, { opacity: 0, y: 40, duration: 0.3 });
        },
      });
    });

    return () => ctx.revert();
  }, [bgColor]);

  return (
    <section
      ref={sectionRef}
      onClick={() => link && window.open(link, "_blank")}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      className="h-screen flex flex-col items-center justify-center bg-dark text-light transition-colors cursor-none relative overflow-hidden"
    >
      <div
        ref={imageRef}
        className="w-[80%] h-[60%] bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <h1 ref={titleRef} className="text-4xl font-bold mt-8 opacity-0">
        {title}
      </h1>

      {/* Overlay Selected Project */}
      <div className="absolute bottom-6 left-6 bg-black/70 text-white px-4 py-2 rounded-lg text-sm z-[9999] pointer-events-none">
        Selected Project: {index}/{totalProjects}
      </div>
    </section>
  );
}
