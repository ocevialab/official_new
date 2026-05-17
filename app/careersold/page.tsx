"use client";

import React, { useRef } from "react";
import bg from "../asserts/Lbg2.jpg";
import bg2 from "../asserts/careerBg5.png";
import Image from "next/image";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import vacancyData from "./vacancyData";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { motion, useScroll, useTransform } from "framer-motion";

const CareersPage = () => {
  const title = "Careers";

  const containerRef = useRef(null);
  const cardSectionRef = useRef(null);

  // Scroll progress for first section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scroll progress for card section
  const { scrollYProgress: cardScrollYProgress } = useScroll({
    target: cardSectionRef,
    offset: ["start start", "end end"],
  });

  // Create parallax transforms
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const yParagraph = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const ySpirit = useTransform(scrollYProgress, [0, 1], [0, -450]);

  // Parallax for cards (small gentle upward move)
  const yCards = useTransform(cardScrollYProgress, [0, 1], [0, -100]);

  return (
    <>
      <Nav />

      {/* First Section */}
      <motion.div
        ref={containerRef}
        className="relative bg-[#050505] md:w-screen h-screen md:h-fit"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src={bg}
          alt="bg image"
          layout="cover"
          objectFit="fill"
          className="opacity-80 relative -top-40"
        />

        <motion.div
          style={{ y: yTitle }}
          className="w-fit h-screen flex justify-center pt-20 md:pl-16 items-end md:items-end absolute top-24 md:top-0"
        >
          <div className="text-5xl w-full h-fit md:text-[100px] lg:text-[220px] font-Mokoto text-start text-text justify-start flex items-start md:mb-20">
            {title.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          style={{ y: yParagraph }}
          className="w-fit h-screen px-8 md:px-24 text-2xl md:text-4xl lg:text-5xl text-white"
        >
          <span className="text-blue-500 inline-block">
            This is OceviaLab -
          </span>
          . In our team of eighteen, creativity meets purpose, and modern ideas
          blend seamlessly with timeless vision. We’re not just a team; we’re a
          platform for bold thinkers and innovative doers. Living at the pulse
          of the digital world, we thrive on redefining what’s possible. That’s
          why our partners trust us to elevate their brands, build stunning
          websites, and craft campaigns that leave an impression. We don’t just
          follow trends—we create them.
        </motion.div>
      </motion.div>

      {/* Card Section */}
      <div
        ref={cardSectionRef}
        className="relative bg-[#050505] md:w-screen h-screen md:h-fit"
      >
        <Image
          src={bg2}
          alt="bg image"
          layout="cover"
          objectFit="fill"
          className="opacity-80 "
        />

        <motion.div
          style={{ y: ySpirit }}
          className="w-fit h-fit p-8 md:p-24 text-2xl md:text-4xl lg:text-5xl text-white absolute top-8 "
        >
          <span className="text-blue-500 inline-block">
            Our Spirit -
          </span>
          . At OceviaLab, we don’t just follow the rules—we write our own. You
          won’t catch us in suits; we measure passion, not papers. Your
          creativity counts more than any credential. We don’t fit into boxes;
          we think outside of them. As a team, we aren’t just building
          websites—we’re shaping the digital landscape of tomorrow, today.
        </motion.div>

        {/* Cards with parallax */}
        <motion.div
          style={{ y: yCards }}
          className="flex flex-wrap gap-8 justify-center p-4 md:p-24  absolute top-40"
        >
          {vacancyData.map((vacancy) => (
            <div
              key={vacancy.id}
              className="md:w-[420px] w-[200px] border-2 border-slate-500 flex flex-col items-start justify-between gap-2 md:gap-6 p-2 md:p-8 rounded-lg text-text 
              transition-colors duration-700 ease-in-out hover:bg-slate-500 hover:text-white"
            >
              <h2 className="text-2xl md:text-4xl lg:text-6xl text-wrap text-start font-light inline-block">
                {vacancy.title}
              </h2>
              <div className="w-full h-fit flex justify-end">
                <IoArrowForwardCircleOutline className="text-2xl md:text-6xl -rotate-45" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* <Footer bgColor="bg-gradient-to-t from-[#1e222b] via-[#1B4453] to-[#1B4453]" /> */}
      <Footer
        bgColorBottom="#1e222b"
        bgColorMid="#163F4F"
        bgColorTop="#163F4F"
      />
    </>
  );
};

export default CareersPage;
