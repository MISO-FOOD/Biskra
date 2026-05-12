import { MapPin, ChevronDown, Bike } from "lucide-react";

export default function DeliveryBar() {
  return (
    <div className="px-4 py-3 max-w-[480px] w-full mx-auto" data-testid="delivery-bar">
      <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-3 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98]">
        {/* Left: Location */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-[#DC2626]" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] text-gray-500 font-bold mb-0.5">التوصيل إلى</p>
            <div className="flex items-center gap-1">
              <span className="text-sm font-black text-black truncate max-w-[120px]">حي سايحي 2 باتنة</span>
              <ChevronDown className="w-4 h-4 text-black" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Right: Fast Delivery Button */}
        <button className="flex items-center gap-1.5 bg-[#DC2626] text-white px-3 py-2 rounded-xl shadow-sm hover:bg-red-700 transition-colors active:scale-95">
          <Bike className="w-4 h-4" strokeWidth={2.5} />
          <span className="text-[11px] font-black">توصيل سريع</span>
        </button>
      </div>
    </div>
  );
}
