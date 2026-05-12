import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import type { MenuItem, Category } from "@/data/menu";
import { MENU_ITEMS } from "@/data/menu";

interface MenuGridProps {
  category: Category;
}

function MenuCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();

  return (
    <motion.div
      data-testid={`menu-card-${item.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col"
    >
      {/* Image */}
      <div className="relative bg-[#FFF3CD]" style={{ height: 110 }}>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        {/* Red brush name tag */}
        <div className="absolute bottom-0 inset-x-0 bg-[#DC2626] px-2 py-1">
          <span className="text-white text-[11px] font-black leading-tight block text-center">{item.name}</span>
        </div>
      </div>

      {/* Price + Add */}
      <div className="flex items-center justify-between px-2 py-2 gap-1">
        <span className="text-[13px] font-black text-black whitespace-nowrap">{item.price} دج</span>
        <button
          data-testid={`add-${item.id}`}
          onClick={() => addItem(item)}
          className="flex items-center gap-1 bg-[#FFC107] text-black text-[11px] font-black px-2 py-1.5 rounded-lg active:scale-95 transition-transform shadow-sm"
        >
          <span>إضافة</span>
          <Plus size={12} className="shrink-0" />
        </button>
      </div>
    </motion.div>
  );
}

export default function MenuGrid({ category }: MenuGridProps) {
  const items = MENU_ITEMS.filter((m) => m.category === category);

  return (
    <div className="px-3 pb-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-black text-black">
          {category === "sandwiches" && "السانويشات"}
          {category === "specials" && "العروض"}
          {category === "drinks" && "المشروبات"}
          {category === "extras" && "الإضافات"}
        </h2>
        <button className="flex items-center gap-1 text-[#DC2626] text-xs font-bold" data-testid="view-all">
          <span>عرض الكل</span>
          <span className="text-base leading-none">&#8592;</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {items.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
