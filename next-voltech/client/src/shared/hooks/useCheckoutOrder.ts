"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import orderService from "../service/order-service";
import { IInfoOrder } from "@/types/type";

const useCheckoutOrder = (
  order: IInfoOrder,
  clearBasket: () => void,
  validate: () => Promise<boolean>
) => {
  const router = useRouter();

  const HandleAddOrder = async () => {
    const { name, number, surname, address } = order;
    if (!name || !number || !surname || !address) {
      toast.error("Заполните все  данные получателя");
      return;
    }
    const isValid = validate();
    if (!isValid) return;

    try {
      if (
        order.price !== 0 &&
        order.allCount !== 0 &&
        order.info.length !== 0
      ) {
        await orderService.post(order);
        // console.log(response);
        clearBasket();
        toast.success(
          "Заказ добавлен, проверьте заказы в личном кабинете заказов."
        );
        router.replace("/");
      } else {
        toast.error("Купите что-нибудь чтобы перейти на эту страницу");
      }
    } catch (error) {
      console.log("ошибка с Оформлением заказа", error);
    }
  };
  return { HandleAddOrder };
};

export default useCheckoutOrder;
