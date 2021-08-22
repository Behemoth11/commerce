import NavTop from "./NavTop";
import NavSide from "./NavSide";
// @ts-ignore
import styles from "./style.module.css";
import NavBarContext, { useNavBarState } from "./NavBarContext.js";
import { memo, useState, useEffect } from "react";

const useScrollDirectionToBottom = (sensibility, sampling, element) => {
  const [toBottom, setToBottom] = useState(false);

  useEffect(() => {
    element = document.getElementById(element);
    const getScrollSpeed = (e, firstTake = true, previousScroll) => {
      if (!firstTake) {
        if (previousScroll < 100) return setToBottom(false);

        let scrollIntensity = element.scrollTop - previousScroll;
        if (Math.abs(scrollIntensity) >= sensibility) setToBottom(scrollIntensity > 0 ? true : false);
    
        return;
      }

      previousScroll = element.scrollTop;
      setTimeout(() => {
        getScrollSpeed(e, false, previousScroll);
      }, sampling);
    };

    element.addEventListener("scroll", getScrollSpeed);
    return () => element.removeEventListener("scroll", getScrollSpeed);
  }, []);

  return toBottom;
}

const index = () => {

  const toBottom = useScrollDirectionToBottom(5, 50,'__next')


  return (
    <>
      <div
        className={`${styles.navigation} ${
          toBottom && styles.hidden
        } max-width`}
      >
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
