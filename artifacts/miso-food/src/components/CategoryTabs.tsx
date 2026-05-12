import { Flame, Plus, Clock } from "lucide-react";
import { motion } from "framer-motion";
import type { Category } from "@/data/menu";
import { CATEGORIES } from "@/data/menu";

interface CategoryTabsProps {
  active: Category;
  onChange: (cat: Category) => void;
}

function SandwichIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Top bun */}
      <path d="M4 8 Q12 3 20 8" fill="none" />
      <line x1="4" y1="8" x2="20" y2="8" />
      {/* Lettuce wave */}
      <path d="M3 11 Q6 9.5 9 11 Q12 12.5 15 11 Q18 9.5 21 11" />
      {/* Patty */}
      <rect x="4" y="12.5" width="16" height="2" rx="1" />
      {/* Bottom bun */}
      <path d="M4 16 Q12 20 20 16" fill="none" />
      <line x1="4" y1="16" x2="20" y2="16" />
    </svg>
  );
}

function MilanjIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Top bun */}
      <path d="M3 7 Q7.5 3.5 12 3.5 Q16.5 3.5 21 7" />
      <line x1="3" y1="7" x2="21" y2="7" />
      {/* Layer 1 */}
      <path d="M2 10 Q5.5 8.5 9 10 Q12.5 11.5 16 10 Q19 8.5 22 10" />
      {/* Patty */}
      <rect x="3" y="11.5" width="18" height="2" rx="1" />
      {/* Layer 2 */}
      <path d="M2 14.5 Q5.5 13 9 14.5 Q12.5 16 16 14.5 Q19 13 22 14.5" />
      {/* Bottom bun */}
      <path d="M3 17 Q12 20.5 21 17" />
      <line x1="3" y1="17" x2="21" y2="17" />
    </svg>
  );
}

function DrinkIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Cup */}
      <path d="M6 3h12l-2 16H8L6 3z" />
      {/* Straw */}
      <line x1="14" y1="3" x2="16" y2="-1" />
      <line x1="14" y1="3" x2="14" y2="10" strokeWidth="2.5" />
      {/* Lid */}
      <path d="M5 5h14" />
      {/* Bubbles */}
      <circle cx="10" cy="10" r="1" fill="currentColor" />
      <circle cx="14" cy="13" r="1" fill="currentColor" />
    </svg>
  );
}

function ExtrasIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Fork */}
      <line x1="8" y1="3" x2="8" y2="21" />
      <path d="M6 3v5a2 2 0 0 0 4 0V3" />
      {/* Knife */}
      <line x1="16" y1="3" x2="16" y2="21" />
      <path d="M16 3l3 6-3 1" />
    </svg>
  );
}

const ICONS: Record<string, React.ReactNode> = {
  burger: <SandwichIcon size={22} />,
  doubleBurger: <MilanjIcon size={22} />,
  fire: <Flame size={22} />,
  drink: <DrinkIcon size={22} />,
  plus: <ExtrasIcon size={22} />,
  clock: <Clock size={22} />
};

export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="relative px-4 pb-2 w-full max-w-[480px] mx-auto">
      <div className="flex gap-3 overflow-x-auto no-scrollbar py-2" dir="rtl">
        {CATEGORIES.map((cat) => {
          const isActive = cat.id === active;
          const isSpecial = cat.id === "specials";

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
                <div className={isActive ? "text-black" : "text-gray-400"}>
                  {ICONS[cat.icon]}
                </div>
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
