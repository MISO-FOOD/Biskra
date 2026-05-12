import { Minus, Plus, Trash2, ShoppingCart, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function CartSection() {
  const { items, removeItem, updateQuantity, subtotal, total, deliveryFee, clearCart } = useCart();

  const handleOrder = () => {
    if (items.length === 0) return;
    const lines = items
      .map((ci) => `${ci.item.name} x${ci.quantity} - ${ci.item.price * ci.quantity} دج`)
      .join("%0A");
    const msg = `*طلب جديد - ميسو فود*%0A%0A${lines}%0A%0A*المجموع:* ${subtotal} دج%0A*التوصيل:* ${deliveryFee} دج%0A*الإجمالي:* ${total} دج`;
    window.open(`https://wa.me/213793149538?text=${msg}`, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <ShoppingCart className="w-16 h-16 text-gray-200 mb-4" />
        <p className="text-gray-400 font-bold text-lg">سلة الطلبات فارغة</p>
        <p className="text-gray-300 text-sm mt-1">أضف وجباتك المفضلة من القائمة</p>
      </div>
    );
  }

  return (
    <div className="px-3 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-[#DC2626]" />
          <h2 className="text-base font-black text-black">سلة الطلبات</h2>
          <span className="bg-[#FFC107] text-black text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
            {items.reduce((s, ci) => s + ci.quantity, 0)}
          </span>
        </div>
        <button
          data-testid="clear-cart"
          onClick={clearCart}
          className="text-xs text-gray-400 font-bold"
        >
          مسح الكل
        </button>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-3 mb-4">
        <AnimatePresence>
          {items.map((ci) => (
            <motion.div
              key={ci.item.id}
              data-testid={`cart-item-${ci.item.id}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              className="flex items-center gap-3 bg-white rounded-2xl p-2 shadow-sm border border-gray-100"
            >
              <img
                src={ci.item.image}
                alt={ci.item.name}
                className="w-14 h-14 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-black text-sm text-black truncate">{ci.item.name}</p>
                <p className="text-[#DC2626] font-bold text-xs">{ci.item.price} دج</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  data-testid={`qty-minus-${ci.item.id}`}
                  onClick={() => updateQuantity(ci.item.id, ci.quantity - 1)}
                  className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center active:scale-90 transition-transform"
                >
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center font-black text-sm">{ci.quantity}</span>
                <button
                  data-testid={`qty-plus-${ci.item.id}`}
                  onClick={() => updateQuantity(ci.item.id, ci.quantity + 1)}
                  className="w-7 h-7 rounded-lg bg-[#FFC107] flex items-center justify-center active:scale-90 transition-transform"
                >
                  <Plus size={14} />
                </button>
                <button
                  data-testid={`remove-${ci.item.id}`}
                  onClick={() => removeItem(ci.item.id)}
                  className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center mr-1 active:scale-90 transition-transform"
                >
                  <Trash2 size={14} className="text-[#DC2626]" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-500 font-bold text-sm">المجموع</span>
          <span className="font-black text-sm">{subtotal.toLocaleString()} دج</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="flex items-center gap-1 text-gray-500 font-bold text-sm">
            <Clock size={13} />
            التوصيل
          </span>
          <span className="font-black text-sm">{deliveryFee} دج</span>
        </div>
        <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
          <span className="font-black text-base text-black">الإجمالي</span>
          <span className="font-black text-base text-[#DC2626]">{total.toLocaleString()} دج</span>
        </div>
      </div>

      {/* Order button */}
      <button
        data-testid="checkout-btn"
        onClick={handleOrder}
        className="w-full flex items-center justify-center gap-2 bg-[#DC2626] text-white font-black text-base py-4 rounded-2xl shadow-lg active:scale-95 transition-transform"
      >
        <ShoppingCart size={20} />
        <span>إتمام الطلب</span>
      </button>
    </div>
  );
}
