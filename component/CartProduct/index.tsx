// @ts-ignore
import styles from "./style.module.css";
import MyImage from "../MyImage";
import MyLink from "../MyLink";
import { memo, useState, useEffect, useRef } from "react";
import { formatPrice } from "../../shared/UtilityFunctions";
import { useCartContext } from "../../Contexts/GlobalContext";
import { animated, useSpring, config } from "react-spring";

const CartProduct = ({ product, visible }) => {
  if (!product.productName) return <></>;

  let productName = product.productName.slice(0, 15);
  if (product.productName.length > 15) productName += "...";
  const [showFullName, setShowFullName] = useState<boolean>(false);

  const cart = useCartContext();

  const getMessage = (product) => {
    return `I am interested in buying the ${product?.productName}.\n
      ${window?.location?.host}/product/${product._id}`;
  };

  return (
    <animated.div
      className={`${styles.container} max-width ${visible && styles.visible}`}
    >
      <div className={styles.wrapper}>
        <div className={`${styles.imageContainer}`}>
          <MyLink href={`/product/${product._id}`}>
            <a>
              <MyImage
                imageLink={product.pr_image_url}
                isVisible={true}
                ASPECT_RATIO={100}
                observer={undefined}
              />
            </a>
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
            onClick={() => cart.removeFromCart(product._id)}
          >
            <img src="/svg/trash.svg"></img>
          </button>
        </div>
      </div>
    </animated.div>
  );
};

export default memo(CartProduct);
