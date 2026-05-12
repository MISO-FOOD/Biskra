import { createContext, useContext, useState, useCallback } from "react";
import type { MenuItem, SizeKey } from "@/data/menu";
import { SIZE_LABELS } from "@/data/menu";

export interface CartItem {
  item: MenuItem;
  quantity: number;
  cartKey: string;     // unique: item.id + '-' + size
  size?: SizeKey;
  sizeLabel?: string;
  sizePrice: number;   // actual price for chosen size
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem, size?: SizeKey, sizePrice?: number) => void;
  removeItem: (cartKey: string) => void;
  updateQuantity: (cartKey: string, qty: number) => void;
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

  const addItem = useCallback((item: MenuItem, size?: SizeKey, sizePrice?: number) => {
    const resolvedPrice = sizePrice ?? item.price;
    const cartKey = size ? `${item.id}-${size}` : item.id;
    const sizeLabel = size ? SIZE_LABELS[size] : undefined;

    setItems((prev) => {
      const existing = prev.find((ci) => ci.cartKey === cartKey);
      if (existing) {
        return prev.map((ci) =>
          ci.cartKey === cartKey ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1, cartKey, size, sizeLabel, sizePrice: resolvedPrice }];
    });
  }, []);

  const removeItem = useCallback((cartKey: string) => {
    setItems((prev) => prev.filter((ci) => ci.cartKey !== cartKey));
  }, []);

  const updateQuantity = useCallback((cartKey: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((ci) => ci.cartKey !== cartKey));
    } else {
      setItems((prev) =>
        prev.map((ci) => (ci.cartKey === cartKey ? { ...ci, quantity: qty } : ci))
      );
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((s, ci) => s + ci.quantity, 0);
  const subtotal = items.reduce((s, ci) => s + ci.sizePrice * ci.quantity, 0);

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
        progressToFreeDelivery,
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
