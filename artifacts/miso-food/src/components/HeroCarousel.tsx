import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  { id: 1, src: "/hero1.png", alt: "ميسو ساندويش" },
  { id: 2, src: "/hero2.png", alt: "قائمة الأسعار" },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setDir(1);
      setCurrent((c) => (c + 1) % slides.length);
    }, 4500);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timer.current) clearInterval(timer.current); };
  }, []);

  const goTo = (i: number) => {
    if (i === current) return;
    setDir(i > current ? 1 : -1);
    setCurrent(i);
    startTimer();
  };

  const slide = slides[current]!;

  return (
    <div className="mx-4 mb-3 rounded-[20px] overflow-hidden shadow-xl bg-[#FFC107]" style={{ position: "relative" }}>
      <div style={{ position: "relative", width: "100%", paddingBottom: "43%" }}>
        <AnimatePresence initial={false} custom={dir}>
          <motion.img
            key={slide.id}
            src={slide.src}
            alt={slide.alt}
            custom={dir}
            variants={{
              enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%" }),
              center: { x: 0 },
              exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%" }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: "easeInOut" }}
            draggable={false}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6, zIndex: 20 }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              borderRadius: 9999,
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s",
              width: i === current ? 28 : 8,
              height: 8,
              background: i === current ? "#DC2626" : "rgba(255,255,255,0.85)",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
