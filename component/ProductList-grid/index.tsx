// @ts-ignore
import styles from "./style.module.css";
import ProductCard from "../ProductCard";

import { memo,useState } from "react";

const index = ({ displayType }) => {
  const [activeOpenField, setActiveOpenField] = useState(undefined);
  return (
    <div className={`${styles.container} ${styles[displayType]} `}>
    {["","","",""].map((element, index)=>
      <ProductCard type="1" imageLink={'/images/image1.jpg'} infoFieldIsOpen={ activeOpenField == index } setActiveOpenField={setActiveOpenField} price={"15000"} index={index} />
    )}
    </div>
  );
};

export default memo(index);
