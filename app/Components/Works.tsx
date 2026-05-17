"use client";

import React, { useState } from "react";
import worksData from "../../public/assets/data/worksData.js";
import Image from "next/image";
import CustomCursor from "./CustomCursor";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface WorkItem {
  id: number;
  name: string;
  textOverlay: string;
  imgPor: string;
}

const Works: React.FC = () => {
  const [hovering, setHovering] = useState(false);
  const router = useRouter();

  const handleImageClick = (img: string, id: number) => {
    setHovering(false);
    router.push(`/projects/${id}`);
  };
  const [isLoading, setIsLoading] = useState(true); // Moved inside map
  return (
    <>
      <div className="relative w-screen min-h-screen flex items-center justify-center py-4 px-4 md:px-8 md:py-8 lg:px-12 lg:py-12 bg-[#050505] bg-cover bg-center">
        <CustomCursor hovering={hovering} />

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 cursor-none">
          {worksData.map((item: WorkItem, index: number) => {
            return (
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
                <div
                  id={`card-${index}`}
                  className="rounded-md shadow-md overflow-hidden w-fit flex flex-col transition-transform duration-150 cursor-none"
                >
                  <div
                    className="relative cursor-none hover:scale-105 transition-transform duration-450"
                    onClick={() => handleImageClick(item.imgPor, item.id)}
                  >
                    {/* Spinner overlay */}
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-30 z-10">
                        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}

                    {/* Image with lazy loading */}
                    <Image
                      src={item.imgPor}
                      alt={item.name}
                      width={400}
                      height={600}
                      loading="lazy"
                      onLoad={() => setIsLoading(false)}
                      className={`object-cover cursor-none transition-opacity duration-300 ${
                        isLoading ? "opacity-0" : "opacity-100"
                      }`}
                    />

                    {/* Overlay + Icon */}
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-100 z-20">
                      <div className="text-black text-2xl font-bold cursor-none h-12 w-12 bg-white rounded-full text-center flex justify-center items-center">
                        <span className="text-lg">+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Works;
