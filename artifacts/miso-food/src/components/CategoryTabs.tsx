import { Flame, Plus, Clock } from "lucide-react";
import { motion } from "framer-motion";
import type { Category } from "@/data/menu";
import { CATEGORIES } from "@/data/menu";

interface CategoryTabsProps {
  active: Category;
  onChange: (cat: Category) => void;
}

function BurgerIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  );
}

function DoubleBurgerIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18M3 10h18M3 14h18M3 18h18" />
      <path d="M7 6v12M17 6v12" opacity="0.3" />
    </svg>
  );
}

function DrinkIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2h8l-1 7H9L8 2zM9 9c0 5 6 5 6 10M8 19h8M7 22h10" />
    </svg>
  );
}

const ICONS: Record<string, React.ReactNode> = {
  burger: <BurgerIcon size={20} />,
  doubleBurger: <DoubleBurgerIcon size={20} />,
  fire: <Flame size={20} />,
  drink: <DrinkIcon size={20} />,
  plus: <Plus size={20} />,
  clock: <Clock size={20} />
};

export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="relative px-4 pb-2 bg-[#F5F5F5] w-full max-w-[480px] mx-auto">
      <div className="flex gap-3 overflow-x-auto no-scrollbar py-2" dir="rtl">
        {CATEGORIES.map((cat) => {
          const isActive = cat.id === active;
          const isSpecial = cat.id === "specials";

          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className="relative flex flex-col items-center justify-center gap-1.5 min-w-[72px] shrink-0"
            >
              <div 
                className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? "bg-[#FFC107] shadow-[0_4px_12px_rgba(255,193,7,0.4)] scale-110" 
                    : "bg-white shadow-sm hover:bg-gray-50 border border-gray-100"
                }`}
              >
                <div className={isActive ? "text-black" : "text-gray-400"}>
                  {ICONS[cat.icon]}
                </div>
                {isSpecial && (
                  <div className="absolute -top-2 -right-2 bg-[#DC2626] text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-sm transform rotate-12">
                    جديد
                  </div>
                )}
              </div>
              <span className={`text-[11px] mt-1 transition-all duration-300 ${isActive ? "font-black text-black" : "font-bold text-gray-500"}`}>
                {cat.label}
              </span>
              
              {isActive && (
                <motion.div 
                  layoutId="activeTabIndicator"
                  className="absolute -bottom-2 w-8 h-1 bg-[#FFC107] rounded-full"
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
