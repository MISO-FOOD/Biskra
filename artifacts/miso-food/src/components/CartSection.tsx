import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingCart, User, Phone, MapPin, MessageSquare, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function CartSection() {
  const {
    items, removeItem, updateQuantity,
    subtotal, clearCart,
  } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "الاسم مطلوب";
    if (!phone.trim()) e.phone = "رقم الهاتف مطلوب";
    if (!location.trim()) e.location = "مكان التوصيل مطلوب";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleOrder = () => {
    if (items.length === 0) return;
    if (!validate()) return;

    const lines = items
      .map((ci) => {
        const sizePart = ci.sizeLabel ? ` (${ci.sizeLabel})` : "";
        return `• ${ci.item.name}${sizePart} x${ci.quantity} — ${ci.sizePrice * ci.quantity} دج`;
      })
      .join("%0A");

    const noteLine = note.trim() ? `%0A📝 *ملاحظة:* ${note}` : "";
    const msg =
      `🍔 *طلب جديد — ميسو فود*%0A%0A` +
      `👤 *الاسم:* ${name}%0A` +
      `📞 *الهاتف:* ${phone}%0A` +
      `📍 *التوصيل إلى:* ${location}%0A%0A` +
      `${lines}%0A%0A` +
      `💰 *المجموع:* ${subtotal} دج%0A` +
      `🚚 *سعر التوصيل:* يحدد بعد تأكيد الطلب%0A` +
      `💵 *الدفع:* ادفع لما يوصل الطلب عندك` +
      `${noteLine}`;

    window.open(`https://t.me/+213793149538?text=${msg}`, "_blank");
  };

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
        <p className="text-gray-400 font-bold text-sm leading-relaxed">أضف وجباتك المفضلة من القائمة</p>
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
            <p className="text-xs text-gray-400 font-bold">
              {items.reduce((s, ci) => s + ci.quantity, 0)} عناصر مختارة
            </p>
          </div>
        </div>
        <motion.button whileTap={{ scale: 0.95 }} onClick={clearCart}
          className="text-xs bg-red-50 text-[#DC2626] font-black px-3 py-1.5 rounded-xl border border-red-100">
          مسح الكل
        </motion.button>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-3 mb-5">
        <AnimatePresence>
          {items.map((ci) => (
            <motion.div
              key={ci.cartKey}
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
                <p className="font-black text-sm text-black truncate leading-tight">{ci.item.name}</p>
                {ci.sizeLabel && (
                  <span className="inline-block text-[10px] font-black bg-[#FFC107]/20 text-black px-2 py-0.5 rounded-full mt-0.5 mb-0.5">
                    {ci.sizeLabel}
                  </span>
                )}
                <p className="text-[#DC2626] font-black text-sm">{ci.sizePrice} دج</p>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-50 p-1 rounded-xl">
                <motion.button whileTap={{ scale: 0.85 }}
                  onClick={() => updateQuantity(ci.cartKey, ci.quantity - 1)}
                  className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center">
                  <Minus size={13} strokeWidth={3} className="text-black" />
                </motion.button>
                <span className="w-6 text-center font-black text-sm">{ci.quantity}</span>
                <motion.button whileTap={{ scale: 0.85 }}
                  onClick={() => updateQuantity(ci.cartKey, ci.quantity + 1)}
                  className="w-7 h-7 rounded-lg bg-[#FFC107] shadow-sm flex items-center justify-center">
                  <Plus size={13} strokeWidth={3} className="text-black" />
                </motion.button>
              </div>
              <motion.button whileTap={{ scale: 0.85 }}
                onClick={() => removeItem(ci.cartKey)}
                className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                <Trash2 size={15} strokeWidth={2.5} className="text-[#DC2626]" />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Customer Info Form */}
      <div className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mb-4 border border-gray-50">
        <h3 className="text-sm font-black text-black mb-4">معلومات الزبون</h3>
        <div className="flex flex-col gap-3">
          {/* Name */}
          <div>
            <div className={`flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 border ${errors.name ? "border-[#DC2626]" : "border-gray-100"} transition-colors`}>
              <User size={15} className="text-gray-400 flex-shrink-0" />
              <input
                value={name}
                onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
                placeholder="الاسم"
                className="flex-1 bg-transparent text-sm font-black text-black placeholder-gray-300 outline-none text-right"
              />
            </div>
            {errors.name && <p className="text-[#DC2626] text-[11px] font-bold mt-1 text-right">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div>
            <div className={`flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 border ${errors.phone ? "border-[#DC2626]" : "border-gray-100"} transition-colors`}>
              <Phone size={15} className="text-gray-400 flex-shrink-0" />
              <input
                value={phone}
                onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: "" })); }}
                placeholder="رقم الهاتف"
                type="tel"
                inputMode="tel"
                className="flex-1 bg-transparent text-sm font-black text-black placeholder-gray-300 outline-none text-right"
              />
            </div>
            {errors.phone && <p className="text-[#DC2626] text-[11px] font-bold mt-1 text-right">{errors.phone}</p>}
          </div>

          {/* Location */}
          <div>
            <div className={`flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 border ${errors.location ? "border-[#DC2626]" : "border-gray-100"} transition-colors`}>
              <MapPin size={15} className="text-gray-400 flex-shrink-0" />
              <input
                value={location}
                onChange={(e) => { setLocation(e.target.value); setErrors((p) => ({ ...p, location: "" })); }}
                placeholder="مكان التوصيل"
                className="flex-1 bg-transparent text-sm font-black text-black placeholder-gray-300 outline-none text-right"
              />
            </div>
            {errors.location && <p className="text-[#DC2626] text-[11px] font-bold mt-1 text-right">{errors.location}</p>}
          </div>

          {/* Note */}
          <div className="flex items-start gap-2 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
            <MessageSquare size={15} className="text-gray-400 flex-shrink-0 mt-0.5" />
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="ملاحظة (اختياري)"
              rows={2}
              className="flex-1 bg-transparent text-sm font-black text-black placeholder-gray-300 outline-none text-right resize-none"
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-3xl p-5 shadow-lg border border-gray-50 mb-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-28 h-28 bg-[#FFC107]/10 rounded-full blur-2xl translate-x-10 -translate-y-10" />
        <div className="relative z-10 space-y-2.5">
          <div className="flex justify-between">
            <span className="text-gray-500 font-black text-sm">المجموع الفرعي</span>
            <span className="font-black text-sm">{subtotal.toLocaleString()} دج</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-black text-sm">التوصيل</span>
            <span className="font-black text-sm text-[#FFC107]">يحدد بعد تأكيد الطلب</span>
          </div>
          <div className="border-t-2 border-dashed border-gray-100 pt-3">
            <div className="flex justify-between items-center">
              <span className="font-black text-base text-black">المجموع</span>
              <span className="font-black text-xl text-[#DC2626]">{subtotal.toLocaleString()} دج</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment note */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-3.5 mb-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
          <CheckCircle size={18} className="text-white" strokeWidth={2.5} />
        </div>
        <p className="text-sm font-black text-green-800">ادفع لما يوصل الطلب عندك</p>
      </div>

      {/* Order Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={handleOrder}
        className="w-full relative overflow-hidden text-white font-black text-base py-4 rounded-2xl shadow-[0_8px_24px_rgba(34,158,217,0.35)] flex items-center justify-center gap-3 group"
        style={{ background: "linear-gradient(135deg, #229ED9 0%, #1A85B8 100%)" }}
      >
        <span className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="flex-shrink-0">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.007 9.455c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.87.766z" />
        </svg>
        <span>إرسال الطلب للبوت</span>
        <span className="font-black text-yellow-300">{subtotal.toLocaleString()} دج</span>
      </motion.button>
      <p className="text-center text-[11px] text-gray-400 font-bold mt-3">
        سيتم التواصل معك عبر تيليغرام لتأكيد الطلب وتحديد سعر التوصيل
      </p>
    </div>
  );
}
