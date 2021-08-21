// @ts-ignore
import styles from "./style.module.css";

import { memo } from "react";

const index = () => {
  return (
    <footer
      className={`${styles.loop} flex max-width center-children`}
      style={{ marginTop: "50px" }}
    >
      <div className="big-container  ">
        <div className={`${styles.footerContainer}`}>
          <div className={`${styles.footerHeader} flex`}>
            <div className={`${styles.brandName}`}>Moment</div>
            <div className={`${styles.Icons}`}>
              <img src="./facebook.svg" />
            </div>
          </div>

          <div className={`${styles.footerBody}`}>
            <ul className={styles.footerLink}>
              <li>Links</li>
              <li>The links</li>
              <li>The links</li>
              <li>The links</li>
              <li>The links</li>
              <li>The links</li>
            </ul>
            <ul className={styles.footerLink}>
              <li>Links</li>
              <li>The links</li>
              <li>The links</li>
              <li>The links</li>
              <li>The links</li>
              <li>The links</li>
            </ul>
            <ul className={styles.footerLink}>
              <li>Links</li>
              <li>The links</li>
              <li>The links</li>
              <li>The links</li>
              <li>The links</li>
              <li>The links</li>
            </ul>
          </div>
          <div className={`${styles.footerBottom} flex`}>
            <div> First one</div>
            <div> First one</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(index);
