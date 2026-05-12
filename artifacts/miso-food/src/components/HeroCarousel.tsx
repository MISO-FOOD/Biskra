import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Leaf, CalendarDays, ThumbsUp } from "lucide-react";
import chefImg from "@assets/a77c8fc4-4957-4602-9b9f-f215cb730697_1778559466661.png";

const slides = [
  {
    id: 1,
    badge: "NOUVEAU",
    badgeBg: "bg-black",
    title1: "MISO",
    title2: "SANDWICH",
    tagline: "فراش ، سخي ، لا يقاوم !",
    items: [
      { name: "مرقاز فيونداشي", img: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=320&q=80" },
      { name: "كبدة شاورما", img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=320&q=80" },
    ],
  },
  {
    id: 2,
    badge: "HOT DEAL",
    badgeBg: "bg-[#DC2626]",
    title1: "MISO",
    title2: "MILONJ",
    tagline: "مزيج خرافي لا ينسى !",
    items: [
      { name: "كبدة ميلونج", img: "https://images.unsplash.com/photo-1554433607-66b5efe9d304?w=320&q=80" },
      { name: "شاورما ميلونج", img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=320&q=80" },
    ],
  },
  {
    id: 3,
    badge: "BEST SELLER",
    badgeBg: "bg-black",
    title1: "MISO",
    title2: "SPECIAL",
    tagline: "طعم ينافس الخيال !",
    items: [
      { name: "فريت فرماج", img: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=320&q=80" },
      { name: "ميسو كومبو", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=320&q=80" },
    ],
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <div className="relative mx-4 mb-3 rounded-[28px] overflow-hidden shadow-xl" style={{ minHeight: 260 }}>
      {/* Yellow Background with diagonal stripes */}
      <div className="absolute inset-0 bg-[#FFC107]">
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diag" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="10" height="20" fill="#000" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diag)" />
        </svg>
        {/* Red corner blobs */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#DC2626] rounded-full opacity-15 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#DC2626] rounded-full opacity-10 blur-2xl" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative flex h-full z-10 p-4 pt-5 pb-10 gap-2"
        >
          {/* Left: Chef Character with float */}
          <motion.div
            className="relative w-[42%] flex items-end justify-start -mb-4 -ml-2"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          >
            <img
              src={chefImg}
              alt="Chef"
              className="w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
              style={{ maxHeight: 230 }}
            />
          </motion.div>

          {/* Right: Content */}
          <div className="flex-1 flex flex-col justify-center gap-1.5">
            {/* Badge */}
            <span className={`self-start ${slide.badgeBg} text-white text-[9px] font-black px-2.5 py-1 rounded-lg tracking-widest shadow-md`}>
              {slide.badge}
            </span>

            {/* Title with brush stroke SVG under SANDWICH */}
            <div className="leading-none">
              <div className="text-[38px] font-black text-black tracking-tighter drop-shadow-[1px_1px_0px_rgba(255,255,255,0.5)]">
                {slide.title1}
              </div>
              <div className="relative inline-block">
                <div className="text-[38px] font-black text-[#DC2626] italic tracking-tighter leading-none">
                  {slide.title2}
                </div>
                {/* Brush stroke underline */}
                <svg className="absolute -bottom-1 right-0 w-full" height="6" viewBox="0 0 120 6" preserveAspectRatio="none">
                  <path d="M0 4 Q30 1 60 4 Q90 7 120 3" stroke="#DC2626" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
                </svg>
              </div>
            </div>

            {/* Tagline */}
            <p
              className="text-[#DC2626] font-black text-[13px] mt-1"
              style={{ textShadow: "1px 1px 0 #fff, -1px 1px 0 #fff, 1px -1px 0 #fff, -1px -1px 0 #fff" }}
            >
              {slide.tagline}
            </p>

            {/* Sandwich thumbnails */}
            <div className="flex gap-1.5 my-1">
              {slide.items.map((item, idx) => (
                <div
                  key={idx}
                  className="relative rounded-xl overflow-hidden shadow-lg border-2 border-white"
                  style={{ width: 58, height: 52 }}
                >
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-[#DC2626]/90 py-0.5 px-1 text-center">
                    <span className="text-white text-[8px] font-black block leading-tight truncate">{item.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-1">
              <span className="flex items-center gap-1 bg-white/60 backdrop-blur-sm text-[10px] font-bold text-black px-2 py-0.5 rounded-full">
                <Leaf size={9} className="text-[#DC2626]" /> طازج
              </span>
              <span className="flex items-center gap-1 bg-white/60 backdrop-blur-sm text-[10px] font-bold text-black px-2 py-0.5 rounded-full">
                <CalendarDays size={9} className="text-[#DC2626]" /> يومياً
              </span>
              <span className="flex items-center gap-1 bg-white/60 backdrop-blur-sm text-[10px] font-bold text-black px-2 py-0.5 rounded-full">
                <ThumbsUp size={9} className="text-[#DC2626]" /> لا يُقاوم
              </span>
            </div>

            {/* CTA */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              className="self-start flex items-center gap-2 bg-black text-white font-black text-[12px] px-4 py-2.5 rounded-xl shadow-lg mt-1"
            >
              <span>استكشف الآن</span>
              <ArrowLeft size={13} strokeWidth={3} />
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? "w-7 h-2 bg-[#DC2626] shadow-sm" : "w-2 h-2 bg-white/70"}`}
          />
        ))}
      </div>
    </div>
  );
}
