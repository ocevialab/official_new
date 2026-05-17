"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onFinish: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [targetProgress, setTargetProgress] = useState(0);
  const [isSlowNetwork, setIsSlowNetwork] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const progressRef = useRef(0);
  const animationStartedRef = useRef(false);

  // Smooth progress interpolation
  useEffect(() => {
    let rafId: number;
    const tick = () => {
      setProgress((prev) => {
        const delta = targetProgress - prev;
        const step = Math.max(0.3, delta * 0.05);
        const next = Math.min(prev + step, targetProgress);
        progressRef.current = next;
        return next;
      });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [targetProgress]);

  // Cursor-following glow effect
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
  // Detect slow network
  type NetInfo = { effectiveType?: string };
  const nav = navigator as Navigator & {
    connection?: NetInfo;
    mozConnection?: NetInfo;
    webkitConnection?: NetInfo;
  };
  const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
  if (conn?.effectiveType && ["slow-2g", "2g", "3g"].includes(conn.effectiveType)) {
    setIsSlowNetwork(true);
  }

  // Detect chunk load errors
  const errorHandler = (e: ErrorEvent) => {
    if (e.message?.includes("ChunkLoadError")) setIsSlowNetwork(true);
  };
  window.addEventListener("error", errorHandler);

  // Animate logo at start
  setTargetProgress(25);
  gsap.to(logoRef.current, {
    scale: 1,
    opacity: 1,
    duration: 1.2,
    ease: "power2.out",
  });

  // Combined asset loader
  const fontReady = document.fonts.ready;
  const pageLoaded = new Promise<void>((resolve) => {
    if (document.readyState === "complete") return resolve();
    window.addEventListener("load", () => resolve(), { once: true });
  });

  // Max wait fallback: 5 seconds
  const timeoutFallback = new Promise<void>((resolve) =>
    setTimeout(resolve, 5000)
  );

  // Wait for either full asset load or 5s timeout
  Promise.race([
    Promise.all([fontReady, pageLoaded]),
    timeoutFallback,
  ]).then(() => {
    setTargetProgress(100);
    const waitInterval = setInterval(() => {
      if (progressRef.current >= 99.9 && !animationStartedRef.current) {
        animationStartedRef.current = true;
        clearInterval(waitInterval);

        gsap
          .timeline()
          .to(logoRef.current, {
            scale: 1.2,
            duration: 0.5,
            ease: "power3.out",
          })
          .to(wrapperRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: onFinish,
          });
      }
    }, 100);
  });

  return () => {
    window.removeEventListener("error", errorHandler);
  };
}, [onFinish]);


  return (
    <>
      <div
        ref={wrapperRef}
        className="preloader-wrapper fixed inset-0 z-[9999] flex items-center justify-center text-white bg-gradient overflow-hidden transition-opacity duration-500"
      >
        {/* Cursor glow */}
        <div
          ref={glowRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 250,
            height: 250,
            borderRadius: "9999px",
            backgroundColor: "rgba(59,130,246,0.2)",
            filter: "blur(60px)",
            pointerEvents: "none",
            transform: "translate(-50%,-50%)",
            transition: "transform 0.1s ease",
            zIndex: 0,
          }}
        />

        {/* Center logo */}
        <div
          ref={logoRef}
          className="font-bold md:text-6xl text-3xl tracking-wider scale-50 opacity-0 transition-all duration-500 z-10"
          style={{ color: "#f6f6f6" }}
        >
          <span>OceviaLab</span>
          <span className="text-[10px] md:text-[30px] mt-[2px] align-top">
            ™
          </span>
        </div>

        {/* Bottom-left progress */}
        <div className="absolute bottom-6 left-6 text-xs sm:text-sm tracking-wide font-mono z-10 text-white">
          Loading... {Math.round(progress)}%
          {isSlowNetwork && (
            <p className="mt-1 text-[10px] text-blue-400 max-w-[200px] leading-snug">
              Your network seems slow. Please wait while we load the app.
            </p>
          )}
        </div>
      </div>

      {/* Gradient background animation */}
      <style jsx global>{`
        @keyframes gradientFlow {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .bg-gradient {
          background: linear-gradient(to top, #1e222b, #0a0a0a, #0e0e0f);
          background-size: 400% 400%;
          animation: gradientFlow 8s ease infinite;
        }
      `}</style>
    </>
  );
};

export default Preloader;
