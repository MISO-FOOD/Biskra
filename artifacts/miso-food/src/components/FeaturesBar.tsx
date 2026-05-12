import { motion } from "framer-motion";

const features = [
  {
    img: "/feat_delivery.png",
    title: "توصيل سريع",
    desc: "30 – 45 دقيقة",
    link: "تتبع الطلب",
  },
  {
    img: "/feat_payment.png",
    title: "الدفع عند الاستلام",
    desc: "ادفع لما يوصل",
    link: "آمن ومضمون",
  },
  {
    img: "/feat_support.jpg",
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
            className="flex flex-col items-center text-center cursor-pointer active:scale-95 transition-transform"
          >
            <div className="w-14 h-14 mb-2 flex items-center justify-center">
              <img
                src={f.img}
                alt={f.title}
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>
            <h4 className="text-[10px] font-black text-black mb-0.5 leading-tight">{f.title}</h4>
            <p className="text-[9px] text-gray-400 font-bold mb-1">{f.desc}</p>
            <span className="text-[9px] font-black text-[#DC2626]">{f.link} ←</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
