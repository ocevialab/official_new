"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import Nav from "../../Components/Nav";
import Footer from "../../Components/Footer";
import Image from "next/image";
import styles from "../../styles/slider.module.css";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);
import { ScrollTrigger } from "gsap/all";

import CustomCursor from "../../Components/CustomCursor";
import worksData from "../../../public/assets/data/worksData.js";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface WorkItem {
  id: number;
  name: string;
  textOverlay: string;
  imgPor: string;
  tag: string[];
}

const filteredTag = "Digital Marketing";

const services = [
  {
    title: "Brand Strategy & Positioning",
    description:
      "We help define your brand voice and align your messaging to ensure consistency across all digital platforms.",
  },
  {
    title: "Search Engine Optimization (SEO)",
    description:
      "Drive organic traffic and improve search visibility with powerful on-page and off-page SEO strategies.",
  },
  {
    title: "Social Media Marketing",
    description:
      "Engage with your audience through carefully crafted content and campaigns across platforms like Instagram, Facebook, and TikTok.",
  },
  {
    title: "Paid Advertising (PPC)",
    description:
      "Maximize ROI through expertly managed ad campaigns on Google Ads, Meta Ads, and other platforms.",
  },
];

const Page: React.FC = () => {
  const firstText = useRef<HTMLParagraphElement>(null);
  const secondText = useRef<HTMLParagraphElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const paraRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const imageRef = useRef<HTMLDivElement>(null);
  const sliderTextRef = useRef<HTMLDivElement>(null);

  const [openStates, setOpenStates] = useState<boolean[]>(
    services.map(() => false)
  );

  let xPercent = 0;
  let direction = -1;

  const toggleOpen = (index: number) => {
    setOpenStates((prev) =>
      prev.map((open, i) => (i === index ? !open : open))
    );
  };

  const [hovering, setHovering] = useState(false);
  const router = useRouter();

  const handleImageClick = (img: string, id: number) => {
    setHovering(false);
    router.push(`/projects/${id}`);
  };

  useEffect(() => {
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: "-500px",
    });
    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      headingRefs.current.forEach((ref) => {
        if (ref) {
          gsap.from(ref, {
            scrollTrigger: {
              trigger: ref,
              start: "top 80%",
            },
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power2.out",
          });
        }
      });

      if (sliderTextRef.current) {
        gsap.from(sliderTextRef.current, {
          scrollTrigger: {
            trigger: sliderTextRef.current,
            start: "top 80%",
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
        });
      }

      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
          delay: 0.3,
        });
      }

      paraRefs.current.forEach((ref) => {
        if (ref) {
          gsap.from(ref, {
            scrollTrigger: {
              trigger: ref,
              start: "top 85%",
            },
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 0.2,
            ease: "power2.out",
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Nav />
      <main className={styles.main}>
        <div
          ref={imageRef}
          style={{
            position: "relative",
            width: "100%",
            height: "120vh",
            overflow: "hidden",
          }}
        >
          <Image
            src="/DigitalMarketing.jpg"
            alt="Top view of digital marketing strategy layout with charts and analytics"
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
            loading="eager"
            priority
            placeholder="blur"
            blurDataURL="/DigitalMarketing.jpg"
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "30%",
              background: "linear-gradient(to top, rgba(0,0,0,1), transparent)",
              pointerEvents: "none",
            }}
          />
        </div>

        <div
          className={styles.sliderContainer}
          ref={sliderTextRef}
          style={{ fontFamily: "AlberSans-Medium", letterSpacing: "-1px" }}
        >
          <div className={styles.slider} ref={slider}>
            <p className={styles.text} ref={firstText}>
              Digital Marketing -{" "}
            </p>
            <p className={styles.text} ref={secondText}>
              Digital Marketing -
            </p>
          </div>
        </div>
      </main>
      <section className="relative text-white py-20 bg-gradient-to-b from-black via-black to-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row w-[90%] items-start justify-between gap-20">
          <h2
            ref={(el) => {
              headingRefs.current[0] = el;
            }}
            className="text-lg md:text-xl font-semibold"
          >
            Where Strategy
            <br />
            Meets Visibility
          </h2>

          <div
            ref={(el) => {
              paraRefs.current[0] = el;
            }}
            className="md:w-3/5 text-2xl font-light leading-relaxed"
          >
            <p>
              At OceviaLab, we craft marketing strategies that captivate,
              convert, and create lasting connections. From brand positioning to
              performance ads, we tailor every campaign to elevate your digital
              presence and make your voice heard.
            </p>
          </div>
        </div>
      </section>
      <hr className="border-t-20 border-gray-800 w-[90%] mx-auto bg-black/75" />
      <section className="min-h-content text-white px-6 md:px-20 py-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3">
            <div className="text-sm tracking-widest font-bold uppercase">
              What we offer
            </div>
          </div>

          <div className="md:w-2/3 flex flex-col">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => toggleOpen(index)}
                className="relative group border-t border-white/10 pt-6 pb-6 cursor-pointer overflow-hidden transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />
                <div className="relative z-10">
                  <h2
                    ref={(el) => {
                      headingRefs.current[index + 1] = el;
                    }}
                    className="text-2xl md:text-3xl font-semibold flex justify-between items-center"
                  >
                    <span className="transform transition-transform duration-200 group-hover:translate-x-4">
                      {service.title}
                    </span>
                    <span className="text-white text-xl">
                      {openStates[index] ? "–" : "+"}
                    </span>
                  </h2>

                  <div
                    className={`overflow-hidden transition-all duration-200 ease-in-out ${
                      openStates[index]
                        ? "max-h-screen opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p
                      ref={(el) => {
                        paraRefs.current[index + 1] = el;
                      }}
                      className="text-white/70 mt-4 text-base font-light leading-relaxed"
                    >
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <hr className="border-t-20 border-gray-800 w-[90%] mx-auto bg-black/75" />
      <section className="min-h-content text-white px-6 md:px-20 py-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3">
            <div className="text-sm tracking-widest font-bold uppercase">
              The story unfolds beneath this line.
            </div>
          </div>
        </div>
      </section>
      <hr className="border-t-20 border-gray-800 w-[90%] mx-auto bg-black/75" />
      {/* 
      <section className="bg-black py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-lg shadow-md h-[600px] w-full"></div>
          ))}
        </div>
      </section> */}
      <CustomCursor hovering={hovering} />
      <div className="max-w-7xl pt-20 pb-20 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 cursor-none bg-[#050505]">
        {worksData
          .filter((item: WorkItem) => item.tag.includes(filteredTag))
          .map((item: WorkItem, index: number) => (
            <motion.div
              key={item.id}
              className="flex flex-col justify-center items-center w-full max-w-[410px] mx-auto transition-transform duration-150 cursor-none"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
            >
              {/* Card with Image */}
              <div
                id={`card-${index}`}
                className="rounded-md shadow-md overflow-hidden w-fit flex flex-col transition-transform duration-150 cursor-none"
              >
                <div
                  className="relative cursor-none hover:scale-105 transition-transform duration-450"
                  onClick={() => handleImageClick(item.imgPor, item.id)}
                >
                  <Image
                    src={item.imgPor}
                    alt={item.name}
                    width={400}
                    height={600}
                    className="object-cover cursor-none"
                    loading="eager"
                    priority
                    placeholder="blur"
                    blurDataURL={item.imgPor}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-100">
                    <div className="text-black text-2xl font-bold cursor-none h-12 w-12 bg-white rounded-full text-center flex justify-center items-center">
                      <span className="text-lg">+</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
      </div>

      <Footer
        bgColorBottom="#3b82f6"
        bgColorMid="#0a0a0a"
        bgColorTop="#050505"
      />
    </>
  );
};

export default Page;
