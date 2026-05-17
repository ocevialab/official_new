"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "../styles/expertise.module.css";
import { OCEVIALAB_SERVICES } from "../data/services";

gsap.registerPlugin(ScrollTrigger);

const ExpertiseSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scroll = scrollRef.current;

    if (container && scroll) {
      gsap.to(scroll, {
        x: () => -(scroll.scrollWidth - container.offsetWidth),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${scroll.scrollWidth - container.offsetWidth}`,
          scrub: true,
          pin: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.expertiseContainer}>
      <div ref={scrollRef} className={styles.scrollWrapper}>
        {OCEVIALAB_SERVICES.map((item) => (
          <div key={item.label} className={styles.card}>
            <h2 className={styles.title}>{item.label}</h2>
            <p className={styles.description}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertiseSection;
