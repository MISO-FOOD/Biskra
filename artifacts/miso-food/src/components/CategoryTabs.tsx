import { motion } from "framer-motion";
import type { Category } from "@/data/menu";
import { CATEGORIES } from "@/data/menu";

interface CategoryTabsProps {
  active: Category;
  onChange: (cat: Category) => void;
}

const CATEGORY_IMAGES: Record<string, string> = {
  sandwiches: "/cat_sandwiches.png",
  milonj: "/cat_milonj.png",
  extras: "/cat_extras.png",
  drinks: "/cat_drinks.png",
  specials: "/cat_offers.png",
  history: "/cat_new.png",
};

export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="relative px-4 pb-2 w-full max-w-[480px] mx-auto">
      <div className="flex gap-3 overflow-x-auto no-scrollbar py-2" dir="rtl">
        {CATEGORIES.map((cat) => {
          const isActive = cat.id === active;
          const isSpecial = cat.id === "specials";
          const imgSrc = CATEGORY_IMAGES[cat.id];

          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className="relative flex flex-col items-center justify-center gap-1.5 min-w-[68px] shrink-0"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? "bg-[#FFC107] shadow-[0_4px_14px_rgba(255,193,7,0.45)] scale-110"
                    : "bg-white shadow-sm border border-gray-100"
                }`}
              >
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={cat.label}
                    className="w-9 h-9 object-contain drop-shadow-sm"
                  />
                ) : null}

                {isSpecial && (
                  <div className="absolute -top-2 -right-2 bg-[#DC2626] text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-sm rotate-12">
                    جديد
                  </div>
                )}
              </motion.div>

              <span className={`text-[10px] transition-all duration-300 leading-tight text-center ${isActive ? "font-black text-black" : "font-bold text-gray-400"}`}>
                {cat.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute -bottom-1 w-6 h-1 bg-[#FFC107] rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
