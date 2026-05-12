import { Flame, Plus } from "lucide-react";
import type { Category } from "@/data/menu";
import { CATEGORIES } from "@/data/menu";

interface CategoryTabsProps {
  active: Category;
  onChange: (cat: Category) => void;
}

function BurgerIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16" /><path d="M4 10h16" />
      <path d="M4 14h16" /><path d="M4 18h16" />
    </svg>
  );
}

function DrinkIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2h8l-1 7H9L8 2z" />
      <path d="M9 9c0 5 6 5 6 10" />
      <path d="M8 19h8" />
      <path d="M7 22h10" />
    </svg>
  );
}

const ICONS: Record<string, React.ReactNode> = {
  burger: <BurgerIcon size={22} />,
  fire: <Flame size={22} />,
  drink: <DrinkIcon size={22} />,
  plus: <Plus size={22} />,
};

export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 px-3 py-3 bg-white overflow-x-auto no-scrollbar">
      {CATEGORIES.map((cat) => {
        const isActive = cat.id === active;
        return (
          <button
            key={cat.id}
            data-testid={`category-${cat.id}`}
            onClick={() => onChange(cat.id)}
            className={`flex flex-col items-center gap-1 flex-1 min-w-[68px] py-2 px-2 rounded-xl border-2 transition-all ${
              isActive
                ? "bg-[#FFC107] border-[#FFC107] text-black shadow-md"
                : "bg-white border-gray-100 text-gray-500"
            }`}
          >
            <span className={isActive ? "text-black" : "text-gray-400"}>{ICONS[cat.icon]}</span>
            <span className="text-[11px] font-black leading-none">{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
