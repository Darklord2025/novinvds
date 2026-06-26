import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { toast } from '@/components/ui/use-toast';

export type CartItem = {
  id: string;
  name: string;
  type: 'vps' | 'hosting' | 'dedicated' | 'domain' | 'license' | 'addon';
  price: number;
  period: string;
  quantity: number;
  specs?: string[];
  meta?: Record<string, any>;
};

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clear: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setItems(prev => {
      const existing = prev.find(p => p.id === item.id);
      if (existing) {
        return prev.map(p => p.id === item.id ? { ...p, quantity: p.quantity + (item.quantity || 1) } : p);
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
    toast({ title: 'به سبد خرید اضافه شد', description: item.name });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(p => p.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setItems(prev => prev.map(p => p.id === id ? { ...p, quantity: Math.max(1, p.quantity + delta) } : p));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clear, total, count }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
