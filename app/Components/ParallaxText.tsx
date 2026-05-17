"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";
import { gsap } from "gsap";

interface ParallaxProps {
  children: string;
  baseVelocity?: number;
  fontSize: string;
}

const ParallaxText: React.FC<ParallaxProps> = ({
  children,
  baseVelocity = 100,
  fontSize,
}) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const textElement = textRef.current;

    if (container && textElement) {
      const handleMouseEnter = () => {
        gsap.to(textElement, {
          color: "transparent",
          webkitTextStroke: "3px white",
          duration: 0.3,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(textElement, {
          color: "white", // Use your original text color here
          webkitTextStroke: "0px",
          duration: 0.3,
        });
      };

      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <div
      className="relative w-screen overflow-hidden whitespace-nowrap flex "
      ref={containerRef}
    >
      <motion.div
        className={`flex ${fontSize} font-bold font-Mokoto tracking-widest`}
        style={{ x, display: "inline-block" }}
        ref={textRef}
      >
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
      </motion.div>
    </div>
  );
};

export default ParallaxText;
