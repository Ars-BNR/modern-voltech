"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import basketService from "../service/basket-service";
import AuthStore from "../store/auth";
import { BasketItem, IInfoOrder } from "@/types/type";

const useOrderData = () => {
  const profiles = AuthStore((state) => state.profiles.user);
  const [order, Setorder] = useState<IInfoOrder>({
    name: "",
    surname: "",
    number: "",
    address: "",
    id_user: profiles.id ?? 0,
    price: 1,
    allCount: 1,
    info: [] as BasketItem[],
  });

  const handleShowBasket = async () => {
    try {
      const idUsers = profiles.id;
      if (order.price !== 0 && order.allCount !== 0) {
        const response = idUsers && (await basketService.get(idUsers));
        const ordersData = response;
        Setorder((prevOrder) => ({ ...prevOrder, info: ordersData }));
      } else {
        toast.error("Не делай вид что ты обманул систему");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clearBasket = async () => {
    try {
      const idUsers = profiles.id;
      if (idUsers) {
        await basketService.clearbasket(idUsers);
        localStorage.removeItem("TotalQuantity");
        localStorage.removeItem("totalPrice");
      }
    } catch (error) {
      console.error("Ошибка при очистке корзины", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const totalPrice = parseFloat(localStorage.getItem("totalPrice") || "0");
      const totalQuantity = parseInt(
        localStorage.getItem("TotalQuantity") || "0"
      );

      Setorder((prevOrder) => ({
        ...prevOrder,
        price: totalPrice,
        allCount: totalQuantity,
      }));
      profiles.id && handleShowBasket();
    }
  }, []);

  return { order, Setorder, clearBasket, handleShowBasket };
};
export default useOrderData;
