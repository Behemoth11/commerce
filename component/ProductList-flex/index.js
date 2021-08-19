// @ts-ignore
import styles from "./style.module.css";
import ProductCard from "../ProductCard";

import { memo } from "react";

const index = () => {
  return (
    <div className={styles.container}>
        <ProductCard type="no-parent-restiction"/>
        <ProductCard type="no-parent-restiction"/>
        <ProductCard type="no-parent-restiction"/>
        <ProductCard type="no-parent-restiction"/>
        <ProductCard type="no-parent-restiction"/>
        <ProductCard type="no-parent-restiction"/>
        <ProductCard type="no-parent-restiction"/>
        <ProductCard type="no-parent-restiction"/>
        <ProductCard type="no-parent-restiction"/>
        <ProductCard type="no-parent-restiction"/>
        <ProductCard type="no-parent-restiction"/>
        <ProductCard type="no-parent-restiction"/>
        <ProductCard type="no-parent-restiction"/>
        <ProductCard type="no-parent-restiction"/>
        <ProductCard type="no-parent-restiction"/>
        <ProductCard type="no-parent-restiction"/>
        <ProductCard type="no-parent-restiction"/>

    </div>
  );
};

export default memo(index);
