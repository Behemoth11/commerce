// @ts-ignore
import Link from "next/link";
import Image from "next/image";
import useFitText from "use-fit-text";
import { useRouter } from "next/router";
import styles from "./style.module.css";
import { memo, useState, useEffect, useRef } from "react";
import LoadingProductCard from "../LoadingProductCard";
import { useGlobalContext } from "../../Contexts/GlobalContext";
import { getRandomInteger } from "../../shared/UtilityFunctions";
import MyImage from "../../component/MyImage";

const ASPECT_RATIO = 120; //you may want to change the global css aspect-ratio after changing this

interface Props {
  type?: string;
  imageLink?: string;
  price?: string;
  infoFieldIsOpen?: boolean;
  setActiveOpenField?: any;
  index?: number;
  reference?: any;
  isVisible?: boolean;
  observer?: IntersectionObserver;
  footer?: any;
  visibilityIndex?: any;
}

const index: React.FC<Props> = ({
  type,
  imageLink,
  price,
  infoFieldIsOpen,
  setActiveOpenField,
  index,
  isVisible,
  reference,
  observer,
  footer,
  visibilityIndex,
}) => {
  const [isLoading, setIsLoading] = useState(true);


  return (
    <div
      className={`${styles.cardsContainer} ${styles[type]} no-shrink`}
    >
      {imageLink && (
        <>
          {isLoading && (
            <LoadingProductCard price={price} type={type} footer={footer} />
          )}
          <div className={`${isLoading && styles.loading}`}>
            <div className={`${styles.cards}`}>
              <div className={`${styles.container}`}>
                <img
                  src={"/svg/info.svg"}
                  className={styles.toggleInfoIcon}
                  onClick={() =>
                    setActiveOpenField((prevState) =>
                      prevState == index ? undefined : index
                    )
                  }
                />

                <div
                  className={`${styles.moreInfo}  ${
                    infoFieldIsOpen && styles.open
                  } flex center-children`}
                >
                  <div className={`${styles.informations}`}>
                    <h2>Durable Alux pot</h2>
                    <p>
                      This iss somuff that I definely want to happen in my life
                      b
                    </p>
                  </div>
                </div>

                <div className={`${styles.imageSection}`}>
                  <MyImage
                    imageLink={imageLink}
                    ASPECT_RATIO={ASPECT_RATIO}
                    isVisible={isVisible}
                    observer={observer}
                    onLoad={() => setIsLoading(false)}
                  />
                </div>
              </div>
            </div>

            {(price && (
              <div
                className={`${styles.description} ${styles[type]} max-width`}
              >
                <div className={`${styles.price} ${styles[type]}`}>
                  <p>
                    {price} FCFA |{" "}
                    <span style={{ color: "var(--accent-color)" }}>New!</span>
                  </p>
                </div>

                <Link href={`/product/${"15223654"}`}>
                  <button className={`${styles.buy} ${styles[type]}`}>
                    <a>buy</a>
                  </button>
                </Link>
              </div>
            )) ||
              (footer && (
                <div
                  className={`${styles.description} ${styles[type]} max-width`}
                >
                  <Link href={`/product/${"15223654"}`}>
                    <a style={{ textDecoration: "underline" }}>Lorem Ipsum</a>
                  </Link>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default memo(index);
