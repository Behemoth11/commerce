// @ts-ignore
import styles from "./style.module.scss";
import { memo, FC, ReactNode } from "react";

interface Props {
  label?: String;
  type?: any;
  onClick?: (e) => void;
  style?: {};
  childern?: ReactNode
}

const Button: FC<Props> = ({ label, onClick, type, style, children }) => {
  return (
    <button
      className={`${styles.container} ${styles[type]}`}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}

      style={style||{}}
    >
      {children || label|| "Button"}
    </button>
  );
};

export default memo(Button);
