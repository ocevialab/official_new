import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CustomCursor({ isHovering }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateCursor = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", updateCursor);
        return () => window.removeEventListener("mousemove", updateCursor);
    }, []);

    return (
        <motion.div
            className="fixed w-12 h-12 border-2 border-white rounded-full pointer-events-none z-50"
            animate={{
                x: position.x - 24, // Offset to center the circle
                y: position.y - 24,
                opacity: isHovering ? 1 : 0, // Hide when not hovering
                scale: isHovering ? 1 : 0.5,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
    );
}
