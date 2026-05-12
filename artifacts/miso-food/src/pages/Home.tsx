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
import PopularSection from "@/components/PopularSection";
import FloatingTelegram from "@/components/FloatingWhatsApp";
import FloatingCartBar from "@/components/FloatingCartBar";
import type { Category } from "@/data/menu";
import { ClipboardList } from "lucide-react";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -16 },
};

const pageTransition = { type: "tween", ease: "easeOut", duration: 0.25 };

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("sandwiches");
  const [activeTab, setActiveTab] = useState("home");

  const handleTabChange = (tab: string) => {
    if (tab === "menu") {
      setActiveCategory("sandwiches");
    }
    setActiveTab(tab);
  };

  const goToCart = () => setActiveTab("cart");

  return (
    <div className="min-h-[100dvh] bg-[#F5F5F5] flex flex-col max-w-[480px] w-full mx-auto relative overflow-hidden pb-[90px]">
      <Navbar />

      <main className="flex-1 overflow-y-auto no-scrollbar w-full">
        <AnimatePresence mode="wait">

          {/* HOME */}
          {activeTab === "home" && (
            <motion.div key="home" initial="initial" animate="in" exit="out"
              variants={pageVariants} transition={pageTransition} className="flex flex-col">
              <div className="pt-3">
                <DeliveryBar />
              </div>
              <HeroCarousel />
              <FeaturesBar />
              <PopularSection />
              <div className="bg-white rounded-t-[28px] shadow-sm mt-1 pt-3">
                <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
                <MenuGrid category={activeCategory} />
              </div>
            </motion.div>
          )}

          {/* MENU — always starts on sandwiches */}
          {activeTab === "menu" && (
            <motion.div key="menu" initial="initial" animate="in" exit="out"
              variants={pageVariants} transition={pageTransition} className="flex flex-col pt-3">
              <div className="bg-white rounded-2xl mx-4 shadow-sm pt-3 mb-1">
                <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
              </div>
              <MenuGrid category={activeCategory} />
            </motion.div>
          )}

          {/* CART */}
          {activeTab === "cart" && (
            <motion.div key="cart" initial="initial" animate="in" exit="out"
              variants={pageVariants} transition={pageTransition} className="flex flex-col">
              <CartSection />
            </motion.div>
          )}

          {/* HISTORY */}
          {activeTab === "history" && (
            <motion.div key="history" initial="initial" animate="in" exit="out"
              variants={pageVariants} transition={pageTransition}
              className="flex flex-col items-center justify-center py-32 px-6 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-gray-100"
              >
                <ClipboardList className="w-12 h-12 text-gray-300" strokeWidth={1.5} />
              </motion.div>
              <p className="text-black font-black text-xl mb-1">لا توجد طلبات سابقة</p>
              <p className="text-gray-400 font-bold text-sm">قم بإجراء طلبك الأول لتظهر هنا</p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTabChange("menu")}
                className="mt-6 bg-[#FFC107] text-black font-black px-8 py-3 rounded-2xl shadow-md"
              >
                تصفح القائمة
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {activeTab !== "cart" && <FloatingCartBar onOpenCart={goToCart} />}
      <FloatingTelegram />
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
