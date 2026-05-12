import { createContext, useContext, useState, useCallback } from "react";
import type { MenuItem } from "@/data/menu";

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  total: number;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  progressToFreeDelivery: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: MenuItem) => {
    setItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((ci) => ci.item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((ci) => ci.item.id !== id));
    } else {
      setItems((prev) =>
        prev.map((ci) => (ci.item.id === id ? { ...ci, quantity: qty } : ci))
      );
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((s, ci) => s + ci.quantity, 0);
  const subtotal = items.reduce((s, ci) => s + ci.item.price * ci.quantity, 0);
  
  const freeDeliveryThreshold = 1500;
  const deliveryFee = subtotal >= freeDeliveryThreshold ? 0 : 100;
  const total = subtotal > 0 ? subtotal + deliveryFee : 0;
  const progressToFreeDelivery = Math.min(subtotal / freeDeliveryThreshold, 1);

  return (
    <CartContext.Provider
      value={{ 
        items, 
        addItem, 
        removeItem, 
        updateQuantity, 
        clearCart, 
        totalItems, 
        subtotal, 
        total, 
        deliveryFee,
        freeDeliveryThreshold,
        progressToFreeDelivery
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
