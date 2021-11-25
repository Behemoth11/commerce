// @ts-ignore
import styles from "./style.module.scss";
import MyImage from "../MyImage";
import MyLink from "../MyLink";
import { memo, useState, useEffect, useRef } from "react";
import { formatPrice } from "../../shared/UtilityFunctions";
import { useCartContext } from "../../Contexts/GlobalContext";
import { animated, useSpring, config } from "react-spring";

const CartProduct = ({ product, visible, onClick }) => {
  if (!product.productName) return <></>;

  let productName = product.productName.slice(0, 15);
  if (product.productName.length > 15) productName += "...";
  const [showFullName, setShowFullName] = useState<boolean>(false);

  return (
    <animated.div
      className={`${styles.container} max-width ${visible && styles.visible}`}
    >
      <div className={styles.wrapper}>
        <div className={`${styles.imageContainer}`}>
          <MyLink href={`/product/${product._id}`}>
              <MyImage
                imageLink={product.pr_image_url}
                isVisible={true}
                ASPECT_RATIO={100}
                observer={undefined}
              />
          </MyLink>
        </div>
        <div className={styles.middleSection}>
          <p
            className={styles.productName}
            onClick={() => setShowFullName((prevState) => !prevState)}
          >
            {(showFullName && product.productName) || productName}
          </p>

          <p className={styles.price}>{formatPrice(product.price)}</p>
        </div>

        <div className={styles.rm}>
          <button
            className={styles.trashBeen}
            onClick={() => onClick(product._id)}
          >
            <img src="/svg/trash.svg"></img>
          </button>
        </div>
      </div>
    </animated.div>
  );
};

export default memo(CartProduct);
