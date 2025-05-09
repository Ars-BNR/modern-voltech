"use client";

import { useState, useEffect } from "react";
import classes from "./Equipment.module.css";
import { Order } from "../../../types/type";
import catalogService from "@/shared/service/catalog-service";
import { useParams, useRouter } from "next/navigation";
import useAddToBasket from "@/shared/hooks/useAddToBasket";
import Loader from "@/components/ui/Loader/Loader";
import Image from "next/image";

const Equipment = () => {
  const router = useRouter();

  const { id } = useParams();
  const [equipment, setEquipment] = useState<Order>();
  const [loading, setLoading] = useState(false);

  const fetchEquipment = async () => {
    try {
      setLoading(true);
      const response =
        id && (await catalogService.getInfoEquipment(Number(id)));
      const personalData = response;
      setEquipment(personalData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const { HandleAddBasket } = useAddToBasket();

  useEffect(() => {
    fetchEquipment();
  }, [id]);
  const renderInfo = (infoObject: object) => {
    return (
      <ul>
        {Object.entries(infoObject).map(([key, value]) => {
          if (
            typeof value === "object" &&
            !Array.isArray(value) &&
            value !== null
          ) {
            return (
              <li className={classes.info_el_li} key={key}>
                <span className={classes.info__title}>{key}:</span>
                {renderInfo(value)}
              </li>
            );
          } else {
            return (
              <li className={classes.info_el_li} key={key}>
                <span className={classes.short_info_el}>{key}: </span>
                <span className={classes.info_el_main}>{value}</span>
              </li>
            );
          }
        })}
      </ul>
    );
  };
  const BackToCatalog = () => {
    router.back();
  };
  if (loading) {
    return <Loader />;
  }
  return (
    equipment && (
      <div className={classes.PersonalPageEquipment}>
        <p onClick={BackToCatalog} className={classes.BackToCatalog}>
          Вернуться в каталог
        </p>

        <div className={classes.EquipmnetBlock}>
          <div className={classes.EquipmentContent}>
            <div className={classes.EquipmentContent__equipmentImg}>
              <Image
                className={classes.imgel}
                src={`${process.env.NEXT_PUBLIC_IMG_URL}${equipment.pathimg}`}
                alt={
                  equipment.main_info["Бренд"] + equipment.main_info["Модель"]
                }
                layout="responsive"
                width={16} // Примерное соотношение ширины
                height={9} // Примерное соотношение высоты
                objectFit="contain"
              />
            </div>
            <div className={classes.EquipmentContent___equipmentInformation}>
              <p className={classes.EquipmentContent__informationTitle}>
                {equipment.main_info["Бренд"]} {equipment.main_info["Модель"]}
              </p>
              <div className={classes.EquipmentContent__priceAndButton}>
                <p className={classes.price}>
                  {equipment.price.toLocaleString("ru-RU")}{" "}
                  <span className="rub">₽</span>
                </p>
                <button
                  className={classes.button_add}
                  onClick={() => HandleAddBasket(equipment.id)}
                >
                  Добавить
                </button>
              </div>
              <div className={classes.short_info}>
                <p className={classes.short_info_title}>
                  Краткие характеристики
                </p>
                {renderInfo(equipment.short_info)}
              </div>
            </div>
          </div>
        </div>
        <div className={classes.contentWithDecription}>
          <div className={classes.descriptionBlock}>
            <p className={classes.descriptionBlock__title}>Описание</p>
            <p className={classes.descriptionBlock__text}>
              {equipment.description["description"]}
            </p>
          </div>
          <div className={classes.informationBlock}>
            <p className={classes.informationBlock__title}>Характеристики</p>
            {renderInfo(equipment.main_info)}
          </div>
        </div>
      </div>
    )
  );
};

export default Equipment;
