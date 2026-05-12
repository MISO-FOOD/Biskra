import { useState } from "react";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { MENU_ITEMS } from "@/data/menu";
import mascotImg from "@assets/image_1778558012694.png";

export default function Navbar() {
  const { totalItems, total, addItem } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = query.trim().length > 0
    ? MENU_ITEMS.filter((m) => m.name.includes(query) || (m.description ?? "").includes(query))
    : [];

  const closeSearch = () => { setSearchOpen(false); setQuery(""); };

  return (
    <>
      <header
        className="sticky top-0 z-40 max-w-[480px] w-full mx-auto"
        data-testid="navbar"
        style={{ background: "linear-gradient(135deg, #FFC107 0%, #FFD54F 100%)", boxShadow: "0 2px 16px rgba(255,193,7,0.35)" }}
      >
        <div className="flex items-center justify-between px-3 h-14 gap-2">
          {/* Left side */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <motion.button
              data-testid="nav-hamburger"
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-xl bg-black/10 flex items-center justify-center"
            >
              <Menu className="w-5 h-5 text-black" strokeWidth={2.5} />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 rounded-xl bg-black/10 flex items-center justify-center"
            >
              <Search className="w-4 h-4 text-black" strokeWidth={2.5} />
            </motion.button>
          </div>

          {/* Center: Logo */}
          <div className="flex items-center gap-1 flex-1 justify-center">
            <span className="text-[20px] font-black text-black tracking-tighter leading-none">MISO</span>
            <img src={mascotImg} alt="Miso" className="w-8 h-8 object-contain drop-shadow-md" />
            <span className="text-[20px] font-black text-[#DC2626] tracking-tighter leading-none">FOOD</span>
          </div>

          {/* Right: Cart pill */}
          <div className="flex-shrink-0">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-2xl px-2.5 py-1.5 shadow-sm border border-white/50"
            >
              <div className="flex flex-col items-end leading-none gap-0.5">
                <span className="text-[9px] text-gray-500 font-bold">{totalItems} عناصر</span>
                <span className="text-[11px] font-black text-[#DC2626]">{total.toLocaleString()} دج</span>
              </div>
              <div className="relative w-7 h-7 rounded-full bg-[#FFC107] flex items-center justify-center shadow-inner">
                <ShoppingCart className="w-3.5 h-3.5 text-black" strokeWidth={2.5} />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#DC2626] text-white text-[8px] font-black rounded-full flex items-center justify-center border border-white"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            key="search"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex flex-col max-w-[480px] mx-auto left-0 right-0"
            onClick={(e) => { if (e.target === e.currentTarget) closeSearch(); }}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="bg-white rounded-b-3xl shadow-2xl px-4 pt-14 pb-5"
            >
              <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
                <Search size={18} className="text-gray-400" strokeWidth={2} />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ابحث في القائمة..."
                  className="flex-1 bg-transparent text-black font-bold text-sm placeholder-gray-400 outline-none text-right"
                />
                <motion.button whileTap={{ scale: 0.9 }} onClick={closeSearch}>
                  <X size={18} className="text-gray-400" />
                </motion.button>
              </div>
            </motion.div>

            {results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white mx-4 mt-3 rounded-3xl shadow-xl overflow-hidden max-h-[55vh] overflow-y-auto no-scrollbar"
              >
                {results.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => { addItem(item); closeSearch(); }}
                    className="w-full flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0 active:bg-gray-50 transition-colors text-right"
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-[#FFF9E6]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-black truncate">{item.name}</p>
                      {item.description && <p className="text-xs text-gray-400 font-bold truncate">{item.description}</p>}
                    </div>
                    <div className="text-[#DC2626] font-black text-sm shrink-0">{item.price} دج</div>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {query.trim().length > 0 && results.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mx-4 mt-3 bg-white rounded-3xl p-8 text-center shadow-xl"
              >
                <p className="text-gray-400 font-bold">لا توجد نتائج لـ "{query}"</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
