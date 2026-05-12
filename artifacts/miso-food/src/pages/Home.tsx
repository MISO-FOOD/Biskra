import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import ContactBar from "@/components/ContactBar";
import { PhoneCall } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <ContactBar position="top" />
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <MenuSection />
      </main>

      {/* Floating Action Button for mobile */}
      <a 
        href="tel:0793149538"
        className="fixed bottom-24 right-6 md:hidden z-50 bg-secondary text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-transform"
      >
        <PhoneCall className="w-8 h-8 animate-pulse" />
      </a>

      {/* Bottom Footer Info */}
      <footer id="contact" className="bg-foreground text-background pt-16 pb-8 border-t-[8px] border-primary">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12 text-center md:text-start">
            <div>
              <h3 className="text-2xl font-black text-primary mb-4">MISO FOOD</h3>
              <p className="text-muted/80 font-bold max-w-sm mx-auto md:mx-0">
                أقوى المطاعم المتخصصة في السندويتشات والأطباق السريعة في الجزائر. طعم لا ينسى، وجودة لا تضاهى.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-start gap-4 font-bold text-lg">
              <h4 className="text-xl font-black text-white/50 mb-2">أرقام التوصيل</h4>
              <a href="tel:0793149538" className="hover:text-primary transition-colors text-2xl" dir="ltr">0793 14 95 38</a>
              <a href="tel:0784291828" className="hover:text-primary transition-colors text-2xl" dir="ltr">0784 29 18 28</a>
            </div>

            <div className="flex flex-col items-center md:items-start gap-4 font-bold text-lg">
              <h4 className="text-xl font-black text-white/50 mb-2">أوقات العمل</h4>
              <p>من 10:30 صباحاً</p>
              <p>الى 9:00 ليلاً</p>
              <p className="text-primary mt-2">حي سايحي 2</p>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-white/50 font-bold text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} Miso Food. جميع الحقوق محفوظة.</p>
            <p>صنع بشغف للجوعانين 🍔</p>
          </div>
        </div>
      </footer>
    </div>
  );
}