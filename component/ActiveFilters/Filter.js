// @ts-ignore
import styles from "./style.module.css";

import { memo } from "react";

const index = ({ content }) => {
  return (
    <div className={`${styles.filter} flex`}>
          <p className=''>{content}</p>
          <div className={`${styles.cross} no-shrink`}></div>
    </div>
  );
};

export default memo(index);
