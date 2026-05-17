"use client";

import React from "react";

/** SSR-stable positions — white / blue / orange */
const TWINKLE_PALETTE = [
  "rgba(255, 255, 255, 0.9)",
  "rgba(115, 195, 255, 0.95)",
  "rgba(255, 158, 88, 0.95)",
] as const;

const EASINGS = [
  "ease-in-out",
  "cubic-bezier(0.45, 0.05, 0.55, 0.95)",
  "cubic-bezier(0.4, 0, 0.2, 1)",
  "cubic-bezier(0.37, 0, 0.63, 1)",
] as const;

function buildStars(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const left = 0.5 + ((i * 7919) % 9900) / 100;
    const top = 0.5 + ((i * 5839 + i * i * 17) % 9900) / 100;
    const delay = ((i * 127) % 850) / 100;
    const duration = 1.25 + ((i * 193) % 385) / 100;
    const size = 1 + (i % 4);
    const color = TWINKLE_PALETTE[i % TWINKLE_PALETTE.length];
    const easing = EASINGS[i % EASINGS.length];
    return {
      left: `${left}%`,
      top: `${top}%`,
      delay,
      duration,
      size,
      color,
      easing,
    };
  });
}

const STARS = buildStars(140);

/** Fixed behind all pages; pointer-events none */
export default function StarfieldBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5] bg-[#050505]"
      aria-hidden
    >
      {STARS.map((s, i) => (
        <span
          key={i}
          className="starfield-twinkle absolute rounded-full"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            boxShadow: `0 0 ${Math.max(2, s.size + 2)}px ${s.color}`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            animationTimingFunction: s.easing,
          }}
        />
      ))}
    </div>
  );
}
