import { useCallback, useEffect } from "react";
import { BasketStore } from "../store/basket";
import basketService from "../service/basket-service";

const useBasket = (userId: number | undefined) => {
  const basketData = BasketStore((state) => state.items);
  const setBasketData = BasketStore((state) => state.setBasketData);
  const updateTotals = BasketStore((state) => state.updateTotals);

  const handleShowBasket = useCallback(async () => {
    try {
      if (!userId) {
        console.error("ID пользователя не найден");
        return;
      }
      console.log(userId, "userId");

      if (userId) {
        const response = userId && (await basketService.get(userId));
        setBasketData(response);
      }
    } catch (error) {
      console.error(error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      handleShowBasket();
      // console.log(basketData, "basketData");
    }
  }, [userId]);

  useEffect(() => {
    if (basketData.length > 0) {
      updateTotals();
    }
  }, [basketData]);
  return { basketData };
};

export default useBasket;
