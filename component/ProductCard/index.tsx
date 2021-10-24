// @ts-ignore
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./style.module.css";
import { memo, useState, useEffect, useRef } from "react";
import LoadingProductCard from "../LoadingProductCard";
import { formatPrice } from "../../shared/UtilityFunctions";
import { useGlobalContext } from "../../Contexts/GlobalContext";
import { getRandomInteger } from "../../shared/UtilityFunctions";
import MyImage from "../../component/MyImage";

const DEFAULT_ASPECT_RATIO = 120; //you may want to change the global css aspect-ratio after changing this

interface Props {
  _id: string;
  type?: string;
  imageLink?: string;
  price?: string;
  infoFieldIsOpen?: boolean;
  setActiveOpenField?: any;
  index?: number;
  reference?: any;
  isVisible?: boolean;
  observer?: IntersectionObserver;
  aspect_ratio?: number;
  footer?: any;
  productName: string;
  description: { head: string; info: string };
}

const index: React.FC<Props> = ({
  _id,
  type,
  price,
  index,
  footer,
  observer,
  isVisible,
  imageLink,
  productName,
  description,
  aspect_ratio,
  infoFieldIsOpen,
  setActiveOpenField,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`${styles.cardsContainer} ${styles[type]} no-shrink`}>
      {isLoading && (
        <div onClick={() => setIsLoading(false)}>
          <LoadingProductCard
            price={price}
            type={type}
            footer={footer}
            isVisible={isVisible}
            aspect_ratio={aspect_ratio}
          />
        </div>
      )}
      <div className={`${isLoading && styles.loading}`}>
        <div
          className={`${styles.cards}`}
          style={{
            paddingTop: `min(var(--max-card-height), calc(${
              aspect_ratio || DEFAULT_ASPECT_RATIO
            })*1%)`,
          }}
        >
          <div className={`${styles.container}`}>
            <img
              src={"/svg/info.svg"}
              alt="more INformations"
              className={styles.toggleInfoIcon}
              onClick={() =>
                setActiveOpenField((prevState) =>
                  prevState == index ? undefined : index
                )
              }
            />

            <Link href={`/product/${_id}`}>
              <a>
                <div
                  className={`${styles.moreInfo}  ${
                    infoFieldIsOpen && styles.open
                  } flex center-children`}
                >
                  <div className={`${styles.informations}`}>
                    <h2>{productName}</h2>
                    <p>{description}</p>
                  </div>
                </div>
              </a>
            </Link>

            <Link href={`/product/${_id}`}>
              <a>
                <div className={`${styles.imageSection}`}>
                  <MyImage
                    imageLink={imageLink && imageLink[0]}
                    ASPECT_RATIO={aspect_ratio || DEFAULT_ASPECT_RATIO}
                    isVisible={isVisible}
                    observer={observer}
                    onLoad={() => setIsLoading(false)}
                  />
                </div>
              </a>
            </Link>
          </div>
        </div>

        {(price && (
          <div className={`${styles.description} ${styles[type]} max-width`}>
            <div className={`${styles.price} ${styles[type]}`}>
              <p>
                {formatPrice(price)}
                {/* <span style={{ color: "var(--accent-color)" }}>New!</span> */}
              </p>
            </div>

            <Link href={`/product/${_id}`}>
              <button className={`${styles.buy} ${styles[type]}`}>
                <a>buy</a>
              </button>
            </Link>
          </div>
        )) ||
          (footer && (
            <div className={`${styles.description} ${styles[type]} max-width`}>
              <Link
                href={{
                  pathname: "/find",
                  query: { categories: footer.split(" ") },
                }}
              >
                <a style={{ textDecoration: "underline" }}>{footer}</a>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default memo(index);
