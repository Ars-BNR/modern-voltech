import { FC } from "react";
import classes from "./CardEquipment.module.css";
import { BasketItem } from "../../../../types/type";
import Link from "next/link";
import { useCardEquipment } from "@/shared/hooks/useCardEquipment";
import Minus from "@/public/assets/icons/Minus";
import Plus from "@/public/assets/icons/Plus";
import Trash from "@/public/assets/icons/Trash";
import Loader from "@/components/ui/Loader/Loader";
import Image from "next/image";
interface CardEquipmentProps {
  elbasketData: BasketItem;
}
const CardEquipment: FC<CardEquipmentProps> = ({ elbasketData }) => {
  const { loading, count, handleDecrement, handleDelete, handleIncrement } =
    useCardEquipment({ elbasketData });
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={classes.basketBlock}>
          <Link href={`/equipment/${elbasketData.id_equipment}`}>
            <div className={classes.basketBlock__equipImg}>
              <Image
                className={classes.equipImg}
                src={
                  "http://localhost:7000/img/" +
                  elbasketData.equipment.pathimg
                }
                alt={
                  elbasketData.equipment.brand + elbasketData.equipment.model
                }
                fill={true}
              />
            </div>
          </Link>
          <div className={classes.basketBlock_information}>
            <p className={classes.basketBlock_nameEquip}>
              {elbasketData.equipment.brand} {elbasketData.equipment.model}
            </p>
            <p className={classes.basketBlock__priceOfProduct}>
              {elbasketData.equipment.price.toLocaleString("ru-RU")}{" "}
              <span className="rub">₽</span>
            </p>
          </div>
          <div className={classes.basketBlock__blockCounter}>
            <div className={classes.minus__container} onClick={handleDecrement}>
              <Minus className={classes.basket__minus} />
            </div>
            <p className={classes.basket__count}>{count}</p>
            <div className={classes.minus__container} onClick={handleIncrement}>
              <Plus className={classes.basket__plus} />
            </div>
          </div>
          <div className={classes.basket__blockTrash} onClick={handleDelete}>
            <Trash className={""} />
          </div>
        </div>
      )}
    </>
  );
};
export default CardEquipment;
