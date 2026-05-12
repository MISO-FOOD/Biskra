import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  { id: 1, src: "/hero1.png", alt: "قائمة الأسعار - ميسو فود" },
  { id: 2, src: "/hero2.png", alt: "ميسو ساندويش - الجديد" },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number) => {
    if (index === current) return;
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, 4000);
  };

  const advance = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % slides.length);
  };

  useEffect(() => {
    timerRef.current = setInterval(advance, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="mx-4 mb-3 rounded-[20px] overflow-hidden shadow-xl relative bg-[#FFC107]">
      {/* Fixed-height stage so images don't cause layout jumps */}
      <div className="relative w-full overflow-hidden" style={{ height: 170 }}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={current}
            src={slides[current].src}
            alt={slides[current].alt}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-contain"
            draggable={false}
          />
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-7 h-2 bg-[#DC2626] shadow-sm" : "w-2 h-2 bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
