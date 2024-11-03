import { useRouter } from "next/navigation";
import { BasketStore } from "../store/basket";

const useOrder = () => {
  const router = useRouter();
  const totalQuantity = BasketStore((state) => state.totalQuantity);
  const totalPrice = BasketStore((state) => state.totalPrice);
  const handleProceedToOrder = () => {
    localStorage.setItem("totalPrice", totalPrice.toString());
    localStorage.setItem("TotalQuantity", totalQuantity.toString());
    router.push("/checkout");
  };
  return {
    handleProceedToOrder,
    totalQuantity,
    totalPrice,
    router,
  };
};
export default useOrder;
