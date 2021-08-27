// @ts-ignore
import Link from "next/link";
import Image from "next/image";
import useFitText from "use-fit-text";
import { useRouter } from "next/router";
import styles from "./style.module.css";
import { memo } from "react";
import { useGlobalContext } from "../../Contexts/GlobalContext";
import { getRandomInteger } from "../../shared/UtilityFunctions";

const ASPECT_RATIO = 120; //you may want to change the global css aspect-ratio after changing this

interface Props {
  type?: string;
  imageLink?: string;
  price?: string;
  infoFieldIsOpen?: boolean;
  setActiveOpenField?: any;
  index?: number;
  reference?: any;
  footer?: any;
}

const index: React.FC<Props> = ({
  type,
  imageLink,
  price,
  footer,
  infoFieldIsOpen,
  setActiveOpenField,
  index,
  reference,
}) => {
  

  return (
    <div className={`${styles.cardsContainer} no-shrink`}>
      <div className={`${styles.cards}`}>
        <div className={`${styles.container} animated `}></div>
      </div>

      {(price && (
        <div className={`${styles.description} max-width`}>
          <div className={`${styles.description2} ${styles[type]}`}>
            p
            <div className={`${styles.after}`} />
          </div>

          <button className={`${styles.buy} animated`}></button>
        </div>
      )) ||
        (footer && (
          <div
            className={`${styles.description2} max-width ${styles[type]} ${styles.animatd}`}
          >
            text
            <div className={`${styles.after} animated`} />
          </div>
        ))}
    </div>
  );
};

export default memo(index);
