"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

const DURATION = 0.25;
const STAGGER = 0.025;

export const RevealLinks = () => {
  const headingRefs = useRef([]);

  return (
    <>
      <section className="grid place-content-center gap-2 px-8 py-24 text-[#f6f6f6] bg-[#050505]">
        <FlipLink
          href="/notAvailable"
          target="_blank"
          rel="noopener noreferrer"
        >
          Behance
        </FlipLink>
        <FlipLink
          href="https://www.facebook.com/share/1L3fUquxz1/?mibextid=wwXIfr"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </FlipLink>
        <FlipLink
          href="https://www.instagram.com/ocevialab"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </FlipLink>
        <FlipLink
          href="https://www.linkedin.com/company/ocevialab/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </FlipLink>
      </section>

      <hr className="border-t-20 border-gray-800 w-[90%] mx-auto bg-black/75" />
    </>
  );
};

const FlipLink = ({ children, href, ...props }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      {...props}
      className="group relative block overflow-hidden whitespace-nowrap text-6xl font-black font-Mokoto uppercase text-[#f6f6f6] hover:text-[#00FFA3] sm:text-7xl md:text-8xl lg:text-9xl "
      style={{ lineHeight: 0.8 }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block group-hover:text-[#393cec]"
            key={`top-${i}`}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block group-hover:text-[#393cec]"
            key={`bottom-${i}`}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};
