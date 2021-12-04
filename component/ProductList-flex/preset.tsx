import styles from "./style.module.scss";
import ProductListFlex from ".";
import React from "react";

interface moreProduct {
  items: {}[];
  style?: {};
  title: string;
  preset?: string;
}


const MoreProduct: React.FC<moreProduct> = ({ items, preset,title,style }) => {
  return items.length >0 && (
    <div className={`${styles.moreProduct} ${styles[preset]}`}>
      <h3>
        {title}
      </h3>
      <div style={{ fontSize: "0.8em" }} className={styles.container}>
        <ProductListFlex items={items} />
      </div>
    </div>
  );
};

export default MoreProduct;
