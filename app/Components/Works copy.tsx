import React, { useState } from "react";
import worksData from "../../public/assets/data/worksData.js";
import Image from "next/image";
import CustomCursor from "./CustomCursor";
import { useRouter } from "next/navigation";
import ImageModal from "./ImageModal";

interface WorkItem {
  id: number;
  name: string;
  textOverlay: string;
  imgPor: string;
}

interface WorksProps {
  bgcolor: string;
  setNavigationAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}

const Works: React.FC<WorksProps> = ({ bgcolor, setNavigationAnimation }) => {
  // ... existing state and handlers ...
  const [hovering, setHovering] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();
  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    const card = document.getElementById(`card-${index}`);
    if (!card) return;

    const image = card.querySelector(".card-image") as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 20;
    const rotateY = ((x - centerX) / centerX) * -20;

    requestAnimationFrame(() => {
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      if (image) {
        image.style.transform = `translateZ(60px) scale(1.3)`;
      }
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = document.getElementById(`card-${index}`);
    if (!card) return;

    const image = card.querySelector(".card-image") as HTMLElement;
    requestAnimationFrame(() => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
      if (image) {
        image.style.transform = `translateZ(0px) scale(1)`;
      }
    });
    setHovering(false); // Hide cursor
  };

  const handleImageClick = (imageUrl: string, projectId: number) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
    setTimeout(() => {
      setNavigationAnimation(true);
    }, 1000);

    setTimeout(() => {
      router.push(`/projects/${projectId}`);
    }, 1000);
  };

  const handleMouseEnter = () => setHovering(true); // Show cursor
  return (
    <div
      className={`relative w-screen min-h-screen flex items-center justify-center p-4 md:p-8 lg:p-12 ${bgcolor}`}
    >
      <CustomCursor hovering={hovering} />

      {/* Image Modal */}
      <ImageModal
        isOpen={modalOpen}
        imageUrl={selectedImage || ""}
        onClose={() => setModalOpen(false)}
      />

      <div className="w-full max-w-[1920px] grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-12">
        {worksData.map((item: WorkItem, index: number) => (
          <div
            key={item.id}
            id={`card-${index}`}
            className="w-full max-w-[410px] mx-auto rounded-md shadow-md p-2 md:p-4 lg:p-6 bg-[#0a0a0a] flex flex-col transition-transform duration-150 items-center"
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => handleMouseLeave(index)}
            onMouseEnter={handleMouseEnter}
            style={{
              transformStyle: "preserve-3d",
              transition: "transform 0.15s ease-out",
            }}
          >
            <div
              className="card-image-wrapper w-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              <h3 className="text-base md:text-lg lg:text-xl text-white font-bold mb-2">
                {item.name}
              </h3>
              <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6">
                {item.textOverlay}
              </p>

              {/* Responsive image container */}
              <div className="relative aspect-square w-full">
                <Image
                  src={item.imgPor}
                  alt="img"
                  fill
                  className="card-image object-cover transition-transform duration-150 rounded cursor-none"
                  onClick={() => handleImageClick(item.imgPor, item.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;
