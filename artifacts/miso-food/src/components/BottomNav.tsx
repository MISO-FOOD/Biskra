import { Home as HomeIcon, UtensilsCrossed, ShoppingCart, ClipboardList } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/useCart";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const { totalItems } = useCart();

  const tabs = [
    { id: "home", label: "الرئيسية", icon: HomeIcon },
    { id: "menu", label: "القائمة", icon: UtensilsCrossed },
    { id: "cart", label: "السلة", icon: ShoppingCart, isCenter: true },
    { id: "history", label: "طلباتي", icon: ClipboardList },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.08)] rounded-t-[30px]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-end justify-between h-20 px-6 pb-4 max-w-[480px] w-full mx-auto relative">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.isCenter) {
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="relative flex flex-col items-center justify-center w-16 -mt-8 mx-2 active:scale-95 transition-transform"
              >
                <div className="absolute -top-1 w-[72px] h-[72px] bg-[#F5F5F5] rounded-full -z-10" />
                <motion.div 
                  className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors ${isActive ? 'bg-[#FFC107]' : 'bg-[#DC2626]'}`}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'text-black' : 'text-white'}`} strokeWidth={2.5} />
                  
                  <AnimatePresence>
                    {totalItems > 0 && (
                      <motion.span 
                        key="badge"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                      >
                        {totalItems}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
                <span className={`text-[10px] font-black mt-1.5 ${isActive ? "text-black" : "text-gray-400"}`}>
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center gap-1.5 flex-1 h-full pt-4"
            >
              <div className="relative">
                <Icon className={`w-6 h-6 transition-colors duration-300 ${isActive ? "text-black" : "text-gray-400"}`} strokeWidth={isActive ? 2.5 : 2} />
                {isActive && (
                  <motion.div 
                    layoutId="bottomNavDot"
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FFC107]"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
              <span className={`text-[10px] transition-colors duration-300 ${isActive ? "font-black text-black" : "font-bold text-gray-400"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
