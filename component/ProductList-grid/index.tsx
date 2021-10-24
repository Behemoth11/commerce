// @ts-ignore
import styles from "./style.module.css";
import ProductCard from "../ProductCard";
import { useIntersectionObserver } from "../../shared/CustomHooks";
import { memo, useState, useEffect } from "react";

const index = ({ items, displayType, aspect_ratio }) => {
  const [activeOpenField, setActiveOpenField] = useState(undefined);

  const [visibilityIndex, observer] = useIntersectionObserver("500px");
  const DEFAULT_ASPECT_RATIO = displayType == "double" && 130 || 100

  return (
    <div className={`${styles.container} ${styles[displayType]} `}>
      {items.map((element, index) => (
        <ProductCard
          type="grid-display"
          key={element._id || index}
          aspect_ratio={aspect_ratio||DEFAULT_ASPECT_RATIO}

          //data section
          _id={element._id}
          price={element.price}
          footer={element.footer}
          imageLink={element.pr_image_url}
          productName={element.productName}
          description={element.description}

          //end of the data section
          index={index}
          observer={observer}
          isVisible={index < visibilityIndex}
          setActiveOpenField={setActiveOpenField}
          infoFieldIsOpen={activeOpenField == index}
        />
      ))}
    </div>
  );
};

export default memo(index);
