import { createContext } from "react";

export interface CartItem {
  item: import("@/data/menu").MenuItem;
  quantity: number;
  cartKey: string;
  size?: import("@/data/menu").SizeKey;
  sizeLabel?: string;
  sizePrice: number;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (item: import("@/data/menu").MenuItem, size?: import("@/data/menu").SizeKey, sizePrice?: number) => void;
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

export const CartContext = createContext<CartContextType | null>(null);
