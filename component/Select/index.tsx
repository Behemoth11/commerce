// @ts-ignore
import styles from "./style.module.scss";
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

const Select: FC<Props> = ({ selected, message, label, onClick }) => {
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
          // console.log("The first transition ended")
          // console.log(selected)
          if (selected ) setShowing(true);
          else setChecked(false)
        }}
      >
        <svg viewBox="0 0 37 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            id="looking"
            style={{ strokeDashoffset: showing ? 0 : 60 }}
            d="M1.14084 14.6791L12.9923 24.5554L35.8586 0.694916"
            stroke="white"
            onTransitionEnd={() => {
              // console.log("the second level transition endend");
              if (!selected) setChecked(false);
              else setShowing(true)
            }}
          />
        </svg>
      </div>
    </div>
  );
};

export default Select;
