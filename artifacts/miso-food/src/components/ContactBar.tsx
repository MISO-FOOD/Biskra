import { Phone, Clock, MapPin } from "lucide-react";

export default function ContactBar({ position }: { position: "top" | "bottom" }) {
  const isTop = position === "top";
  
  return (
    <div className={`bg-foreground text-background py-2 px-4 md:px-8 w-full z-50 shadow-md flex flex-wrap items-center justify-between gap-y-2 gap-x-6 text-sm font-semibold ${isTop ? 'sticky top-0 border-b border-white/10' : 'border-t border-white/10'}`}>
      <div className="flex items-center gap-6 overflow-x-auto w-full md:w-auto justify-center md:justify-start">
        <a href="tel:0793149538" className="flex items-center gap-2 hover:text-primary transition-colors">
          <Phone className="w-4 h-4 text-primary" />
          <span dir="ltr">0793149538 / 0784291828</span>
        </a>
        <div className="flex items-center gap-2 text-muted/80">
          <Clock className="w-4 h-4 text-primary" />
          <span>10:30 صباحاً الى 9:00 ليلاً</span>
        </div>
        <div className="flex items-center gap-2 text-muted/80">
          <MapPin className="w-4 h-4 text-primary" />
          <span>حي سايحي 2</span>
        </div>
      </div>
      
      {isTop && (
        <a 
          href="tel:0793149538"
          className="hidden md:inline-flex bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold shadow-sm hover:scale-105 active:scale-95 transition-transform"
        >
          اطلب الآن
        </a>
      )}
    </div>
  );
}