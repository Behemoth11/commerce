// @ts-ignore
import Link from "next/link";
import Image from "next/image";
import useFitText from "use-fit-text";
import { useRouter } from "next/router";
import styles from "./style.module.css";
import { memo } from "react";
import { useGlobalContext } from "../../Contexts/GlobalContext";
import { getRandomInteger } from "../../shared/UtilityFunctions";

const ASPECT_RATIO = 120 ; //you may want to change the global css aspect-ratio after changing this

interface Props{
  type?: string,
  imageLink?: string,
  price?: string,
  infoFieldIsOpen?: boolean,
  setActiveOpenField?: any,
  index?: number,
  reference?: any

}

const index: React.FC<Props>= ({ type, imageLink, price,infoFieldIsOpen,setActiveOpenField, index, reference }) => {
  const {setActiveProductData} = useGlobalContext();
  const { fontSize, ref } = useFitText();

  const {
    query: { categories },
  } = useRouter();

  const updateGlobalState = () => {
    setActiveProductData({ type, imageLink, price, categories });
  };

  return (
    <div
      className={`${styles.cardsContainer} ${styles[type]} no-shrink`}
      ref={reference}
    >
      <div className={`${styles.cards}`}>
        <div className={`${styles.container}`}>
          {true && (
            <img
              src={"/svg/info.svg"}
              className={styles.toggleInfoIcon}
              onClick={() => setActiveOpenField(prevState => prevState == index ? undefined : index)}
            />
          )}

          <div
            className={`${styles.moreInfo}  ${
              infoFieldIsOpen && styles.open
            } flex center-children`}
          >
            <div
              className={`${styles.informations}`}
              ref={ref}
              style={{ fontSize }}
            >
              <h2>Durable Alux pot</h2>
              <p>This iss somuff that I definely want to happen in my life b</p>
            </div>
          </div>

          <div className={`${styles.imageSection} `}>
            <Image
              loader={() =>
                `https://source.unsplash.com/random/${getRandomInteger(
                  900,
                  1100
                )}x${getRandomInteger(1000, 1200)}`
              }
              src={imageLink || "/images/image1.jpg"}
              alt="There will soon be an alt"
              width={100}
              height={ASPECT_RATIO }
              layout="responsive"
            />
          </div>
        </div>
      </div>

      {price && (
        <div className={`${styles.description} ${styles[type]} max-width`}>
         
          <div className={`${styles.price} ${styles[type]}`}>
            <p>{price} FCFA | <span style={{color: "blue"}}>New!</span></p>
          </div>

          <Link href={`/product/${"15223654"}`}>
            <button
              className={`${styles.buy} ${styles[type]}`}
              onClick={updateGlobalState}
            >
              <a>buy</a>
            </button>
          </Link>
        
        </div>
      ) || 
      <div className={`${styles.description} ${styles[type]} max-width`}>
          <Link href={`/product/${"15223654"}`}>
              <a style={{textDecoration: "underline"}}>Lorem Ipsum</a>
          </Link>
        </div>}
    </div>
  );
};

export default memo(index);
