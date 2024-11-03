import Image from "next/image";
import Link from "next/link";
import React from "react";
import pc from "../../../public/assets/img/pc.png";
import kb from "../../../public/assets/img/kb.png";
import mn from "../../../public/assets/img/mn.png";
import ms from "../../../public/assets/img/ms.png";
import classes from "./HomePage.module.css";

export const HomePage: React.FC = () => {
  return (
    <div className={classes.voltechMain}>
      <div className={classes.leftBlock}>
        <div className={classes.block__picture}>
          <Link href="/catalog?category=PC">
            <p className={classes.title}>Готовые решения</p>
            <Image
              src={pc}
              alt=""
              className={classes.leftBlock__img}
              loading="lazy"
            />
          </Link>
        </div>
      </div>
      <div className={classes.rightBlock}>
        <div className={classes.topRightBlock}>
          <div className={classes.block__picture}>
            <Link href="/catalog?category=keyboards">
              <p className={classes.title}>Клавиатуры</p>
              <Image
                src={kb}
                alt=""
                className={classes.rightBlock__img}
                loading="lazy"
              />
            </Link>
          </div>
        </div>
        <div className={classes.bottomRightBlock}>
          <div className={classes.bottomRightBlockLeft}>
            <div className={classes.block__picture}>
              <Link href="/catalog?category=monitors">
                <p className={classes.title}>Мониторы</p>
                <div className={classes.bottomRightBlockLeft__picture}>
                  <Image
                    src={mn}
                    alt=""
                    className={classes.bottomRightBlockLeft__img}
                    loading="lazy"
                  />
                </div>
              </Link>
            </div>
          </div>
          <div className={classes.bottomRightBlockRight}>
            <div className={classes.block__picture}>
              <Link href="/catalog?category=mouse">
                <p className={classes.title}>Мыши</p>
                <div className={classes.bottomRightBlockRight__picture}>
                  <Image
                    src={ms}
                    alt=""
                    className={classes.bottomRightBlockRight__img}
                    loading="lazy"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
