import { motion } from "framer-motion";
import mascotImg from "@assets/image_1778558012694.png";
import characterImg from "@assets/9234fbd5-e674-4351-b2f4-5fa668766ba7_1778558095088.png";
import { PhoneCall } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[85dvh] flex items-center bg-primary overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-300 via-primary to-yellow-600 opacity-60"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10 grid md:grid-cols-2 gap-8 items-center py-12 md:py-0">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-start gap-6 text-foreground"
        >
          <div className="inline-block bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm md:text-base font-bold shadow-md mb-2 transform -rotate-2">
            مذاق الشارع الجزائري الحقيقي 🔥
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight drop-shadow-md">
            الجوع يغلب؟ <br/>
            <span className="text-secondary">ميسو فود</span> يحلها!
          </h2>
          <p className="text-lg md:text-2xl font-bold text-foreground/80 max-w-lg leading-relaxed">
            أقوى السندويتشات، شاورما، مرقاز، كبدة، وفريت فخمة محشية بالبنة. مستني إيه؟
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <a 
              href="tel:0793149538" 
              className="flex items-center gap-3 bg-foreground text-background hover:bg-secondary hover:text-white px-8 py-4 rounded-xl text-xl font-black transition-all shadow-xl hover:shadow-secondary/50 hover:-translate-y-1 active:scale-95"
            >
              <PhoneCall className="w-6 h-6 animate-pulse" />
              اطلب دليفري الآن
            </a>
            <a 
              href="#menu"
              className="px-8 py-4 rounded-xl text-xl font-bold text-foreground border-2 border-foreground/20 hover:bg-foreground/5 transition-colors"
            >
              شوف القائمة
            </a>
          </div>
        </motion.div>

        {/* Image/Mascot */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="relative flex justify-center items-center mt-12 md:mt-0"
        >
          <div className="absolute w-64 h-64 md:w-96 md:h-96 bg-white/20 rounded-full blur-3xl"></div>
          <img 
            src={mascotImg} 
            alt="Miso Food Mascot Dabbing" 
            className="w-full max-w-[400px] md:max-w-[500px] object-contain drop-shadow-2xl relative z-10"
            style={{ filter: "drop-shadow(0 25px 25px rgba(0,0,0,0.3))" }}
          />
        </motion.div>
      </div>
    </section>
  );
}