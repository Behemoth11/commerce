// @ts-ignore
import styles from "./style.module.scss";

import { memo } from "react";

const index = ({ content, action }) => {
  return (
    <div className={`${styles.filter} flex`}>
      <p className="">{content}</p>
      <div className={`${styles.crossContainer}`} onClick={() => action()}>
        <div className={`${styles.cross} `}></div>
      </div>
    </div>
  );
};

export default memo(index);
