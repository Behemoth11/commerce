// @ts-ignore
import styles from "./style.module.scss";
import ProductCard from "../ProductCard";
import { memo, useState, useRef, useEffect } from "react";
import { useIntersectionObserver } from "../../shared/CustomHooks";

const ProductListFlex = ({items}) => {
  const [activeOpenField, setActiveOpenField] = useState(undefined);
  const [visibilityIndex, observer, observerRef] = useIntersectionObserver("0px 100% 0px 0px");

  return (
      <div
        className={styles.container}
        style={{ fontSize: "1em" }}
        ref={observerRef}
      >
        {items?.map((element, index) => (
          <ProductCard
            key={element._id||index} // remenber to change this line once you build the back end
            index={index}
            type="h-display"
            observer={observer}
            
            _id={element._id}
            price={element.price}
            footer={element.representation}
            imageLink={element.pr_image_url}
            productName={element.productName}
            description={element.description}

            isVisible={index < visibilityIndex}
            setActiveOpenField={setActiveOpenField}
            infoFieldIsOpen={activeOpenField == index}
          />
        ))}
      </div>
    // </div>
  );
};

export default memo(ProductListFlex);
