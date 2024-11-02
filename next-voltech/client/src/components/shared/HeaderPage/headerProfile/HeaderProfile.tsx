"use client";

import classes from "./HeaderProfile.module.css";
import { FC, useRef, useState } from "react";
import Link from "next/link";
import AuthStore from "@/shared/store/auth";
import { useRouter } from "next/navigation";
import Basket from "@/public/assets/icons/Basket";
import User from "@/public/assets/icons/User";
import Exit from "@/public/assets/icons/Exit";
import Arrow from "@/public/assets/icons/Arrow";

export const HeaderProfile: FC = () => {
  const router = useRouter();
  const [openid, setOpenId] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const dataUser = AuthStore((state) => state.profiles);
  const logout = AuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      logout(router);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(dataUser)
  const username = dataUser.user.login;
  return (
    <div className={classes.headerProfile}>
      <Link href="/basket">
        <div className={classes.basketBlock}>
          <Basket className={""} />
          Корзина
        </div>
      </Link>
      <div
        className={classes.profileBlock}
        onClick={() => setOpenId((prev) => !prev)}
      >
        <div className={classes.profileBlockLeft}>
          <User className={classes.profileBlock__img} />
          <span className={classes.profileBlock__text}>{username}</span>
        </div>
        <Arrow className={`${classes.arrow} ${openid ? classes.active : ""}`} />
      </div>
      <div
        className={classes.profilePopup}
        style={
          openid
            ? { height: itemRef.current?.scrollHeight, opacity: 1 }
            : { height: "0px", opacity: 0 }
        }
        ref={itemRef}
      >
        <ul className={classes.popupList}>
          <li className={classes.popupList__item}>
            <Basket className={""} />
            <Link href="/order" className={classes.popupList__item}>
              Заказы
            </Link>
          </li>
          {dataUser.user.role === "admin" && (
            <li className={classes.popupList__item}>
              <Link href="/admin" className={classes.popupList__item}>
                Админ
              </Link>
            </li>
          )}
          <li onClick={handleLogout} className={classes.popupList__item}>
            <Exit className={""} />
            Выход
          </li>
        </ul>
      </div>
    </div>
  );
};
