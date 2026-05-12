import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import characterImg from "@assets/9234fbd5-e674-4351-b2f4-5fa668766ba7_1778558095088.png";

const slides = [
  {
    id: 1,
    badge: "NOUVEAU",
    title1: "MISO",
    title2: "SANDWICH",
    tagline: "فراش ، سخي ، لا يقاوم !",
    items: [
      { name: "مرقاز فيونداشي", img: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=320&q=80" },
      { name: "كبدة فيونداشي", img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=320&q=80" },
    ],
  },
  {
    id: 2,
    badge: "SPECIAL",
    title1: "MISO",
    title2: "CHAWARMA",
    tagline: "طازج ، لذيذ ، ممتاز !",
    items: [
      { name: "شاورما فيونداشي", img: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=320&q=80" },
      { name: "مرقاز شاورما", img: "https://images.unsplash.com/photo-1554433607-66b5efe9d304?w=320&q=80" },
    ],
  },
  {
    id: 3,
    badge: "BEST SELLER",
    title1: "MISO",
    title2: "KBDA",
    tagline: "أصيل ، مشوي ، لا مثيل له !",
    items: [
      { name: "كبدة شاورما", img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=320&q=80" },
      { name: "كبدة فيونداشي", img: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=320&q=80" },
    ],
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <div className="relative bg-[#FFC107] overflow-hidden" style={{ minHeight: 220 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
          className="flex items-end px-3 pt-3 pb-6 gap-2"
        >
          {/* Left: Character */}
          <div className="relative shrink-0" style={{ width: 90 }}>
            <img
              src={characterImg}
              alt="Chef"
              className="object-contain w-full drop-shadow-xl"
              style={{ height: 180, marginBottom: -8 }}
            />
          </div>

          {/* Center: Text */}
          <div className="flex-1 flex flex-col justify-center pb-2">
            <span className="inline-block bg-black text-white text-[10px] font-black px-2 py-0.5 rounded mb-1 self-start tracking-widest">
              {slide.badge}
            </span>
            <div className="font-black leading-none">
              <div className="text-4xl text-black tracking-tight">{slide.title1}</div>
              <div className="text-4xl text-[#DC2626] tracking-tight">{slide.title2}</div>
            </div>
            <p className="text-black font-bold text-sm mt-1 mb-3">{slide.tagline}</p>
            <a
              href="tel:0793149538"
              data-testid="hero-cta"
              className="inline-flex items-center gap-2 bg-[#DC2626] text-white font-black text-sm px-4 py-2 rounded-full shadow-lg self-start active:scale-95 transition-transform"
            >
              <span>اطلب الآن</span>
              <span className="text-xs opacity-80">توصيل سريع</span>
            </a>
          </div>

          {/* Right: Sandwich images */}
          <div className="shrink-0 flex flex-col gap-2" style={{ width: 120 }}>
            {slide.items.map((item) => (
              <div key={item.name} className="relative rounded-xl overflow-hidden shadow-lg" style={{ height: 80 }}>
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-1">
                  <span className="text-white text-[10px] font-black leading-none">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            data-testid={`carousel-dot-${i}`}
            className={`rounded-full transition-all ${i === current ? "w-4 h-2 bg-[#DC2626]" : "w-2 h-2 bg-black/30"}`}
          />
        ))}
      </div>
    </div>
  );
}
