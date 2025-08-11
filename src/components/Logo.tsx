"use client";

import Image from "next/image";

interface LogoProps {
  inverted?: boolean; // default false
  size?: number; // ukuran logo, default 60
}

export default function Logo({ inverted = false, size = 60 }: LogoProps) {
  return (
    <Image
      src="/images/logo.png"
      alt="Logo Aqil"
      width={size}
      height={size}
      className="select-none"
      style={{
        filter: inverted ? "invert(1)" : "invert(0)",
        transition: "filter 0.3s ease",
      }}
    />
  );
}
