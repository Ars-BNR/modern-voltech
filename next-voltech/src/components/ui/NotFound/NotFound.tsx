import { FC } from "react";
import cl from "./NotFound.module.css";
import Link from "next/link";
const NotFound: FC = () => {
  return (
    <>
      <div className={cl.notFound__Block}>
        <div className={cl.notFoundBlock__el}>404 Страница не найдена</div>
        <Link href="/">
          <div className={cl.notFoundBlock__link}>
            Вернемся на главную страницу?
          </div>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
