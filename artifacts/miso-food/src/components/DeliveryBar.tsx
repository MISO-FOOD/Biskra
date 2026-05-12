import { MapPin, ChevronDown, Bike, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function DeliveryBar() {
  return (
    <div className="px-4 pb-3 max-w-[480px] w-full mx-auto" data-testid="delivery-bar">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.07)] p-3 flex items-center justify-between border border-gray-50 cursor-pointer active:scale-[0.99] transition-transform"
      >
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

        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1">
              <Clock size={10} className="text-gray-400" />
              <span className="text-[10px] text-gray-400 font-bold">30-45 دقيقة</span>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.92 }}
            className="flex items-center gap-1.5 bg-[#DC2626] text-white px-3 py-2 rounded-xl shadow-md"
          >
            <Bike className="w-4 h-4" strokeWidth={2.5} />
            <span className="text-[11px] font-black">توصيل سريع</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
