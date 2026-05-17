"use client";

import React, { useEffect, useRef } from "react";

const LiveNoise = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const renderNoise = () => {
      if (!ctx) return;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255; // Random grayscale value
        data[i] = value; // R
        data[i + 1] = value; // G
        data[i + 2] = value; // B
        data[i + 3] = 255; // Alpha (fully visible)
      }

      if (ctx) {
        ctx.putImageData(imageData, 0, 0);
      }
      requestAnimationFrame(renderNoise);
    };

    renderNoise();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      style={{ opacity: 0.05 }} // Adjust transparency for subtle effect
    />
  );
};

export default LiveNoise;
