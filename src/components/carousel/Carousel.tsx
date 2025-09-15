// components/SimpleCarousel.tsx
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SimpleCarouselProps {
  images: string[];
  interval?: number; // optional auto-slide interval in ms
}

const Carousel: React.FC<SimpleCarouselProps> = ({ images, interval = 5000 }) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));

  // Wrap nextSlide in useCallback
  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
  }, [length]); // The dependency is 'length' because the function relies on it.

  // The useEffect hook now depends on the memoized nextSlide
  useEffect(() => {
    const slider = setInterval(nextSlide, interval);
    return () => clearInterval(slider);
  }, [nextSlide, interval]); 

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.img
          key={current} // important for AnimatePresence
          src={images[current]}
          alt={`Slide ${current + 1}`}
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0, x: 200, scale: 1.05 }} // comes from right
          animate={{ opacity: 1, x: 0, scale: 1 }} // settles in center
          exit={{ opacity: 0, x: -200, scale: 0.95 }} // fades & slides left
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Previous button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 -translate-y-1/2 left-4 bg-white/70 hover:bg-white p-2 rounded-full shadow"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      {/* Next button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 -translate-y-1/2 right-4 bg-white/70 hover:bg-white p-2 rounded-full shadow"
      >
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Carousel;
