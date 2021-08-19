import { useEffect } from "react";
import NavTop from "./NavTop";
import NavSide from "./NavSide";
// @ts-ignore
import styles from "./style.module.css";
import NavBarContext, { useNavBarState } from "./NavBarContext.js";
import { memo } from "react";

const index = () => {
  const { sideBarIsOpen } = useNavBarState();

  return (
    <>
      <div className={`${styles.navigation} max-width`}>
        <NavBarContext>
          <h3 className={styles.annoncement}>This is something cool</h3>
          <NavTop />
          <NavSide />
        </NavBarContext>
      </div>
    </>
  );
};

export default memo(index);
