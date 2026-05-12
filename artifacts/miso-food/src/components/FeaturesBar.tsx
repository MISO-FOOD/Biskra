import { Bike, ShieldCheck, Headphones } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Bike,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    title: "توصيل سريع",
    desc: "30 – 45 دقيقة",
    link: "تتبع الطلب",
  },
  {
    icon: ShieldCheck,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    title: "دفع آمن",
    desc: "خيارات متعددة",
    link: "عرض الطرق",
  },
  {
    icon: Headphones,
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
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="bg-white rounded-2xl p-3 flex flex-col items-center text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-50 cursor-pointer hover:shadow-md transition-all active:scale-95"
            >
              <div className={`w-9 h-9 rounded-xl ${f.iconBg} flex items-center justify-center mb-2`}>
                <Icon size={18} className={f.iconColor} strokeWidth={2.5} />
              </div>
              <h4 className="text-[11px] font-black text-black mb-0.5">{f.title}</h4>
              <p className="text-[9px] text-gray-400 font-bold mb-1.5">{f.desc}</p>
              <span className="text-[9px] font-black text-[#DC2626]">{f.link} ←</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
