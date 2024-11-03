"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthStore from "@/shared/store/auth";
import basketService from "@/shared/service/basket-service";

const useAddToBasket = () => {
  const router = useRouter();
  const dataProfiles = AuthStore((state) => state.profiles);

  const HandleAddBasket = async (id_equipment: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error(
        "Чтобы добавить товар в корзину, вам необходимо зарегистрироваться."
      );
      router.push("/registration");
      return;
    }
    try {
      const idUsers = dataProfiles?.user.id;
      await basketService.post({
        id_equipment: id_equipment,
        id_user: idUsers,
        count: 1,
      });
      toast.success("Товар добавлен в корзину");
    } catch (error) {
      console.log(error);
    }
  };

  return { HandleAddBasket };
};

export default useAddToBasket;
