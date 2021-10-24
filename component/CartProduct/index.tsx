// @ts-ignore
import styles from "./style.module.css";
import MyImage from "../MyImage";
import Link from "next/link";
import { memo, useState, useEffect, useRef } from "react";
import { formatPrice } from "../../shared/UtilityFunctions";
import { useGlobalContext } from "../../Contexts/GlobalContext";

const CartProduct = ({ product }) => {
  if (!product.productName) return <></>;
  
  let productName = product.productName.slice(0, 15);
  if (product.productName.length >= 10) productName += "...";
  const [showFullName, setShowFullName] = useState<boolean>(false);

  const { cart } = useGlobalContext();

  const getMessage = (product) => {
    return `I am interested in buying the ${product?.productName}.\n
      ${window?.location?.host}/product/${product._id}`;
  };

  return (
    <div className={`${styles.container} max-width`}>
      <div className={`${styles.imageContainer}`}>
        <Link href={`/product/${product._id}`} passHref>
          <a>
            <MyImage
              imageLink={product.pr_image_url}
              isVisible={true}
              ASPECT_RATIO={100}
              observer={undefined}
            />
          </a>
        </Link>
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

        <button className={`${styles.buyPrompt} flex-center`}>
          <a
            href={`https://api.whatsapp.com/send?phone=15312256403&text=${getMessage(
              product
            )}`}
          >
            Buy
          </a>
        </button>
      </div>
    </div>
  );
};

export default memo(CartProduct);
