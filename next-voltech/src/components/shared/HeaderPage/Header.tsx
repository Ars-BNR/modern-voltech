"use client";

import { FC } from "react";
import classes from "./HeaderPage.module.css";
import Link from "next/link";
import AuthStore from "@/shared/store/auth";
import { HeaderProfile } from "./headerProfile/HeaderProfile";
import { HeaderButton } from "./headerButton/HeaderButton";

export const Header: FC = () => {
  const isAuth = AuthStore((state) => state.isAuth);
  return (
    <div className={classes.header__container}>
      <div className={classes.voltechHeader}>
        <Link href="/" className={classes.voltechHeader__title}>
          Voltech
        </Link>
        {isAuth ? <HeaderProfile /> : <HeaderButton />}
      </div>
    </div>
  );
};
