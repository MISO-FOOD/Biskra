import { Banknote, Headphones } from "lucide-react";
import { motion } from "framer-motion";

function MotoIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="17" r="4" />
      <circle cx="26" cy="17" r="4" />
      <path d="M10 17 L14 8 L18 8 L22 13 L22 17" />
      <path d="M12 8 L18 8" strokeWidth="3" strokeLinecap="round" />
      <path d="M22 13 L26 11 M26 11 L28 9 M26 11 L28 13" />
      <path d="M10 17 L6 17" />
    </svg>
  );
}

const features = [
  {
    icon: <MotoIcon size={20} />,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    title: "توصيل سريع",
    desc: "30 – 45 دقيقة",
    link: "تتبع الطلب",
  },
  {
    icon: <Banknote size={18} className="text-green-600" strokeWidth={2.5} />,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    title: "الدفع عند الاستلام",
    desc: "ادفع لما يوصل",
    link: "آمن ومضمون",
  },
  {
    icon: <Headphones size={18} className="text-blue-500" strokeWidth={2.5} />,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    title: "دعم 24/7",
    desc: "دائماً لخدمتك",
    link: "تواصل معنا",
  },
];

export default function FeaturesBar() {
  return (
    <div className="px-4 pt-1 pb-3 max-w-[480px] mx-auto w-full">
      <div className="grid grid-cols-3 gap-2.5">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="bg-white rounded-2xl p-3 flex flex-col items-center text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-50 cursor-pointer hover:shadow-md transition-all active:scale-95"
          >
            <div className={`w-9 h-9 rounded-xl ${f.iconBg} flex items-center justify-center mb-2 ${f.iconColor}`}>
              {f.icon}
            </div>
            <h4 className="text-[10px] font-black text-black mb-0.5 leading-tight">{f.title}</h4>
            <p className="text-[9px] text-gray-400 font-bold mb-1.5">{f.desc}</p>
            <span className="text-[9px] font-black text-[#DC2626]">{f.link} ←</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
