// @ts-ignore
import styles from "./style.module.scss";

import { memo } from "react";
import MyLink from "../../MyLink";

const index = () => {
  return (
    <footer
      className={`${styles.footerContainer} flex center-children`}
      style={{ marginTop: "50px" }}
    >
      <div className={"big-container"}>
        <ul className={`${styles.footerLink} `}>
          <li>
            <MyLink href={"/feedback"}>votre avis</MyLink>
          </li>
          <li>
            <MyLink href={"/about"}>A propos de nous </MyLink>
          </li>
          <li>
            <MyLink href={"/contact"}>Nous Contacter</MyLink>
          </li>
          <li>
            <MyLink href={"/about#privacy policy"}>
              politique de confidentialite
            </MyLink>
          </li>
          <li>
            <MyLink href={"/about#terms and condition"}>
              Termes et condition
            </MyLink>
          </li>
        </ul>

        <div className={styles.cr}>
          <p> © Copyright 2021</p>
        </div>
      </div>
    </footer>
  );
};

export default memo(index);
