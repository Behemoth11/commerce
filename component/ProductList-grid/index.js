// @ts-ignore
import styles from "./style.module.css";
import ProductCard from "../ProductCard";

import { memo } from "react";

const index = ({ location }) => {
  return (
    <div className={`${styles.container} ${styles[location]} `}>
      <ProductCard type="1" />
      <ProductCard type="1" />
      <ProductCard type="1" />
      <ProductCard type="1" />
      <ProductCard type="1" />
      <ProductCard type="1" />
      <ProductCard type="1" />
      <ProductCard type="1" />
      <ProductCard type="1" />
      <ProductCard type="1" />
      <ProductCard type="1" />
      <ProductCard type="1" />
      <ProductCard type="1" />
      <ProductCard type="1" />
      <ProductCard type="1" />
      <ProductCard type="1" />
      <ProductCard type="1" />
      <ProductCard type="1" />
      <ProductCard type="1" />
      <ProductCard type="1" />
      <ProductCard type="1" />
      <ProductCard type="1" />
      <ProductCard type="1" />
      <ProductCard type="1" />
    </div>
  );
};

export default memo(index);
