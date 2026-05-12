import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryTabs from "@/components/CategoryTabs";
import MenuGrid from "@/components/MenuGrid";
import CartSection from "@/components/CartSection";
import BottomNav from "@/components/BottomNav";
import type { Category } from "@/data/menu";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("sandwiches");
  const [activeTab, setActiveTab] = useState("menu");

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col max-w-md mx-auto relative">
      <Navbar />

      <main className="flex-1 overflow-y-auto pb-24">
        {/* Hero always visible */}
        <HeroCarousel />

        {activeTab === "menu" || activeTab === "location" || activeTab === "account" ? (
          <>
            <div className="bg-white mt-2 rounded-t-2xl shadow-sm">
              <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
            </div>
            <div className="bg-white mt-1 rounded-2xl shadow-sm mx-0 pt-3">
              <MenuGrid category={activeCategory} />
            </div>
          </>
        ) : null}

        {activeTab === "cart" && (
          <div className="bg-white mt-2 rounded-2xl shadow-sm pt-3">
            <CartSection />
          </div>
        )}

        {activeTab === "location" && (
          <div className="mt-2 bg-white rounded-2xl shadow-sm p-4 mx-3">
            <h2 className="font-black text-base mb-3">موقع المحل</h2>
            <div className="bg-gray-100 rounded-xl h-40 flex items-center justify-center text-gray-400 font-bold">
              حي سايحي 2
            </div>
            <p className="mt-3 text-sm font-bold text-gray-600">حي سايحي 2 — ساعات العمل: 10:30 الى 9:00 ليل</p>
            <a
              href="https://maps.google.com"
              className="mt-3 flex items-center justify-center gap-2 bg-[#FFC107] text-black font-black text-sm py-3 rounded-xl w-full active:scale-95 transition-transform"
            >
              فتح الخريطة
            </a>
          </div>
        )}

        {activeTab === "account" && (
          <div className="mt-2 bg-white rounded-2xl shadow-sm p-6 mx-3 text-center">
            <div className="w-16 h-16 rounded-full bg-[#FFC107] flex items-center justify-center mx-auto mb-3 text-2xl font-black">
              م
            </div>
            <p className="font-black text-base">مرحباً بك في ميسو فود</p>
            <p className="text-gray-400 text-sm mt-1">اتصل بنا للطلب</p>
            <a
              href="tel:0793149538"
              className="mt-4 flex items-center justify-center gap-2 bg-[#DC2626] text-white font-black text-sm py-3 rounded-xl w-full active:scale-95 transition-transform"
              dir="ltr"
            >
              0793 14 95 38
            </a>
            <a
              href="tel:0784291828"
              className="mt-2 flex items-center justify-center gap-2 bg-[#DC2626] text-white font-black text-sm py-3 rounded-xl w-full active:scale-95 transition-transform"
              dir="ltr"
            >
              0784 29 18 28
            </a>
          </div>
        )}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
