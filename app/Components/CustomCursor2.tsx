"use client";

import React, { useEffect, useState } from "react";

interface CursorProps {
  hovering: boolean;
}

const CustomCursor2: React.FC<CursorProps> = ({ hovering }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-20 h-20 rounded-full flex items-center justify-center
        pointer-events-none transition-transform duration-150
        border-2 border-white/80 bg-[#f3f3f3] bg-opacity-5  bg-blend-saturation cursor-none
        ${hovering ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
      style={{
        transform: `translate(${position.x - 40}px, ${position.y - 40}px)`,
        zIndex: 50,
      }}
    >
      <span className="text-white/80 text-xl leading-none text-center font-light">
        View
      </span>
    </div>
  );
};

export default CustomCursor2;
