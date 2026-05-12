import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingCart, Tag, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const VALID_COUPONS: Record<string, number> = {
  "MISO10": 10,
  "MISO20": 20,
  "WELCOME": 15,
};

export default function CartSection() {
  const { items, removeItem, updateQuantity, subtotal, total, deliveryFee, clearCart, freeDeliveryThreshold, progressToFreeDelivery } = useCart();
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState(false);

  const discountPercent = appliedCoupon ? VALID_COUPONS[appliedCoupon] : 0;
  const discountAmount = Math.round(subtotal * discountPercent / 100);
  const finalTotal = total - discountAmount;

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (VALID_COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponError("");
      setCouponSuccess(true);
      setTimeout(() => setCouponSuccess(false), 2000);
    } else {
      setCouponError("كود الخصم غير صحيح");
      setTimeout(() => setCouponError(""), 2000);
    }
  };

  const handleOrder = () => {
    if (items.length === 0) return;
    const lines = items.map((ci) => `${ci.item.name} x${ci.quantity} - ${ci.item.price * ci.quantity} دج`).join("%0A");
    const couponLine = appliedCoupon ? `%0A*كود الخصم:* ${appliedCoupon} (-${discountAmount} دج)` : "";
    const msg = `*طلب جديد - ميسو فود*%0A%0A${lines}%0A${couponLine}%0A*المجموع:* ${subtotal} دج%0A*التوصيل:* ${deliveryFee === 0 ? "مجاني" : deliveryFee + " دج"}%0A*الإجمالي:* ${finalTotal} دج`;
    window.open(`https://wa.me/213793149538?text=${msg}`, "_blank");
  };

  const remainingForFreeDelivery = freeDeliveryThreshold - subtotal;
  const isFreeDelivery = remainingForFreeDelivery <= 0;

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-24 px-6 text-center"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -5, 0] }}
          transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.6 }}
          className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-5 shadow-md border border-gray-100"
        >
          <ShoppingCart className="w-11 h-11 text-gray-300" strokeWidth={1.5} />
        </motion.div>
        <p className="text-black font-black text-xl mb-2">سلة الطلبات فارغة</p>
        <p className="text-gray-400 font-bold text-sm leading-relaxed">أضف وجباتك المفضلة من القائمة واستمتع بالطعم</p>
      </motion.div>
    );
  }

  return (
    <div className="px-4 pb-28 pt-4 max-w-[480px] mx-auto min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-[#DC2626] flex items-center justify-center shadow-md">
            <ShoppingCart className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-lg font-black text-black leading-tight">سلة الطلبات</h2>
            <p className="text-xs text-gray-400 font-bold">{items.reduce((s, ci) => s + ci.quantity, 0)} عناصر مختارة</p>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={clearCart}
          className="text-xs bg-red-50 text-[#DC2626] font-black px-3 py-1.5 rounded-xl border border-red-100"
        >
          مسح الكل
        </motion.button>
      </div>

      {/* Free Delivery Progress */}
      <div className={`rounded-2xl p-4 mb-4 border transition-colors ${isFreeDelivery ? "bg-green-50 border-green-200" : "bg-white border-[#FFC107]/30"}`}>
        <div className="flex items-center gap-2 mb-2.5">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${isFreeDelivery ? "bg-green-500" : "bg-[#FFC107]"}`}>
            <CheckCircle size={15} className="text-white" strokeWidth={2.5} />
          </div>
          <span className={`text-xs font-black ${isFreeDelivery ? "text-green-700" : "text-black"}`}>
            {isFreeDelivery ? "تهانيك! لقد حصلت على توصيل مجاني" : `أضف ${remainingForFreeDelivery} دج للتوصيل المجاني`}
          </span>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${isFreeDelivery ? "bg-green-500" : "bg-[#FFC107]"}`}
            initial={{ width: 0 }}
            animate={{ width: `${progressToFreeDelivery * 100}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-3 mb-5">
        <AnimatePresence>
          {items.map((ci) => (
            <motion.div
              key={ci.item.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
              className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-50"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#FFF9E6] flex-shrink-0">
                <img src={ci.item.image} alt={ci.item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-sm text-black truncate mb-1">{ci.item.name}</p>
                <p className="text-[#DC2626] font-black text-sm">{ci.item.price} دج</p>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-50 p-1 rounded-xl">
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => updateQuantity(ci.item.id, ci.quantity - 1)}
                  className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center"
                >
                  <Minus size={13} strokeWidth={3} className="text-black" />
                </motion.button>
                <span className="w-6 text-center font-black text-sm">{ci.quantity}</span>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => updateQuantity(ci.item.id, ci.quantity + 1)}
                  className="w-7 h-7 rounded-lg bg-[#FFC107] shadow-sm flex items-center justify-center"
                >
                  <Plus size={13} strokeWidth={3} className="text-black" />
                </motion.button>
              </div>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => removeItem(ci.item.id)}
                className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center shrink-0"
              >
                <Trash2 size={15} strokeWidth={2.5} className="text-[#DC2626]" />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Coupon Code */}
      <div className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mb-4 border border-gray-50">
        <div className="flex items-center gap-2 mb-3">
          <Tag size={16} className="text-[#FFC107]" strokeWidth={2.5} />
          <span className="text-sm font-black text-black">كود الخصم</span>
          {appliedCoupon && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mr-auto text-[10px] font-black bg-green-100 text-green-700 px-2 py-0.5 rounded-full"
            >
              -{discountPercent}% مفعّل
            </motion.span>
          )}
        </div>
        <div className="flex gap-2">
          <input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
            placeholder="أدخل الكود هنا"
            disabled={!!appliedCoupon}
            className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 text-sm font-black text-black placeholder-gray-300 outline-none text-right focus:border-[#FFC107] transition-colors disabled:opacity-60"
          />
          {appliedCoupon ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => { setAppliedCoupon(null); setCoupon(""); }}
              className="px-4 py-2.5 bg-red-50 text-[#DC2626] text-xs font-black rounded-xl border border-red-100"
            >
              إلغاء
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={applyCoupon}
              className="px-4 py-2.5 bg-[#FFC107] text-black text-xs font-black rounded-xl shadow-sm"
            >
              تطبيق
            </motion.button>
          )}
        </div>
        <AnimatePresence>
          {couponError && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-[#DC2626] text-[11px] font-bold mt-2 text-right">
              {couponError}
            </motion.p>
          )}
          {couponSuccess && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-green-600 text-[11px] font-bold mt-2 text-right">
              تم تطبيق الكود بنجاح!
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-3xl p-5 shadow-lg border border-gray-50 mb-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-28 h-28 bg-[#FFC107]/10 rounded-full blur-2xl translate-x-10 -translate-y-10" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#DC2626]/5 rounded-full blur-xl -translate-x-8 translate-y-8" />
        <div className="relative z-10 space-y-2.5">
          <div className="flex justify-between">
            <span className="text-gray-500 font-black text-sm">المجموع الفرعي</span>
            <span className="font-black text-sm">{subtotal.toLocaleString()} دج</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-black text-sm">التوصيل</span>
            <span className={`font-black text-sm ${deliveryFee === 0 ? "text-green-500" : ""}`}>
              {deliveryFee === 0 ? "مجاني" : `${deliveryFee} دج`}
            </span>
          </div>
          {discountAmount > 0 && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              className="flex justify-between">
              <span className="text-green-600 font-black text-sm">خصم ({discountPercent}%)</span>
              <span className="font-black text-sm text-green-600">-{discountAmount} دج</span>
            </motion.div>
          )}
          <div className="border-t-2 border-dashed border-gray-100 pt-3 mt-1">
            <div className="flex justify-between items-center">
              <span className="font-black text-base text-black">الإجمالي النهائي</span>
              <span className="font-black text-xl text-[#DC2626]">{finalTotal.toLocaleString()} دج</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={handleOrder}
        className="w-full relative overflow-hidden bg-[#DC2626] text-white font-black text-base py-4 rounded-2xl shadow-[0_8px_24px_rgba(220,38,38,0.35)] flex items-center justify-center gap-3 group"
      >
        <span className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        <ShoppingCart size={20} strokeWidth={2.5} />
        <span>إتمام الطلب عبر واتساب</span>
        <span className="font-black text-[#FFC107]">{finalTotal.toLocaleString()} دج</span>
      </motion.button>

      <p className="text-center text-[11px] text-gray-400 font-bold mt-3">
        سيتم التواصل معك عبر واتساب لتأكيد طلبك
      </p>
    </div>
  );
}
