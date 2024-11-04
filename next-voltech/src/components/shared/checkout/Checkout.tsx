"use client";

import React from "react";
import classes from "./Checkout.module.css";
import TextField from "../../ui/Form/TextField";
import Link from "next/link";
import useOrderValidation from "@/shared/hooks/useOrderValidation";
import useOrderData from "@/shared/hooks/useOrderData";
import useCheckoutOrder from "@/shared/hooks/useCheckoutOrder";
import useChangeDataCheckout from "@/shared/hooks/useChangeDataCheckout";
import Loader from "@/components/ui/Loader/Loader";
import getWordEnding from "@/lib/word_ending";

const Checkout = () => {
  const { Setorder, clearBasket, order } = useOrderData();
  const { errors, validate } = useOrderValidation(order);
  const { HandleAddOrder } = useCheckoutOrder(order, clearBasket, validate);
  const { handleChange } = useChangeDataCheckout(Setorder);
  const isValid = Object.keys(errors).length === 0;

  if (!order) {
    return <Loader />;
  }

  return (
    <div className={classes.makingOrder}>
      <Link href="/basket" className={classes.BackToBasket}>
        Вернуться в корзину
      </Link>
      <p className={classes.titleOrder}>Оформление заказа</p>
      <p className={classes.titleDataConsignee}>Данные получателя</p>
      <form
        className={classes.Content__dataConsignee}
        action=""
        onSubmit={(e) => e.preventDefault()}
      >
        <TextField
          type="text"
          name="name"
          value={order.name}
          onChange={handleChange}
          placeholder="Имя"
          error={errors.name}
          customClass={classes.Content__InputName}
          customBlockClass={classes.blockinputClass}
        />
        <TextField
          type="text"
          name="number"
          value={order.number}
          onChange={handleChange}
          placeholder="Телефон (+7-777-777-77-77)"
          error={errors.number}
          customClass={classes.Content__InputPhone}
          customBlockClass={classes.blockinputClass}
        />
        <TextField
          type="text"
          name="surname"
          value={order.surname}
          onChange={handleChange}
          placeholder="Фамилия"
          error={errors.surname}
          customClass={classes.Content__InputSurname}
          customBlockClass={classes.blockinputClass}
        />
        <TextField
          type="text"
          name="address"
          value={order.address}
          onChange={handleChange}
          placeholder="Адрес (г.Уфа, ул.Славы 874, кв.753)"
          error={errors.address}
          customClass={classes.Content__InputAddress}
          customBlockClass={classes.blockinputClass}
        />
      </form>
      <p className={classes.Content__quantityProduct}>
        {getWordEnding(order.allCount, ["товар", "товара", "товаров"])}
      </p>
      <div className={classes.Content__resultOrder}>
        <p className={classes.Content__total}>Итого: </p>
        <p className={classes.Content__price}>
          {" "}
          {order.price.toLocaleString("ru-RU")}{" "}
        </p>
        <p className={classes.Content__currency}> ₽ </p>
      </div>
      <div className={classes.Content__arrangeOrder}>
        <button
          type="submit"
          onClick={HandleAddOrder}
          className={
            isValid ? classes.button_arrangeOrder : classes.button_isValid
          }
          disabled={!isValid}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
};

export default Checkout;
