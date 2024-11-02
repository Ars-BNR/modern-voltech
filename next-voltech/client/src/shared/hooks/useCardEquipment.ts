import { BasketItem } from "@/types/type";
import basketService from "../service/basket-service";
import AuthStore from "../store/auth";
import { BasketStore } from "../store/basket";
import { useState } from "react";
interface Props {
  elbasketData: BasketItem;
}
export const useCardEquipment = ({ elbasketData }: Props) => {
  const [loading, setLoading] = useState(false);
  const profiles = AuthStore((state) => state.profiles.user);
  const increment = BasketStore((state) => state.handleIncrement);
  const decrement = BasketStore((state) => state.handleDecrement);
  const deleteItem = BasketStore((state) => state.handleDelete);

  console.log("Custom card hook work");
  const handleIncrement = async () => {
    try {
      setLoading(true);
      const idUsers = profiles.id;
      await basketService.post({
        id_equipment: elbasketData.id_equipment,
        id_user: idUsers,
        count: 1,
      });
      increment(elbasketData.id_equipment);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleDecrement = async () => {
    if (elbasketData.count > 1) {
      setLoading(true);
      try {
        const idUsers = profiles.id;
        await basketService.decreasebasket({
          id_equipment: elbasketData.id_equipment,
          id_user: idUsers,
        });
        decrement(elbasketData.id_equipment);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };
  const handleDelete = async () => {
    try {
      setLoading(true);
      const idUsers = profiles.id;
      await basketService.deletebasket({
        id_equipment: elbasketData.id_equipment,
        id_user: idUsers,
      });
      deleteItem(elbasketData.id_equipment);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    handleDecrement,
    handleIncrement,
    handleDelete,
    count: elbasketData.count,
    loading,
  };
};
