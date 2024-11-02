import { FC, memo } from "react";
import classes from "./BlockPurchase.module.css";
import RenderPhrase from "@/lib/getProductWordEnding";
interface BlockPurchaseProps {
  totalPrice: number;
  totalQuantity: number;
  handleProceedToOrder: () => void;
}
const BlockPurchase: FC<BlockPurchaseProps> = ({
  totalPrice,
  totalQuantity,
  handleProceedToOrder,
}) => {
  // console.log("BlockPurchase 4");
  return (
    <div className={classes.basketContent__yourPurchases}>
      <p className={classes.basketContent__InyourBasket}>В корзине</p>
      <p className={classes.basketContent__qauantityOfProduct}>
        {totalQuantity} {RenderPhrase(totalQuantity)}
      </p>
      <div className={classes.basketContent__price}>
        <p className={classes.basketContent__totalPrice}>
          {totalPrice.toLocaleString("ru-RU")}
        </p>
        <p className={classes.basketContent__currencyPurchase}> ₽</p>
      </div>
      <button className={classes.button_confirm} onClick={handleProceedToOrder}>
        Перейти к оформлению
      </button>
    </div>
  );
};
export default memo(BlockPurchase);
