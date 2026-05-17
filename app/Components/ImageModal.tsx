"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, imageUrl }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-start z-50"
          initial={{ opacity: 0 }} // Start hidden
          animate={{ opacity: 1 }} // Fade in
          exit={{ opacity: 0 }} // Fade out
          transition={{ duration: 1 }} // Smooth transition
        >
          <motion.div
            className="relative p-4 max-w-3xl"
            initial={{ scale: 0.8, x: 0 }} // Start small
            animate={{ scale: 1, x: 100 }} // Expand smoothly
            exit={{ scale: 0.8, x: -100 }} // Shrink when closing
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <Image
              src={imageUrl}
              alt="Enlarged Image"
              width={400}
              height={200}
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;
