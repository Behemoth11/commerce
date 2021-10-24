// @ts-ignore
import styles from "./style.module.css";

const DEFAULT_ASPECT_RATIO = 120; //you may want to change the global css aspect-ratio after changing this

interface Props {
  type?: string;
  imageLink?: string;
  price?: string;
  isVisible?: boolean;
  infoFieldIsOpen?: boolean;
  setActiveOpenField?: any;
  index?: number;
  reference?: any;
  footer?: any;
  aspect_ratio?: number;
}

const index: React.FC<Props> = ({
  type,
  price,
  footer,
  isVisible,
  aspect_ratio,
}) => {
  

  return (
    <div className={`${styles.cardsContainer} ${styles[type]} no-shrink`}>
      <div className={`${styles.cards}`} style={{
            paddingTop:
              `min(var(--max-card-height), calc(${aspect_ratio||DEFAULT_ASPECT_RATIO})*1%)`,
          }}>
        <div className={`${styles.container} ${isVisible && "animated"} `}></div>
      </div>

      {(price && (
        <div className={`${styles.description} max-width vertical-flex`}>
          <div className={`${styles.description2} ${styles[type]}`}>
            p
            <div className={`${styles.after}`} />
          </div>

          <button className={`${styles.buy} ${styles[type]} ${isVisible && "animated"}`}>buy </button>
        </div>
      )) ||
        (footer && (
          <div className={`${styles.description2} ${styles[type]}`}>
            p
            <div className={`${styles.after}`} />
          </div>
        ))}
    </div>
  );
};

export default index;
