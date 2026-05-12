import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingCart, User, Phone, MapPin, MessageSquare, CheckCircle, ClipboardCheck, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN as string | undefined;
const CHAT_ID   = import.meta.env.VITE_TELEGRAM_CHAT_ID   as string | undefined;

export default function CartSection() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();

  const [name, setName]         = useState("");
  const [phone, setPhone]       = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote]         = useState("");
  const [errors, setErrors]     = useState<Record<string, string>>({});
  const [sending, setSending]   = useState(false);
  const [sent, setSent]         = useState(false);
  const [sendError, setSendError] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim())     e.name     = "الاسم مطلوب";
    if (!phone.trim())    e.phone    = "رقم الهاتف مطلوب";
    if (!location.trim()) e.location = "مكان التوصيل مطلوب";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildMessage = () => {
    const lines = items
      .map((ci) => {
        const sizePart = ci.sizeLabel ? ` (${ci.sizeLabel})` : "";
        return `• ${ci.item.name}${sizePart} × ${ci.quantity} — ${ci.sizePrice * ci.quantity} دج`;
      })
      .join("\n");

    return (
      `🍔 *طلب جديد — ميسو فود*\n\n` +
      `👤 *الاسم:* ${name}\n` +
      `📞 *الهاتف:* ${phone}\n` +
      `📍 *التوصيل إلى:* ${location}\n\n` +
      `${lines}\n\n` +
      `💰 *المجموع:* ${subtotal} دج\n` +
      `🚚 *التوصيل:* يحدد بعد تأكيد الطلب\n` +
      `💵 *الدفع:* ادفع لما يوصل الطلب عندك` +
      (note.trim() ? `\n📝 *ملاحظة:* ${note}` : "")
    );
  };

  const handleOrder = async () => {
    if (items.length === 0) return;
    if (!validate()) return;

    setSending(true);
    setSendError("");

    const text = buildMessage();

    try {
      if (BOT_TOKEN && CHAT_ID) {
        const res = await fetch(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "Markdown" }),
          }
        );
        if (!res.ok) throw new Error("فشل الإرسال");
      } else {
        const encoded = encodeURIComponent(text);
        window.open(`https://t.me/+213793149538?text=${encoded}`, "_blank");
      }
      setSent(true);
      clearCart();
    } catch {
      setSendError("حدث خطأ أثناء الإرسال، حاول مرة أخرى");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-28 px-6 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-5 shadow-md"
        >
          <CheckCircle className="w-12 h-12 text-green-500" strokeWidth={2} />
        </motion.div>
        <p className="text-black font-black text-xl mb-2">تم إرسال طلبك!</p>
        <p className="text-gray-400 font-bold text-sm leading-relaxed">
          سيتم التواصل معك عبر تيليغرام لتأكيد الطلب وتحديد سعر التوصيل
        </p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setSent(false)}
          className="mt-8 bg-[#FFC107] text-black font-black px-8 py-3 rounded-2xl shadow-md"
        >
          طلب جديد
        </motion.button>
      </motion.div>
    );
  }

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
          <div>
            <div className={`flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 border ${errors.name ? "border-[#DC2626]" : "border-gray-100"} transition-colors`}>
              <User size={15} className="text-gray-400 flex-shrink-0" />
              <input value={name} onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
                placeholder="الاسم" className="flex-1 bg-transparent text-sm font-black text-black placeholder-gray-300 outline-none text-right" />
            </div>
            {errors.name && <p className="text-[#DC2626] text-[11px] font-bold mt-1 text-right">{errors.name}</p>}
          </div>

          <div>
            <div className={`flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 border ${errors.phone ? "border-[#DC2626]" : "border-gray-100"} transition-colors`}>
              <Phone size={15} className="text-gray-400 flex-shrink-0" />
              <input value={phone} onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: "" })); }}
                placeholder="رقم الهاتف" type="tel" inputMode="tel"
                className="flex-1 bg-transparent text-sm font-black text-black placeholder-gray-300 outline-none text-right" />
            </div>
            {errors.phone && <p className="text-[#DC2626] text-[11px] font-bold mt-1 text-right">{errors.phone}</p>}
          </div>

          <div>
            <div className={`flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 border ${errors.location ? "border-[#DC2626]" : "border-gray-100"} transition-colors`}>
              <MapPin size={15} className="text-gray-400 flex-shrink-0" />
              <input value={location} onChange={(e) => { setLocation(e.target.value); setErrors((p) => ({ ...p, location: "" })); }}
                placeholder="مكان التوصيل"
                className="flex-1 bg-transparent text-sm font-black text-black placeholder-gray-300 outline-none text-right" />
            </div>
            {errors.location && <p className="text-[#DC2626] text-[11px] font-bold mt-1 text-right">{errors.location}</p>}
          </div>

          <div className="flex items-start gap-2 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
            <MessageSquare size={15} className="text-gray-400 flex-shrink-0 mt-0.5" />
            <textarea value={note} onChange={(e) => setNote(e.target.value)}
              placeholder="ملاحظة (اختياري)" rows={2}
              className="flex-1 bg-transparent text-sm font-black text-black placeholder-gray-300 outline-none text-right resize-none" />
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

      {/* Error */}
      <AnimatePresence>
        {sendError && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-[#DC2626] text-[12px] font-bold text-center mb-3">
            {sendError}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Confirm Order Button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleOrder}
        disabled={sending}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-base text-white shadow-[0_8px_24px_rgba(220,38,38,0.35)] disabled:opacity-70 transition-opacity"
        style={{ background: "linear-gradient(135deg, #DC2626 0%, #b91c1c 100%)" }}
      >
        {sending ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <ClipboardCheck size={20} strokeWidth={2.5} />
        )}
        <span>{sending ? "جاري الإرسال..." : "تأكيد الطلب"}</span>
        {!sending && (
          <span className="bg-white/20 text-white font-black text-sm px-3 py-1 rounded-xl">
            {subtotal.toLocaleString()} دج
          </span>
        )}
      </motion.button>
      <p className="text-center text-[11px] text-gray-400 font-bold mt-3">
        سيتم التواصل معك لتأكيد الطلب وتحديد سعر التوصيل
      </p>
    </div>
  );
}
