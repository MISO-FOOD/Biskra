import { Plus, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import type { MenuItem, Category } from "@/data/menu";
import { MENU_ITEMS, CATEGORIES } from "@/data/menu";

interface MenuGridProps {
  category: Category;
}

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-gray-100/50 flex flex-col hover:shadow-md transition-shadow relative shrink-0 w-[110px]"
    >
      {/* Yellow Image Background */}
      <div className="relative bg-[#FFF9E6] p-2 aspect-square flex items-center justify-center">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded-xl shadow-sm"
        />
      </div>

      <div className="p-2 flex flex-col flex-1">
        {/* Name (2 lines max) */}
        <h3 className="text-[11px] font-black text-black leading-tight mb-1 line-clamp-2 min-h-[26px]">
          {item.name}
        </h3>
        
        {/* Description (if any) */}
        {item.description && (
          <p className="text-[9px] text-gray-500 font-bold leading-tight mb-2 line-clamp-2 min-h-[22px]">
            {item.description}
          </p>
        )}

        <div className="mt-auto pt-1 flex flex-col gap-1.5">
          <span className="text-[13px] font-black text-[#DC2626] text-center w-full block">
            {item.price} دج
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addItem(item);
            }}
            className="w-full flex items-center justify-center gap-1 bg-[#FFC107] text-black text-[11px] font-black py-1.5 rounded-lg active:scale-95 transition-transform"
          >
            <span>إضافة</span>
            <Plus size={12} strokeWidth={3} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function MenuGrid({ category }: MenuGridProps) {
  const items = MENU_ITEMS.filter((m) => m.category === category);
  const catLabel = CATEGORIES.find(c => c.id === category)?.label || "القائمة";

  return (
    <div className="px-4 pb-6 pt-2 bg-white rounded-t-3xl max-w-[480px] mx-auto mt-2">
      <div className="flex items-center justify-between mb-4 mt-2">
        <h2 className="text-lg font-black text-black">{catLabel}</h2>
        <button className="flex items-center gap-1 text-[#DC2626] text-xs font-black bg-red-50 px-2 py-1 rounded-lg hover:bg-red-100 transition-colors">
          <span>عرض الكل</span>
          <ArrowLeft size={12} strokeWidth={3} />
        </button>
      </div>

      {/* Horizontal scroll grid for compact cards */}
      <div className="flex overflow-x-auto gap-3 pb-4 no-scrollbar -mx-4 px-4">
        {items.length > 0 ? (
          items.map((item, i) => (
            <MenuCard key={item.id} item={item} index={i} />
          ))
        ) : (
          <div className="w-full py-10 flex flex-col items-center justify-center text-gray-400">
            <span className="font-bold text-sm">لا توجد عناصر في هذا القسم حالياً</span>
          </div>
        )}
      </div>
    </div>
  );
}
