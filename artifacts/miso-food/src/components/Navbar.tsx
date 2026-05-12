import { Menu, Phone } from "lucide-react";
import mascotImg from "@assets/image_1778558012694.png";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-[#FFC107] shadow-md" data-testid="navbar">
      <div className="flex items-center justify-between px-3 h-14 max-w-md mx-auto">
        <button
          data-testid="nav-hamburger"
          className="w-9 h-9 rounded-xl bg-black/10 flex items-center justify-center active:scale-90 transition-transform"
        >
          <Menu className="w-5 h-5 text-black" />
        </button>

        <div className="flex items-center gap-1">
          <span className="text-xl font-black text-black tracking-tight">MISO</span>
          <img src={mascotImg} alt="mascot" className="w-8 h-8 object-contain" />
          <span className="text-xl font-black text-[#DC2626] tracking-tight">FOOD</span>
        </div>

        <a
          href="tel:0793149538"
          data-testid="nav-call"
          className="flex items-center gap-1.5 bg-[#DC2626] text-white font-black text-xs px-3 py-2 rounded-xl shadow active:scale-90 transition-transform"
        >
          <Phone size={13} />
          <span>اتصل الآن</span>
        </a>
      </div>
    </header>
  );
}
