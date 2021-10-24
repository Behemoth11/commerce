import NavTop from "./NavTop";
import NavSide from "./NavSide";
// @ts-ignore
import styles from "./style.module.css";
import NavBarContext, { useNavBarContext } from "./navBarContext";
import { memo, useState, useEffect } from "react";


const useScrollDirectionToBottom = (
  sensibility: number,
  sampling: number,
  element
) => {
  const { toBottom, setToBottom } = useNavBarContext();

  useEffect(() => {
    element = document.getElementById(element);
    const getScrollSpeed = async (e, firstTake = true, previousScroll) => {
      if (!firstTake) {
        if (previousScroll < 100) return await setToBottom(false);

        let scrollIntensity = element.scrollTop - previousScroll;
        if (Math.abs(scrollIntensity) >= sensibility)
          await setToBottom(scrollIntensity > 0 ? true : false);

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
};

const R_NavBar = () => {
  const toBottom = useScrollDirectionToBottom(5, 50, "__next") ;

  return (
    <>
      <div
        className={`${styles.navigation} ${
          toBottom && styles.hidden
        } max-width`}
      >
        <h3 className={styles.annoncement}>This is something cool</h3>
        <NavTop />
        <NavSide />
      </div>
    </>
  );
};

const Navigation = () => {
  return (
    <NavBarContext>
      <R_NavBar />
    </NavBarContext>
  );
};

export default Navigation;
