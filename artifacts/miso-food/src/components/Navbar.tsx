import { Menu, Search, Bell, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import mascotImg from "@assets/image_1778558012694.png";

export default function Navbar() {
  const { totalItems, total } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-[#FFC107] shadow-sm h-14 max-w-[480px] w-full mx-auto" data-testid="navbar">
      <div className="flex items-center justify-between px-4 h-full">
        {/* Left: Hamburger */}
        <button
          data-testid="nav-hamburger"
          className="w-10 h-10 rounded-xl bg-black/10 hover:bg-black/15 flex items-center justify-center active:scale-95 transition-all"
        >
          <Menu className="w-5 h-5 text-black" strokeWidth={2.5} />
        </button>

        {/* Center: Logo */}
        <div className="flex items-center gap-1.5 ml-2">
          <span className="text-xl font-black text-black tracking-tighter">MISO</span>
          <img src={mascotImg} alt="Miso Mascot" className="w-8 h-8 object-contain drop-shadow-sm" />
          <span className="text-xl font-black text-[#DC2626] tracking-tighter">FOOD</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button className="text-black hover:text-[#DC2626] transition-colors active:scale-95">
            <Search className="w-5 h-5" strokeWidth={2.5} />
          </button>
          
          <button className="relative text-black hover:text-[#DC2626] transition-colors active:scale-95">
            <Bell className="w-5 h-5" strokeWidth={2.5} />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#DC2626] border-2 border-[#FFC107] rounded-full text-white flex items-center justify-center text-[8px] font-black">
              3
            </span>
          </button>

          <button className="flex items-center gap-2 bg-white rounded-full pl-3 pr-1.5 py-1.5 shadow-sm active:scale-95 transition-all border border-black/5 hover:border-black/10">
            <div className="flex flex-col items-end leading-none">
              <span className="text-[10px] text-gray-500 font-bold">{totalItems} طلبات</span>
              <span className="text-[11px] font-black text-[#DC2626]">{total} دج</span>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#FFC107] flex items-center justify-center">
              <ShoppingCart className="w-3.5 h-3.5 text-black" strokeWidth={2.5} />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
