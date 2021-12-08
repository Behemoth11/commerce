import { FC } from "react";
import Expend from ".";
import Button from "../../Button";
import styles from "./style.module.scss";

import { Props } from ".";

interface MyProps extends Props {
  labels?: {[label: string]: string} 
  type?: string;
  header: string;
  close: () => void;
  next: (e?: any) => void;
  width: string;
}

const PopupExpendPreset: FC<MyProps> = ({
  type,
  labels,
  timeout,
  className,
  dependency,
  closePopup,
  top_prop,
  children,
  visible,
  header,
  close,
  next,
  width,
}) => {
  return (
    <Expend
      visible={visible}
      top_prop={top_prop}
      closePopup={closePopup}
      dependency={dependency}
      className={className}
      timeout={timeout}
    >
      <div
        className={styles.optionContainer}
        style={{ width, maxHeight: `calc(90vh - ${top_prop}px)` }}
      >
        {(!["2"].includes(type) && (
          <>
            <h2>{header}</h2>
            <div className={styles.children}>{children}</div>
            <Button label={labels?.back || "retour"} type="type1" onClick={close} />
            <Button label={labels?.forward || "continuer"} onClick={next} />
          </>
        )) || <div className={styles.children}>{children}</div>}
      </div>
    </Expend>
  );
};

export default PopupExpendPreset;
