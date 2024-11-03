import { create } from "zustand";
import { BasketItem } from "../../types/type";

interface BasketState {
  items: BasketItem[];
  totalQuantity: number;
  totalPrice: number;
  setBasketData: (items: BasketItem[]) => void;
  handleIncrement: (id_equipment: number) => void;
  handleDecrement: (id_equipment: number) => void;
  handleDelete: (id_equipment: number) => void;
  updateTotals: () => void;
}

export const BasketStore = create<BasketState>((set) => ({
  items: [],
  totalQuantity: 0,
  totalPrice: 0,

  setBasketData: (items: BasketItem[]) =>
    set(() => ({
      items,
    })),

  handleIncrement: (id_equipment: number) =>
    set((state) => {
      const item = state.items.find(
        (item) => item.id_equipment === id_equipment
      );
      if (item) {
        item.count += 1;
      }
      return { items: [...state.items] };
    }),

  handleDecrement: (id_equipment: number) =>
    set((state) => {
      const item = state.items.find(
        (item) => item.id_equipment === id_equipment
      );
      if (item && item.count >= 1) {
        item.count -= 1;
      }
      return { items: [...state.items] };
    }),

  handleDelete: (id_equipment: number) =>
    set((state) => ({
      items: state.items.filter((item) => item.id_equipment !== id_equipment),
    })),

  updateTotals: () =>
    set((state) => {
      const totalQuantity = state.items.reduce(
        (acc, item) => acc + item.count,
        0
      );
      const totalPrice = state.items.reduce((total, item) => {
        const price = item.equipment.price;
        return total + price * item.count;
      }, 0);
      return { totalQuantity, totalPrice };
    }),
}));
