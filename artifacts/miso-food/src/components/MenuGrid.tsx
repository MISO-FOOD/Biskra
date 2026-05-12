import { useState } from "react";
import { Plus, Flame, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import type { MenuItem, Category } from "@/data/menu";
import { MENU_ITEMS, CATEGORIES } from "@/data/menu";

interface MenuGridProps {
  category: Category;
}

function SpicyDots({ level }: { level: number }) {
  if (!level) return null;
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3].map((i) => (
        <Flame
          key={i}
          size={9}
          className={i <= level ? "text-[#DC2626]" : "text-gray-200"}
          fill={i <= level ? "#DC2626" : "transparent"}
        />
      ))}
    </div>
  );
}

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: "easeOut" }}
      data-testid={`menu-card-${item.id}`}
      className="bg-white rounded-3xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.08)] flex flex-col relative group"
    >
      {/* Badges */}
      <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1 items-end">
        {item.isPopular && (
          <span className="bg-[#DC2626] text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-md">
            الأكثر طلباً
          </span>
        )}
        {item.isNew && (
          <span className="bg-black text-[#FFC107] text-[9px] font-black px-2 py-0.5 rounded-full shadow-md">
            جديد
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#FFF9E6] to-[#FFF3C4]" style={{ height: 130 }}>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1 gap-1.5">
        {/* Spicy level row */}
        {item.spicy !== undefined && item.spicy > 0 && (
          <div className="flex items-center justify-end">
            <SpicyDots level={item.spicy} />
          </div>
        )}

        <h3 className="text-[13px] font-black text-black leading-tight line-clamp-1">{item.name}</h3>

        {item.description && (
          <p className="text-[10px] text-gray-500 font-bold leading-tight line-clamp-2">{item.description}</p>
        )}

        {/* Price + Add */}
        <div className="mt-auto pt-1.5 flex items-center justify-between gap-2">
          <span className="text-[15px] font-black text-[#DC2626] leading-none">{item.price} <span className="text-[11px]">دج</span></span>
          <motion.button
            data-testid={`add-${item.id}`}
            onClick={handleAdd}
            whileTap={{ scale: 0.88 }}
            animate={added ? { scale: [1, 1.18, 1] } : {}}
            className={`flex items-center gap-1 px-3 py-2 rounded-xl text-[12px] font-black transition-all duration-200 shadow-sm ${
              added
                ? "bg-green-500 text-white"
                : "bg-[#FFC107] text-black hover:bg-amber-400 active:bg-amber-500"
            }`}
          >
            {added ? (
              <span>تمت الإضافة</span>
            ) : (
              <>
                <span>إضافة</span>
                <Plus size={13} strokeWidth={3} />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function MenuGrid({ category }: MenuGridProps) {
  const items = MENU_ITEMS.filter((m) => m.category === category);
  const catLabel = CATEGORIES.find((c) => c.id === category)?.label ?? "القائمة";

  return (
    <div className="px-4 pb-6 pt-3 max-w-[480px] mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-black text-black">{catLabel}</h2>
        <button
          data-testid="view-all"
          className="flex items-center gap-1 text-[#DC2626] text-xs font-black bg-red-50 hover:bg-red-100 transition-colors px-3 py-1.5 rounded-xl"
        >
          <span>عرض الكل</span>
          <ArrowLeft size={12} strokeWidth={3} />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-2 gap-3"
        >
          {items.length > 0 ? (
            items.map((item, i) => (
              <MenuCard key={item.id} item={item} index={i} />
            ))
          ) : (
            <div className="col-span-2 py-16 flex flex-col items-center justify-center text-gray-400">
              <span className="font-bold text-sm">لا توجد عناصر في هذا القسم حالياً</span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
