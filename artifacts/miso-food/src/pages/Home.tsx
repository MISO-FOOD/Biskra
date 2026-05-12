import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import DeliveryBar from "@/components/DeliveryBar";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryTabs from "@/components/CategoryTabs";
import MenuGrid from "@/components/MenuGrid";
import FeaturesBar from "@/components/FeaturesBar";
import CartSection from "@/components/CartSection";
import BottomNav from "@/components/BottomNav";
import type { Category } from "@/data/menu";
import { ClipboardList } from "lucide-react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("sandwiches");
  const [activeTab, setActiveTab] = useState("home");

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.3
  };

  return (
    <div className="min-h-[100dvh] bg-[#F5F5F5] flex flex-col max-w-[480px] w-full mx-auto relative overflow-hidden pb-[90px]">
      <Navbar />
      
      <main className="flex-1 overflow-y-auto no-scrollbar w-full">
        <AnimatePresence mode="wait">
          {/* HOME TAB */}
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="flex flex-col"
            >
              <div className="pt-3 pb-1">
                <DeliveryBar />
              </div>
              <HeroCarousel />
              <FeaturesBar />
              <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
              <MenuGrid category={activeCategory} />
            </motion.div>
          )}

          {/* MENU TAB */}
          {activeTab === "menu" && (
            <motion.div
              key="menu"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="flex flex-col pt-3"
            >
              <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
              <MenuGrid category={activeCategory} />
            </motion.div>
          )}

          {/* CART TAB */}
          {activeTab === "cart" && (
            <motion.div
              key="cart"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="flex flex-col"
            >
              <CartSection />
            </motion.div>
          )}

          {/* HISTORY TAB */}
          {activeTab === "history" && (
            <motion.div
              key="history"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="flex flex-col items-center justify-center py-32 px-6 text-center"
            >
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-gray-100">
                <ClipboardList className="w-12 h-12 text-gray-300" strokeWidth={1.5} />
              </div>
              <p className="text-black font-black text-xl mb-1">لا توجد طلبات سابقة</p>
              <p className="text-gray-400 font-bold text-sm">قم بإجراء طلبك الأول لتظهر هنا</p>
              <button 
                onClick={() => setActiveTab("menu")}
                className="mt-6 bg-[#FFC107] text-black font-black px-6 py-3 rounded-xl active:scale-95 transition-transform"
              >
                تصفح القائمة
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
