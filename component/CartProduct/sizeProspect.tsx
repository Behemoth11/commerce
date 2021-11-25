// @ts-ignore
import styles from "./style.module.scss";
import MyImage from "../MyImage";
import { useRef, useEffect } from "react";

const CartProduct = ({ updateSize }) => {
  const myHeight = useRef();

  return (
    <div className={`${styles.container} max-width`} ref={myHeight}>
      <div className={`${styles.imageContainer}`}>
        <MyImage
          imageLink={"none"}
          isVisible={true}
          ASPECT_RATIO={100}
          observer={undefined}
        />
      </div>
    </div>
  );
};

export default CartProduct;
