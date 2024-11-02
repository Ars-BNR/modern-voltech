import { FC } from "react";
import classes from "./CardList.module.css";
import { ProductData } from "@/types/type";
import Link from "next/link";
import Image from "next/image";
interface CardListProps {
  products: ProductData;
  HandleAddBasket: (id: number) => void;
}
const CardList: FC<CardListProps> = ({ products, HandleAddBasket }) => {
  return (
    products && (
      <div className={classes.cardList}>
        {products.data.map((product, index) => (
          <div key={index} className={classes.card}>
            <Link href={`/equipment/${product.id}`}>
              <div key={index} className={classes.card__picture}>
                <Image
                  src={"http://localhost:7000/img/" + product.pathimg}
                  alt=""
                  className={classes.card__img}
                  loading="lazy"
                  fill={true}
                />
              </div>
              <p
                className={classes.card__title}
              >{`${product.main_info["Бренд"]} ${product.main_info["Модель"]}`}</p>
            </Link>
            <p className={classes.card__price}>
              {product.price.toLocaleString("ru-RU")}{" "}
              <span className={classes.rub}>₽</span>
            </p>
            <button
              onClick={() => HandleAddBasket(product.id)}
              className={classes.card__btn}
            >
              Добавить
            </button>
          </div>
        ))}
      </div>
    )
  );
};

export default CardList;
