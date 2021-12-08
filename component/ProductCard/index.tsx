// @ts-ignore
import MyLink from "../MyLink";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./style.module.scss";
import { memo, useState, useEffect, useRef } from "react";
import LoadingProductCard from "../LoadingProductCard";
import { formatPrice } from "../../shared/UtilityFunctions";
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
        <div>
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

            <MyLink href={`/product/${_id}`}>
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
            </MyLink>

            <MyLink href={`/product/${_id}`}>
                <div className={`${styles.imageSection}`}>
                  <MyImage
                    imageLink={imageLink && imageLink[0]}
                    ASPECT_RATIO={aspect_ratio || DEFAULT_ASPECT_RATIO}
                    isVisible={isVisible}
                    observer={observer}
                    alt={`Image de ${productName}`}
                    onLoad={() => setIsLoading(false)}
                  />
                </div>
            </MyLink>
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

            <MyLink href={`/product/${_id}`}>
              <button className={`${styles.buy} ${styles[type]}`}>
                buy
              </button>
            </MyLink>
          </div>
        )) ||
          (footer && (
            <div className={`${styles.description} ${styles[type]} max-width`}>
              <MyLink
                href={{
                  pathname: "/find",
                  query: { categories: footer.split(" ") },
                }}
                style={{ textDecoration: "underline" }}
              >
                {footer}
              </MyLink>
            </div>
          ))}
      </div>
    </div>
  );
};

export default memo(index);
