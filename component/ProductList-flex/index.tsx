// @ts-ignore
import styles from "./style.module.css";
import ProductCard from "../ProductCard";

import { memo, useRef, useEffect, useState } from "react";

const updateContainer: (
  element: React.MutableRefObject<HTMLDivElement>
) => void = (element) => {
  const scrollUnity = element.current.clientWidth;
};

const index = () => {
  const containerRef = useRef(undefined);
  const sampleChildrenRef = useRef(undefined);
  const [activeOpenField, setActiveOpenField] = useState(undefined);

  return (
    <div className={styles.container0}>
      <div className={styles.container} style={{fontSize: "0.8em"}}>
        {"                  ".split(" ").map((element, index) => (
          <ProductCard
            key={index} // remenber to change this line once you build the back end
            type="no-parent-restiction"
            imageLink={"/images/image1.jpg"}
            infoFieldIsOpen={activeOpenField == index}
            setActiveOpenField={setActiveOpenField}
            // price={"15000"}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(index);
