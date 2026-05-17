"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { useRouter } from "next/navigation";

import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";

export default function Expertise() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      smoothWheel: true,
      smoothTouch: true,
      lerp: 0.1,
    });

    const animate = (time) => {
      lenis.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      lenis.destroy();
    };
  }, []);

  const navigateTo = (path) => {
    router.push(path);
  };

  // className="relative bg-[#050505] pt-20 min-h-screen sm:min-h-[200vh] md:min-h-[300vh] lg:min-h-[405vh]"

  return (
    <>
      <main
        ref={container}
        className="relative bg-[#050505] pt-20 min-h-screen sm:min-h-[200vh] md:min-h-[300vh] lg:min-h-[405vh]"
      >
        <Section1 scrollYProgress={scrollYProgress} />
        <Section2 scrollYProgress={scrollYProgress} />
        <Section3 scrollYProgress={scrollYProgress} />
        <Section4 scrollYProgress={scrollYProgress} />

        <hr className="border-t-20 border-gray-800 w-[90%] mx-auto bg-black/75" />
      </main>
    </>
  );
}
