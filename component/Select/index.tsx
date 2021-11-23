// @ts-ignore
import styles from "./style.module.css";
import { memo, FC, ReactNode, useState, useEffect } from "react";

interface Props {
  message?: String;
  select_id: String;
  label?: String;
  selected: boolean;
  type?: any;
  onClick?: (e) => void;
  style?: {};
  childern?: ReactNode;
}

const Select: FC<Props> = ({
  select_id,
  selected,
  message,
  label,
  onClick,
  type,
  style,
  children,
}) => {
  const [showing, setShowing] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (selected) {
      setChecked(true);
    } else {
      setShowing(false);
    }
  }, [selected]);

  return (
    <div className={styles.container} onClick={onClick}>
      <h3> {label}</h3>
      <p>{message}</p>
      <div
        className={styles.checkMarker}
        style={{ transform: checked ? "scale(1)" : "scale(0)" }}
        onTransitionEnd={() => {
          if (selected) setShowing(true);
        }}
      >
        <svg viewBox="0 0 37 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            id="looking"
            style={{ strokeDashoffset: showing ? 0 : 60 }}
            d="M1.14084 14.6791L12.9923 24.5554L35.8586 0.694916"
            stroke="white"
            onTransitionEnd={() => !showing && setChecked(false)}
          />
        </svg>
      </div>
    </div>
  );
};

export default Select;
