import { useState } from "react";
import { Plus, Flame, TrendingUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { MENU_ITEMS, SIZE_LABELS } from "@/data/menu";
import type { MenuItem, SizeKey } from "@/data/menu";

function MiniSizePicker({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState<SizeKey | null>(null);
  const sizes = item.sizes!;
  const sizeEntries = (Object.entries(sizes) as [SizeKey, number][]).filter(([, v]) => v !== undefined);

  const handlePick = (size: SizeKey, price: number) => {
    addItem(item, size, price);
    setAdded(size);
    setTimeout(() => { setAdded(null); onClose(); }, 700);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="absolute inset-0 bg-white rounded-2xl z-20 p-2.5 flex flex-col shadow-xl"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-black text-black">اختر الحجم</span>
        <button onClick={onClose} className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
          <ChevronDown size={10} strokeWidth={3} className="text-gray-500" />
        </button>
      </div>
      <div className="flex flex-col gap-1 flex-1 justify-center">
        {sizeEntries.map(([size, price]) => (
          <motion.button
            key={size}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePick(size, price)}
            className={`flex justify-between items-center px-2 py-1.5 rounded-lg text-[11px] font-black border-2 transition-all ${
              added === size
                ? "bg-green-500 border-green-500 text-white"
                : "bg-[#FFC107]/10 border-[#FFC107]/40 text-black"
            }`}
          >
            <span>{SIZE_LABELS[size]}</span>
            <span>{added === size ? "✓" : `${price} دج`}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

function PopularCard({ item, index }: { item: MenuItem; index: number }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const handleAdd = () => {
    if (item.sizes) {
      setShowPicker(true);
    } else {
      addItem(item);
      setAdded(true);
      setTimeout(() => setAdded(false), 800);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className="relative flex-shrink-0 w-[150px] bg-white rounded-2xl overflow-hidden shadow-[0_2px_14px_rgba(0,0,0,0.07)] border border-gray-50"
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
        <h4 className="text-[12px] font-black text-black leading-tight mb-1.5 line-clamp-1">{item.name}</h4>
        <div className="flex items-center justify-between">
          <div>
            {item.sizes ? (
              <span className="text-[11px] font-black text-[#DC2626]">
                {Math.min(...Object.values(item.sizes).filter(Boolean) as number[])}+<span className="text-[9px]"> دج</span>
              </span>
            ) : (
              <span className="text-[13px] font-black text-[#DC2626]">{item.price}<span className="text-[10px]"> دج</span></span>
            )}
          </div>
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

      {/* Mini size picker overlay */}
      <AnimatePresence>
        {showPicker && item.sizes && (
          <MiniSizePicker item={item} onClose={() => setShowPicker(false)} />
        )}
      </AnimatePresence>
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
