import React from "react";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.Loader__container}>
      <div className={styles.Loader__title}>Загрузка</div>
      <div className={styles.loader}>
        <span className={styles.loader__dot}></span>
        <span className={styles.loader__dot}></span>
        <span className={styles.loader__dot}></span>
      </div>
    </div>
  );
};

export default Loader;
