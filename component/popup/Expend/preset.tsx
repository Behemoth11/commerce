import { FC } from "react";
import Expend from ".";
import Button from "../../Button";
import styles from "./style.module.scss";

import { Props } from ".";

interface MyProps extends Props {
  header: string;
  close: () => void;
  next: (e?: any) => void;
  width: string;
}

const PopupExpendPreset: FC<MyProps> = ({
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
    >
      <div
        className={styles.optionContainer}
        style={{ width, maxHeight: `calc(90vh - ${top_prop}px)` }}
      >
        <h2>{header}</h2>
        <div className={styles.children}>{children}</div>
        <Button label={"retour"} type="type1" onClick={close} />
        <Button label={"continuer"} onClick={next} />
      </div>
    </Expend>
  );
};

export default PopupExpendPreset;
