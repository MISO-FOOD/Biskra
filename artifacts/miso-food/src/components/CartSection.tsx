import { Minus, Plus, Trash2, ShoppingCart, Clock, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function CartSection() {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    subtotal, 
    total, 
    deliveryFee, 
    clearCart,
    freeDeliveryThreshold,
    progressToFreeDelivery
  } = useCart();

  const handleOrder = () => {
    if (items.length === 0) return;
    const lines = items
      .map((ci) => `${ci.item.name} x${ci.quantity} - ${ci.item.price * ci.quantity} دج`)
      .join("%0A");
    const msg = `*طلب جديد - ميسو فود*%0A%0A${lines}%0A%0A*المجموع:* ${subtotal} دج%0A*التوصيل:* ${deliveryFee === 0 ? "مجاني" : deliveryFee + " دج"}%0A*الإجمالي:* ${total} دج`;
    window.open(`https://wa.me/213793149538?text=${msg}`, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white rounded-t-3xl max-w-[480px] mx-auto mt-2 h-full min-h-[60vh]">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <ShoppingCart className="w-12 h-12 text-gray-300" strokeWidth={1.5} />
        </div>
        <p className="text-black font-black text-xl mb-1">سلة الطلبات فارغة</p>
        <p className="text-gray-400 font-bold text-sm">أضف وجباتك المفضلة من القائمة واستمتع بالطعم</p>
      </div>
    );
  }

  const remainingForFreeDelivery = freeDeliveryThreshold - subtotal;
  const isFreeDelivery = remainingForFreeDelivery <= 0;

  return (
    <div className="px-4 pb-24 pt-4 bg-[#F5F5F5] max-w-[480px] mx-auto min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 bg-white p-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-[#DC2626]" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-lg font-black text-black leading-tight">سلة الطلبات</h2>
            <p className="text-xs text-gray-500 font-bold">{items.reduce((s, ci) => s + ci.quantity, 0)} عناصر مختارة</p>
          </div>
        </div>
        <button
          onClick={clearCart}
          className="text-xs bg-gray-100 text-gray-500 font-black px-3 py-1.5 rounded-lg active:scale-95 transition-transform"
        >
          مسح الكل
        </button>
      </div>

      {/* Free Delivery Progress */}
      <div className="bg-white p-4 rounded-2xl shadow-sm mb-4 border border-[#FFC107]/20">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className={`w-5 h-5 ${isFreeDelivery ? "text-green-500" : "text-[#FFC107]"}`} strokeWidth={2.5} />
          <span className={`text-sm font-black ${isFreeDelivery ? "text-green-600" : "text-black"}`}>
            {isFreeDelivery 
              ? "تهانيك! لقد حصلت على توصيل مجاني" 
              : `أضف ${remainingForFreeDelivery} دج للحصول على توصيل مجاني`}
          </span>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            className={`h-full ${isFreeDelivery ? "bg-green-500" : "bg-[#FFC107]"}`}
            initial={{ width: 0 }}
            animate={{ width: `${progressToFreeDelivery * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Items List */}
      <div className="flex flex-col gap-3 mb-6">
        <AnimatePresence>
          {items.map((ci) => (
            <motion.div
              key={ci.item.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="flex items-center gap-3 bg-white rounded-2xl p-2.5 shadow-sm border border-gray-50"
            >
              <div className="w-16 h-16 rounded-xl bg-[#FFF9E6] p-1 flex-shrink-0">
                <img
                  src={ci.item.image}
                  alt={ci.item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <p className="font-black text-sm text-black truncate mb-1">{ci.item.name}</p>
                <p className="text-[#DC2626] font-black text-sm">{ci.item.price} دج</p>
              </div>
              
              {/* Qty Controls */}
              <div className="flex items-center gap-1 shrink-0 bg-gray-50 p-1 rounded-xl">
                <button
                  onClick={() => updateQuantity(ci.item.id, ci.quantity - 1)}
                  className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center active:scale-90 transition-transform"
                >
                  <Minus size={14} strokeWidth={3} className="text-black" />
                </button>
                <span className="w-6 text-center font-black text-sm">{ci.quantity}</span>
                <button
                  onClick={() => updateQuantity(ci.item.id, ci.quantity + 1)}
                  className="w-7 h-7 rounded-lg bg-[#FFC107] shadow-sm flex items-center justify-center active:scale-90 transition-transform"
                >
                  <Plus size={14} strokeWidth={3} className="text-black" />
                </button>
              </div>
              <button
                onClick={() => removeItem(ci.item.id)}
                className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center ml-1 active:scale-90 transition-transform shrink-0"
              >
                <Trash2 size={16} strokeWidth={2.5} className="text-[#DC2626]" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-3xl p-5 shadow-lg border border-gray-100 mb-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-[#FFC107]/10 rounded-full blur-xl -translate-x-10 -translate-y-10" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#DC2626]/5 rounded-full blur-xl translate-x-10 translate-y-10" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-500 font-black text-sm">المجموع الفرعي</span>
            <span className="font-black text-sm">{subtotal.toLocaleString()} دج</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="flex items-center gap-1.5 text-gray-500 font-black text-sm">
              <Clock size={14} strokeWidth={2.5} />
              رسوم التوصيل
            </span>
            <span className={`font-black text-sm ${deliveryFee === 0 ? "text-green-500" : ""}`}>
              {deliveryFee === 0 ? "مجاني" : `${deliveryFee} دج`}
            </span>
          </div>
          
          <div className="border-t-2 border-dashed border-gray-200 my-4" />
          
          <div className="flex justify-between items-center">
            <span className="font-black text-lg text-black">الإجمالي النهائي</span>
            <span className="font-black text-xl text-[#DC2626]">{total.toLocaleString()} دج</span>
          </div>
        </div>
      </div>

      {/* Order button */}
      <button
        onClick={handleOrder}
        className="w-full relative group overflow-hidden bg-[#DC2626] text-white font-black text-lg py-4 rounded-2xl shadow-[0_8px_20px_rgba(220,38,38,0.3)] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        <ShoppingCart size={22} strokeWidth={2.5} />
        <span>إتمام الطلب الآن ←</span>
      </button>
    </div>
  );
}
