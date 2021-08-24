// @ts-ignore
import styles from "./style.module.css";
import ProductCard from "../ProductCard";

import { memo } from "react";

const index = () => {
  return (
    <div className={styles.container}>
        <ProductCard type="no-parent-restiction" imageLink={undefined} price={undefined}/>
        <ProductCard type="no-parent-restiction" imageLink={undefined} price={undefined}/>
        <ProductCard type="no-parent-restiction" imageLink={undefined} price={undefined}/>
        <ProductCard type="no-parent-restiction" imageLink={undefined} price={undefined}/>
        <ProductCard type="no-parent-restiction" imageLink={undefined} price={undefined}/>
        <ProductCard type="no-parent-restiction" imageLink={undefined} price={undefined}/>
        <ProductCard type="no-parent-restiction" imageLink={undefined} price={undefined}/>
        <ProductCard type="no-parent-restiction" imageLink={undefined} price={undefined}/>
        <ProductCard type="no-parent-restiction" imageLink={undefined} price={undefined}/>
        <ProductCard type="no-parent-restiction" imageLink={undefined} price={undefined}/>
        <ProductCard type="no-parent-restiction" imageLink={undefined} price={undefined}/>
        <ProductCard type="no-parent-restiction" imageLink={undefined} price={undefined}/>


    </div>
  );
};

export default memo(index);
