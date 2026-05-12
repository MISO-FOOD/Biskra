import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  { id: 1, src: "/hero1.png", alt: "قائمة الأسعار - ميسو فود" },
  { id: 2, src: "/hero2.png", alt: "ميسو ساندويش - الجديد" },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const slide = slides[current] ?? slides[0];

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative mx-4 mb-3 rounded-[20px] overflow-hidden shadow-xl" style={{ minHeight: 160 }}>
      <AnimatePresence mode="wait">
        <motion.img
          key={slide.id}
          src={slide.src}
          alt={slide.alt}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full h-auto object-cover block"
          draggable={false}
        />
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? "w-7 h-2 bg-[#DC2626] shadow-sm" : "w-2 h-2 bg-white/80"}`}
          />
        ))}
      </div>
    </div>
  );
}
