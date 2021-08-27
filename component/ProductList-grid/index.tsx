// @ts-ignore
import styles from "./style.module.css";
import ProductCard from "../ProductCard";
import {useIntersectionObserver} from "../../shared/CustomHooks"
import { memo, useState, useEffect } from "react";

const index = ({ displayType }) => {
  const [activeOpenField, setActiveOpenField] = useState(undefined);

  const [visibilityIndex, observer] = useIntersectionObserver("500px");

  useEffect(() => {
    // console.log(`${visibilityIndex} products are visible in the grid`)
  }, [visibilityIndex])
  return (
    <div className={`${styles.container} ${styles[displayType]} `}>
      {["", "", "", "","", "", "", "","", "", "", "","", "", "", "","", "", "", "",].map((element, index) => (
        <ProductCard
          key={index}
          type="1"
          imageLink={"/images/image1.jpg"}
          infoFieldIsOpen={activeOpenField == index}
          setActiveOpenField={setActiveOpenField}
          isVisible={index < visibilityIndex}
          observer={observer}
          price={"15000"}
          index={index}
        />
      ))}
    </div>
  );
};

export default memo(index);
