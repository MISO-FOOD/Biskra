import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  { id: 1, src: "/hero1.png", alt: "قائمة الأسعار - ميسو فود" },
  { id: 2, src: "/hero2.png", alt: "ميسو ساندويش - الجديد" },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % slides.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="mx-4 mb-3 rounded-[20px] overflow-hidden shadow-xl relative" style={{ aspectRatio: "16/7" }}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={current}
          src={slides[current].src}
          alt={slides[current].alt}
          custom={direction}
          variants={{
            enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </AnimatePresence>

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
