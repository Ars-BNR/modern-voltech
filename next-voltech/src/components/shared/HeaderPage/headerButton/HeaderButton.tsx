import Link from "next/link";
import classes from "./HeaderButton.module.css";
import { FC } from "react";
export const HeaderButton: FC = () => {
  return (
    <div className={classes.headerButton}>
      <Link href="/login" className={classes.headerButton__link}>
        Вход
      </Link>
      <Link href="/registration" className={classes.headerButton__link}>
        Регистрация
      </Link>
    </div>
  );
};
