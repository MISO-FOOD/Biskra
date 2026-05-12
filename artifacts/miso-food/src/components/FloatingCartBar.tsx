import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/useCart";

interface FloatingCartBarProps {
  onOpenCart: () => void;
}

export default function FloatingCartBar({ onOpenCart }: FloatingCartBarProps) {
  const { totalItems, total, items } = useCart();

  return (
    <AnimatePresence>
      {items.length > 0 && (
        <motion.button
          data-testid="floating-cart"
          onClick={onOpenCart}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="fixed bottom-[90px] left-4 right-4 max-w-[440px] mx-auto z-40 bg-[#DC2626] text-white rounded-2xl px-4 py-3.5 flex items-center justify-between shadow-[0_8px_30px_rgba(220,38,38,0.4)]"
        >
          <div className="flex items-center gap-2">
            <div className="relative">
              <ShoppingCart size={20} strokeWidth={2.5} />
              <span className="absolute -top-2 -right-2 bg-[#FFC107] text-black text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center" style={{ width: 18, height: 18 }}>
                {totalItems}
              </span>
            </div>
            <span className="text-sm font-black">عرض السلة</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-black">{total.toLocaleString()} دج</span>
            <ArrowLeft size={16} strokeWidth={3} />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
