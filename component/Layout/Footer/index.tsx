// @ts-ignore
import styles from "./style.module.scss";

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
              {/* <img src="/svg/Facebook.svg" /> {/* //Css grid property should match the number of Icons
              <img src="/svg/Facebook.svg" />
              <img src="/svg/Facebook.svg" />
              <img src="/svg/Facebook.svg" />
              <img src="/svg/Facebook.svg" /> */}
            </div>
          </div>

          <div className={`${styles.footerBody}`}>
            <ul className={styles.footerLink}>
              <li>
                <h3>Links</h3>
              </li>
              <li>Feedback</li>
              <li>About Us </li>
              <li>Contact Us</li>
              <li>More Informatioins</li>
            </ul>
            <ul className={styles.footerLink}>
              <li>
                <h3>Our Product</h3>
              </li>
              <li>dolor sit amet</li>
              <li>adipiscing elit</li>
              <li>Vivamus sollicitudin</li>
              <li>Aliquam elementum turpis</li>
              <li>Aenean iaculis </li>
            </ul>
            <ul className={styles.footerLink}>
              <li>
                <h3>Links</h3>
              </li>
              <li>Quisque vel neque</li>
              <li>vitae blandit aliquam</li>
              <li>Mauris ullamcorper</li>
              <li>vitae blandit</li>
              <li>fringilla molestie</li>
            </ul>
          </div>

          <div className={`${styles.footerBottom}`}>
            <div>
              <span>posuere ligula</span>
              <span>Pellentesque dictum</span>
              <span>finibus libero</span>
              <span>Morbi convallis felis</span>
            </div>
            <div>@ ALiquam sit</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(index);
