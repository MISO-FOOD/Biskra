import { useState } from "react";
import { Plus, Star, Flame, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { MENU_ITEMS } from "@/data/menu";
import type { MenuItem } from "@/data/menu";

function PopularCard({ item, index }: { item: MenuItem; index: number }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className="flex-shrink-0 w-[150px] bg-white rounded-2xl overflow-hidden shadow-[0_2px_14px_rgba(0,0,0,0.07)] border border-gray-50"
    >
      <div className="relative bg-[#FFF9E6]" style={{ height: 100 }}>
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        {item.isPopular && (
          <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-[#DC2626] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
            <Flame size={8} fill="white" />
            <span>رقم 1</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <div className="p-2.5">
        {item.rating && (
          <div className="flex items-center gap-1 mb-1">
            <Star size={10} fill="#FFC107" className="text-[#FFC107]" />
            <span className="text-[10px] font-black">{item.rating}</span>
          </div>
        )}
        <h4 className="text-[12px] font-black text-black leading-tight mb-1.5 line-clamp-1">{item.name}</h4>
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-black text-[#DC2626]">{item.price}<span className="text-[10px]"> دج</span></span>
          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.85 }}
            animate={added ? { scale: [1, 1.2, 1] } : {}}
            className={`w-7 h-7 rounded-lg flex items-center justify-center shadow-sm transition-colors ${added ? "bg-green-500" : "bg-[#FFC107]"}`}
          >
            <Plus size={14} strokeWidth={3} className={added ? "text-white" : "text-black"} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function PopularSection() {
  const popular = MENU_ITEMS.filter((m) => m.isPopular);

  return (
    <div className="max-w-[480px] mx-auto w-full px-4 pb-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#DC2626] rounded-xl flex items-center justify-center">
            <TrendingUp size={14} className="text-white" strokeWidth={2.5} />
          </div>
          <h2 className="text-base font-black text-black">الأكثر طلباً</h2>
        </div>
        <button className="text-xs font-black text-[#DC2626] bg-red-50 hover:bg-red-100 transition-colors px-3 py-1.5 rounded-xl">
          عرض الكل
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
        {popular.map((item, i) => (
          <PopularCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}
