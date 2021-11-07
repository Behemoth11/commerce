// @ts-ignore
import styles from "./style.module.css";
import { memo, FC } from "react";

interface Props {
  label?: String;
  type?: any;
  onClick?: (e) => void;
}

const Button: FC<Props> = ({ label, onClick, type }) => {
  return (
    <button
      className={`${styles.container} ${styles[type]}`}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {label || "Button"}
    </button>
  );
};

export default memo(Button);
