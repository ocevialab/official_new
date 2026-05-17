"use client";
import React, { useRef, useEffect, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationweb from "../../public/animation2.json";
import animationmob from "../../public/animation3mobi.json";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TITLE = "OceviaLab";

const Hero = () => {
  const [isPotrait, setIsPotrait] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsPotrait(window.innerWidth < window.innerHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /** Composition width ÷ height from Lottie JSON — drives viewport “cover” sizing */
  const aspectRatio = isPotrait ? 1080 / 1920 : 1920 / 1080;

  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lottieRef.current || !containerRef.current) return;

    const totalFrames = lottieRef.current.getDuration(true);

    const reverseAnimation = () => {
      let currentFrame: number = totalFrames || 0;
      const interval = setInterval(() => {
        if (currentFrame <= 0) {
          clearInterval(interval);
        } else {
          currentFrame -= 1;
          lottieRef.current?.goToAndStop(currentFrame, true);
        }
      }, 100);
    };

    reverseAnimation();

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom 50%",
      scrub: true,
      onUpdate: (self) => {
        const frame = Math.floor(self.progress * (totalFrames ?? 0));
        lottieRef.current?.goToAndStop(frame, true);
      },
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const titleWrap =
        container.querySelector<HTMLElement>(".hero-title-wrap");
      if (titleWrap) {
        gsap.fromTo(
          titleWrap,
          { opacity: 1 },
          {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "bottom top",
              scrub: 2.75,
            },
          },
        );
      }

      const letters = container.querySelectorAll<HTMLElement>(".hero-letter");
      letters.forEach((el, i) => {
        const lift = 36 + i * 52;
        gsap.fromTo(
          el,
          { y: 0 },
          {
            y: -lift,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "bottom top",
              scrub: 1.15,
            },
          },
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden bg-transparent"
    >
      {/* Cover frame: fills viewport like object-cover (no side bars on ultrawide / portrait) */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [&_svg]:block [&_svg]:size-full"
          style={{
            width: "100vw",
            height: `calc(100vw / ${aspectRatio})`,
            minHeight: "100vh",
            minWidth: `calc(100vh * ${aspectRatio})`,
          }}
        >
          <Lottie
            lottieRef={lottieRef}
            animationData={isPotrait ? animationmob : animationweb}
            loop={false}
            autoplay={false}
            className="size-full [&_svg]:max-h-none [&_svg]:max-w-none"
            rendererSettings={{
              preserveAspectRatio: "xMidYMid slice",
            }}
          />
        </div>
      </div>

      <div className="hero-title-wrap pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-3 sm:px-4">
        <h1
          className="flex flex-nowrap justify-center font-Mokoto text-[clamp(1.625rem,7.25vw,4.5rem)] font-bold tracking-[0.06em] text-white mix-blend-soft-light drop-shadow-none sm:text-7xl sm:tracking-widest md:text-[8rem] md:tracking-widest lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem]"
          aria-label={TITLE}
        >
          {TITLE.split("").map((char, i) => (
            <span key={`${char}-${i}`} className="hero-letter inline-block">
              {char}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default Hero;
