import { MapPin, UtensilsCrossed, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const { totalItems } = useCart();

  const tabs = [
    { id: "location", label: "الموقع", icon: MapPin },
    { id: "menu", label: "القائمة", icon: UtensilsCrossed },
    { id: "cart", label: "السلة", icon: ShoppingCart, isCenter: true },
    { id: "account", label: "حسابي", icon: User },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-2xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      data-testid="bottom-nav"
    >
      <div className="flex items-center justify-around h-16 px-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.isCenter) {
            return (
              <button
                key={tab.id}
                data-testid={`nav-${tab.id}`}
                onClick={() => onTabChange(tab.id)}
                className="flex flex-col items-center relative -mt-6"
              >
                <div className="relative w-14 h-14 rounded-full bg-[#DC2626] flex items-center justify-center shadow-xl border-4 border-white">
                  <Icon className="w-6 h-6 text-white" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FFC107] text-black text-[10px] font-black rounded-full flex items-center justify-center leading-none">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-bold text-[#DC2626] mt-1">{tab.label}</span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              data-testid={`nav-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-1 flex-1 py-1"
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-[#DC2626]" : "text-gray-400"}`} />
              <span className={`text-[10px] font-bold ${isActive ? "text-[#DC2626]" : "text-gray-400"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
