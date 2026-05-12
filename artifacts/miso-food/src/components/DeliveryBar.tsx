import { MapPin, ChevronDown, Clock } from "lucide-react";
import { motion } from "framer-motion";

function MotoIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Rear wheel */}
      <circle cx="6" cy="17" r="4" />
      {/* Front wheel */}
      <circle cx="26" cy="17" r="4" />
      {/* Body frame */}
      <path d="M10 17 L14 8 L18 8 L22 13 L22 17" />
      {/* Seat */}
      <path d="M12 8 L18 8" strokeWidth="3" strokeLinecap="round" />
      {/* Handlebars */}
      <path d="M22 13 L26 11 M26 11 L28 9 M26 11 L28 13" />
      {/* Engine/body lower */}
      <path d="M10 17 L6 17" />
      {/* Exhaust */}
      <path d="M10 16 L7 18" strokeWidth="1.5" />
    </svg>
  );
}

export default function DeliveryBar() {
  return (
    <div className="px-4 pb-3 max-w-[480px] w-full mx-auto" data-testid="delivery-bar">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.07)] p-3 flex items-center justify-between border border-gray-50 cursor-pointer active:scale-[0.99] transition-transform"
      >
        {/* Location */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-[#DC2626]" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold mb-0.5 leading-none">التوصيل إلى</p>
            <div className="flex items-center gap-1">
              <span className="text-[13px] font-black text-black">حي سايحي 2 بسكرة</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Time + Delivery button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Clock size={10} className="text-gray-400" />
            <span className="text-[10px] text-gray-400 font-bold">30-45 دقيقة</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.92 }}
            className="flex items-center gap-1.5 bg-[#DC2626] text-white px-3 py-2 rounded-xl shadow-md"
          >
            <MotoIcon size={18} />
            <span className="text-[11px] font-black">توصيل سريع</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
