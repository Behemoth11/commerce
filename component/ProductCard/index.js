// @ts-ignore
import styles from "./style.module.css";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { memo } from "react";

const setProperty = (object, property, value) => {
  object.current.style.setProperty(property, value);
};

const getRandomInteger = (upperBound, lowerBound = 0) => {
  return Math.floor(Math.random() * (upperBound - lowerBound) + lowerBound);
};

const src = `https://source.unsplash.com/random/${getRandomInteger(
  50,
  650
)}x${getRandomInteger(650, 550)}`;

const ASPECT_RATIO = 120;
const IMAGE_PERCENTAGE = 100;
const MAX_CARD_HEIGHT = "70vh";

const index = ({ type }) => {
  const cardRef = useRef();

  useEffect(() => {
    if (cardRef.current) {
      setProperty(cardRef, "--image-percentage", IMAGE_PERCENTAGE + "%");
      setProperty(cardRef, "--max-card-height", MAX_CARD_HEIGHT);
      setProperty(cardRef, "--aspect-ratio", ASPECT_RATIO);
    }
  }, []);

  return (
    <div
      className={`${styles.cardsContainer} ${styles[type]} no-shrink`}
      ref={cardRef}
    >
      <div className={`${styles.cards}`}>
        <div className={`${styles.container}`}>
          <div className={`${styles.imageSection}`}>
            <div className={`${styles.moreInfo}}`}></div>
            {/* <Image
              loader={() =>
                `https://source.unsplash.com/random/${getRandomInteger(
                  500,
                  500
                )}x${getRandomInteger(230, 260)}`
              }
              src={src}
              alt="There will soon be an alt"
              width={100}
              height={(ASPECT_RATIO * IMAGE_PERCENTAGE) / 100}
              layout="responsive"
            /> */}
          </div>
        </div>
      </div>
      <div className={`${styles.description} ${styles[type]} max-width`}>
        <div className={`${styles.price} ${styles[type]}`}>
          <p>10,000 Fcfa</p>
          <p>new</p>
        </div>
        <button className={`${styles.buy} ${styles[type]}`}>buy</button>
      </div>
    </div>
  );
};

export default memo(index);
