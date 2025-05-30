"use client";

import { useEffect, useState } from "react";
import classes from "./Order.module.css";
import { IInfoOrder } from "@/types/type";
import AuthStore from "@/shared/store/auth";
import orderService from "@/shared/service/order-service";
import Link from "next/link";
import convertDateToDDMMYYYY from "@/lib/convertDate";
import getWordEnding from "@/lib/word_ending";

const StatusProcess = () => {
  return (
    <div className={classes.statusOrderBlock__status_StatusProcess}>
      В обработке
    </div>
  );
};
const StatusPerform = () => {
  return (
    <div className={classes.statusOrderBlock__status_StatusPerform}>
      Выполняется
    </div>
  );
};
const StatusDelivery = () => {
  return (
    <div className={classes.statusOrderBlock__status_StatusDelivery}>
      Доставлен
    </div>
  );
};
const StatusCancel = () => {
  return (
    <div className={classes.statusOrderBlock__status_StatusCancel}>Отменен</div>
  );
};
const StatusCancelUser = () => {
  return (
    <div className={classes.statusOrderBlock__status_StatusCancel}>
      Отменен пользователем
    </div>
  );
};

const Order = () => {
  const profiles = AuthStore((state) => state.profiles.user);
  const [otherdata, Setotherdata] = useState<IInfoOrder[] | null>(null);

  const hadleInfoOrder = async () => {
    try {
      const idUsers = profiles?.id;
      const response = idUsers && (await orderService.get(idUsers));
      const OtherData = response;
      Setotherdata(OtherData);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id_order: string) => {
    try {
      await orderService.userCancel(profiles.id!, id_order);
      hadleInfoOrder();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    hadleInfoOrder();
  }, []);
  const renderStatusComponent = (status: string) => {
    switch (status) {
      case "Обработка":
        return <StatusProcess />;
      case "Выполняется":
        return <StatusPerform />;
      case "Доставлено":
        return <StatusDelivery />;
      case "Отмена":
        return <StatusCancel />;
      case "Отменен пользователем":
        return <StatusCancelUser />;
      default:
        return null;
    }
  };
  return (
    otherdata && (
      <div className={classes.ordersInfo}>
        <Link href="/" className={classes.ordersInfo__back}>
          Вернуться на главную
        </Link>
        <p className={classes.ordersInfo__title}>Заказы</p>
        <div className={classes.ordersList}>
          {otherdata.length === 0 ? (
            <p className={classes.messageYouNotOrders}>
              У вас нет заказов, выберете что-нибудь в каталоге товаров.
            </p>
          ) : (
            otherdata.map((elother: IInfoOrder) => (
              <div key={elother.id_order} className={classes.ordersItem}>
                <div className={classes.numberOrderBlock}>
                  <p className={classes.numberOrderBlock__number}>
                    Номер заказа: {elother.id_order}
                  </p>
                  <p className={classes.numberOrderBlock__date}>
                    Дата заказа: {convertDateToDDMMYYYY(elother.date ?? "")}
                  </p>
                  <Link
                    href={{
                      pathname: `/infoOrder/${elother.id_order}`,
                    }}
                  >
                    <button className={classes.moreOrderBlock__btn}>
                      Подробнее о заказе
                    </button>
                  </Link>
                </div>
                <div className={classes.equipmentOrderBlock}>
                  <p className={classes.equipmentOrderBlock__count}>
                    {getWordEnding(elother.allCount, [
                      "товар",
                      "товара",
                      "товаров",
                    ])}
                  </p>
                  <div className={classes.equipmentsList}>
                    {Array.isArray(elother.info) &&
                      elother.info.map((item, index) => (
                        <div
                          key={`${item.id_equipment}_${index}`}
                          className={classes.equipmentsList__item}
                        >
                          {item && (
                            <p className={classes.equipmentsList__title}>
                              {item.equipment.brand} {item.equipment.model}
                            </p>
                          )}
                          <p className={classes.equipmentsList__count}>
                            {item.count} шт.
                          </p>
                          <p className={classes.equipmentsList__price}>
                            {item.equipment.price.toLocaleString("ru-RU")}{" "}
                            <span className="rub">₽</span>
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
                <div className={classes.statusOrderBlock}>
                  <p className={classes.statusOrderBlock__title}>Статус</p>
                  {renderStatusComponent(elother.status ?? "")}
                </div>
                <div className={classes.resultOrderBlock}>
                  <p className={classes.resultOrderBlock__title}>Итог</p>
                  <p className={classes.resultOrderBlock__price}>
                    {elother.price.toLocaleString("ru-RU")}
                    <span className="rub">₽</span>
                  </p>
                  <button
                    className={classes.resultOrderBlock__btn}
                    onClick={() => handleDelete(elother.id_order ?? "")}
                  >
                    Отменить заказ
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    )
  );
};

export default Order;
