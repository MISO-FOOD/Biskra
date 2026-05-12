import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Leaf, CalendarDays, ThumbsUp } from "lucide-react";
import chefImg from "@assets/a77c8fc4-4957-4602-9b9f-f215cb730697_1778559466661.png";

const slides = [
  {
    id: 1,
    badge: "NOUVEAU",
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
    badge: "BEST",
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
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <div className="relative overflow-hidden px-4 mb-2 max-w-[480px] w-full mx-auto" style={{ minHeight: 280 }}>
      {/* Background Texture Container */}
      <div className="absolute inset-0 mx-4 bg-[#FFC107] rounded-3xl overflow-hidden shadow-sm">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)',
          backgroundPosition: '0 0, 10px 10px',
          backgroundSize: '20px 20px'
        }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="relative h-full flex pt-5 pb-8 px-2 z-10"
        >
          {/* Left: Chef Character (Floating) */}
          <motion.div 
            className="w-[45%] flex items-end justify-start relative -bottom-2 -ml-2"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <img
              src={chefImg}
              alt="Miso Chef"
              className="w-full h-auto object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)] scale-[1.15] origin-bottom-left"
            />
            <div className="absolute -top-1 -right-2 bg-black text-white text-[10px] font-black px-2 py-1 rounded-md rotate-[12deg] shadow-md z-20">
              {slide.badge}
            </div>
          </motion.div>

          {/* Right Content Area */}
          <div className="w-[55%] flex flex-col justify-center pl-2 relative z-10">
            {/* Title */}
            <div className="leading-[0.85] mb-2 drop-shadow-md">
              <div className="text-4xl font-black text-black uppercase tracking-tighter">{slide.title1}</div>
              <div className="text-4xl font-black text-[#DC2626] italic uppercase tracking-tighter">{slide.title2}</div>
            </div>

            {/* Tagline */}
            <p className="text-[#DC2626] font-black text-sm mb-3 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]" style={{ textShadow: '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff' }}>
              {slide.tagline}
            </p>

            {/* Mini Images Stack */}
            <div className="flex gap-2 mb-3">
              {slide.items.map((item, idx) => (
                <div key={idx} className="relative w-14 h-14 rounded-xl overflow-hidden shadow-lg border-2 border-white rotate-[2deg] hover:rotate-0 transition-transform duration-300">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-[#DC2626]/90 px-1 py-0.5 text-center">
                    <span className="text-white text-[8px] font-black block truncate">{item.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Pills */}
            <div className="flex flex-col gap-1.5 mb-4">
              <div className="flex items-center gap-1 text-[10px] font-bold text-black bg-white/50 w-fit px-2 py-0.5 rounded-full backdrop-blur-sm">
                <Leaf className="w-3 h-3 text-[#DC2626]" /> مكونات طازجة
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-1 text-[10px] font-bold text-black bg-white/50 w-fit px-2 py-0.5 rounded-full backdrop-blur-sm">
                  <CalendarDays className="w-3 h-3 text-[#DC2626]" /> كل يوم طازج
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-black bg-white/50 w-fit px-2 py-0.5 rounded-full backdrop-blur-sm">
                  <ThumbsUp className="w-3 h-3 text-[#DC2626]" /> لا يُقاوم
                </div>
              </div>
            </div>

            {/* CTA */}
            <button className="flex items-center gap-2 bg-black text-white font-black text-xs px-5 py-2.5 rounded-xl w-fit shadow-xl hover:bg-gray-800 active:scale-95 transition-all">
              <span>استكشف الآن</span>
              <ArrowLeft className="w-3 h-3" strokeWidth={3} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-[#DC2626]" : "w-2 h-2 bg-white/80"}`}
          />
        ))}
      </div>
    </div>
  );
}
