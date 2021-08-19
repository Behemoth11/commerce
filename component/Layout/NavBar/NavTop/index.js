// @ts-ignore
import styles from "./style.module.css";
import Link from "next/link";
import { memo } from "react";
import { useNavBarState } from "../NavBarContext";

const index = () => {
  const { toggleNavBar } = useNavBarState();

  return (
    <nav className={`${styles.navTop} container flex`}>
      <div className="big-container flex flex-center center-children">
        <div className="flex-left" onClick={() => toggleNavBar()}>
          <div className={`${styles.burgerDiv}`}>
            <div className={styles.middle}></div>
          </div>
        </div>
        <div className="flex-center">
          <Link href="/">
            <a>MOMENT</a>
          </Link>
        </div>
        <div className=" flex flex-right" style={{ position: "relative" }}>
          <div
            className={`${styles.bagIcon} flex center-children hidden-overflow`}
          >
            <img src="/bagIcon.svg"></img>
            <div className={`${styles.ItemsInCart} flex center-children`}>
              <p>10</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default memo(index);
