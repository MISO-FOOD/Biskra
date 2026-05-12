import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "أحمد بن علي",
    rating: 5,
    comment: "أطيب سندويتش جربته! المرقاز فيونداشي لا يُقاوم والتوصيل سريع جداً",
    item: "مرقاز فيونداشي",
    avatar: "أ",
    avatarBg: "bg-[#DC2626]",
    time: "منذ يومين",
  },
  {
    id: 2,
    name: "محمد الصالح",
    rating: 5,
    comment: "المرقاز شاورما رهيب والخبز طازج دائماً. ميسو فود الأفضل في الحي",
    item: "مرقاز شاورما",
    avatar: "م",
    avatarBg: "bg-[#FFC107]",
    time: "منذ ٣ أيام",
  },
  {
    id: 3,
    name: "سارة بوعلام",
    rating: 5,
    comment: "كبدة فيونداشي غير شكل! الصلصة الخاصة بتاعتهم تحفة. أنصح الجميع يجرب",
    item: "كبدة فيونداشي",
    avatar: "س",
    avatarBg: "bg-black",
    time: "منذ أسبوع",
  },
  {
    id: 4,
    name: "يوسف قاسمي",
    rating: 5,
    comment: "عرض ميسو كومبو يستاهل كل دينار. الكمية كبيرة والطعم جنان",
    item: "ميسو كومبو",
    avatar: "ي",
    avatarBg: "bg-[#DC2626]",
    time: "منذ أسبوعين",
  },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={12} fill={i <= count ? "#FFC107" : "#E5E7EB"} className={i <= count ? "text-[#FFC107]" : "text-gray-200"} />
      ))}
    </div>
  );
}

export default function CustomerReviews() {
  return (
    <div className="max-w-[480px] mx-auto w-full px-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-black text-black">آراء الزبائن</h2>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={12} fill="#FFC107" className="text-[#FFC107]" />
              ))}
            </div>
            <span className="text-xs font-black text-black">4.9</span>
            <span className="text-xs text-gray-400 font-bold">(+500 تقييم)</span>
          </div>
        </div>
        <button className="text-xs font-black text-[#DC2626] bg-red-50 px-3 py-1.5 rounded-xl">عرض الكل</button>
      </div>

      {/* Horizontal scroll */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
        {reviews.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="flex-shrink-0 w-[220px] bg-white rounded-3xl p-4 shadow-[0_2px_16px_rgba(0,0,0,0.07)] border border-gray-50 relative"
          >
            <Quote size={20} className="absolute top-3 left-3 text-[#FFC107] opacity-40" />
            <div className="flex items-center gap-2.5 mb-3">
              <div className={`w-9 h-9 rounded-full ${r.avatarBg} flex items-center justify-center text-white font-black text-sm shadow-sm`}>
                {r.avatar}
              </div>
              <div>
                <p className="text-[12px] font-black text-black leading-tight">{r.name}</p>
                <p className="text-[10px] text-gray-400 font-bold">{r.time}</p>
              </div>
            </div>
            <StarRow count={r.rating} />
            <p className="text-[11px] text-gray-600 font-bold leading-relaxed mt-2 line-clamp-3">{r.comment}</p>
            <span className="inline-block mt-2 text-[10px] font-black text-[#DC2626] bg-red-50 px-2 py-0.5 rounded-full">{r.item}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
