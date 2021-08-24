// @ts-ignore
import styles from "./style.module.css";
import ProductCard from "../ProductCard";

import { memo } from "react";

const index = ({ displayType }) => {
  return (
    <div className={`${styles.container} ${styles[displayType]} `}>
      <ProductCard type="1" imageLink={'/images/image1.jpg'} price={15000} />
      <ProductCard type="1" imageLink={'/images/image2.jpg'} price={15000} />
      <ProductCard type="1" imageLink={'/images/image3.jpg'} price={15000} />
      <ProductCard type="1" imageLink={'/images/image4.jpg'} price={15000} />
    </div>
  );
};

export default memo(index);
