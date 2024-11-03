"use client";

import { FC } from "react";
import classes from "./BasketPage.module.css";
import CardEquipment from "./cardEquipment/CardEquipment";
import BlockPurchase from "./blockPurchase/BlockPurchase";
import Loader from "@/components/ui/Loader/Loader";
import useBasket from "@/shared/hooks/useBasket";
import useOrder from "@/shared/hooks/useOrder";
import AuthStore from "@/shared/store/auth";

const Basket: FC = () => {
  const user = AuthStore((state) => state.profiles.user);
  const { basketData } = useBasket(user?.id);
  const { handleProceedToOrder, totalPrice, totalQuantity, router } =
    useOrder();

  const backToMain = () => {
    router.back();
  };
  if (!user?.id) {
    return <Loader />;
  }
  return (
    <div className={classes.basketPage}>
      <p onClick={backToMain} className={classes.backToMainPage}>
        Вернуться каталог
      </p>
      <p className={classes.titlebasket}>Корзина</p>
      <div className={classes.basketContent}>
        {basketData.length === 0 ? (
          <p className={classes.emptyBasket}>
            Ваша корзина пуста, выберите товары для покупки.
          </p>
        ) : (
          <>
            <div className={classes.basketContent__list}>
              {basketData.map((elbasketData) => (
                <CardEquipment
                  elbasketData={elbasketData}
                  key={elbasketData.id_equipment}
                />
              ))}
            </div>
            <BlockPurchase
              totalPrice={totalPrice}
              totalQuantity={totalQuantity}
              handleProceedToOrder={handleProceedToOrder}
            />
          </>
        )}
      </div>
    </div>
  );
};
export default Basket;
