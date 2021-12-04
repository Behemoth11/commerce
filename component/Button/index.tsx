// @ts-ignore
import styles from "./style.module.scss";
import { memo, FC, ReactNode } from "react";

interface Props {
  label?: String;
  type?: any;
  onClick?: (e) => void;
  style?: {};
  className?: string,
  children?: ReactNode
}

const Button: FC<Props> = ({ label, onClick, type, style, children , className}) => {
  return (
    <button
      className={`${styles.container} ${styles[type]} ${className} `}
      onClick={(e) => {
        e.preventDefault();
        onClick && onClick(e);
      }}

      style={style||{}}
    >
      {children || label|| "Button"}
    </button>
  );
};

export default memo(Button);
