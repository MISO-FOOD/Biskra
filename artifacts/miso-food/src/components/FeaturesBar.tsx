import { Bike, ShieldCheck, HeadphonesIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturesBar() {
  const features = [
    {
      icon: <Bike className="w-5 h-5 text-[#DC2626]" strokeWidth={2.5} />,
      title: "توصيل سريع",
      desc: "من 30 إلى 45 دقيقة",
      link: "تتبع الطلب >",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#DC2626]" strokeWidth={2.5} />,
      title: "دفع آمن",
      desc: "خيارات دفع متعددة",
      link: "عرض الطرق >",
    },
    {
      icon: <HeadphonesIcon className="w-5 h-5 text-[#DC2626]" strokeWidth={2.5} />,
      title: "دعم العملاء",
      desc: "متاح 24/7 لخدمتك",
      link: "تواصل معنا >",
    },
  ];

  return (
    <div className="px-4 py-4 mb-2 max-w-[480px] mx-auto w-full">
      <div className="flex gap-2">
        {features.map((f, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex-1 bg-white rounded-2xl p-2.5 shadow-sm border border-gray-50 flex flex-col items-center text-center hover:shadow-md transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center mb-1.5">
              {f.icon}
            </div>
            <h4 className="text-[11px] font-black text-black mb-0.5">{f.title}</h4>
            <p className="text-[9px] text-gray-500 font-bold mb-1.5">{f.desc}</p>
            <span className="text-[9px] font-black text-[#DC2626] mt-auto">{f.link}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
