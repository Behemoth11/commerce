// @ts-ignore
import styles from "./style.module.css";
import { memo, useState, useRef, useEffect } from "react";
import ProductCard from "../ProductCard";
import { useIntersectionObserver } from "../../shared/CustomHooks";

const index = () => {
  const [activeOpenField, setActiveOpenField] = useState(undefined);
  const [visibilityIndex, observer, observerRef] = useIntersectionObserver("0px 100% 0px 0px");


  return (
      <div
        className={styles.container}
        style={{ fontSize: "0.8em" }}
        ref={observerRef}
      >
        {"                  ".split(" ").map((element, index) => (
          <ProductCard
            key={index} // remenber to change this line once you build the back end
            type="no-parent-restiction"
            imageLink={"/images/image1.jpg"}
            infoFieldIsOpen={activeOpenField == index}
            setActiveOpenField={setActiveOpenField}
            isVisible={index < visibilityIndex}
            observer={observer}
            // price={"15000"}
            index={index}

            visibilityIndex={visibilityIndex}
          />
        ))}
      </div>
    // </div>
  );
};

export default memo(index);
