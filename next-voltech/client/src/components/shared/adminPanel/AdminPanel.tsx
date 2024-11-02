"use client";

import { FC, useState } from "react";
import classes from "./AdminPanel.module.css";
import { useEffect } from "react";
import OrderItem from "./orderItem/OrderItem";
import { IInfoOrder } from "@/types/type";
import AuthStore from "@/shared/store/auth";
import orderService from "@/shared/service/order-service";
import Link from "next/link";

const AdminPanel: FC = () => {
  const isLoading = AuthStore((state) => state.isLoading);
  const isAuth = AuthStore((state) => state.isAuth);
  const [alldataorders, Setalldataorders] = useState<IInfoOrder[]>([]);
  console.log(alldataorders,"alldataorders")
  const hadleallInfoOrder = async () => {
    try {
      if (!isLoading) {
        if (isAuth) {
          const response = await orderService.getAll();
          const AllDataOrders = response;
          Setalldataorders(AllDataOrders);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    hadleallInfoOrder();
  }, []);
  if (!isLoading) {
    if (isAuth) {
      return (
        alldataorders && (
          <div className={classes.adminPanel}>
            <Link href="/" className={classes.adminInfo__back}>
              Вернуться на главную
            </Link>
            <p className={classes.adminInfo__title}>Админ панель</p>
            <div className={classes.ordersList}>
              {alldataorders.map((el) => (
                <OrderItem
                  key={el.id}
                  orderInfo={el}
                  allOrders={alldataorders}
                  setAllOrders={Setalldataorders}
                  updateOrders={hadleallInfoOrder}
                />
              ))}
            </div>
          </div>
        )
      );
    }
  }
};

export default AdminPanel;
