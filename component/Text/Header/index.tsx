import React from "react";
import styles from "./style.module.scss";

interface Props {
  children: React.ReactNode;
  fontSize?: "string";
  design?: "string";
  level: number;
  id?: string;

}
const Header:React.FC<Props> = ({ children, level, design, fontSize, id }) => {
  switch (level) {
    case 1:
      return <h1 className={`${styles.header} ${styles[design]}`} id={id}>{children}</h1>;
    case 2:
      return <h2 className={`${styles.header} ${styles[design]}`} id={id}>{children}</h2>;
  }
};

export default Header;
