// @ts-ignore
import styles from "./style.module.css";
import { memo, useEffect, useRef } from "react";
import { useTransition, animated, config } from "react-spring";
import { useGlobalContext } from "../../Contexts/GlobalContext";

const Popup = ({ children, isVisible, closePopup, duration, type, name }) => {
  const { myWindow } = useGlobalContext();
  const popupId = useRef(0);

  const nonAnimatedVisibility = isVisible && myWindow.isFocused === name;
  const animate = useTransition(nonAnimatedVisibility, {
    from: { opacity: 0, x: -100 },
    enter: { opacity: 1, x: 0 },
    leave: { opacity: 0, x: 100 },
    config: config.stiff,
  });

  useEffect(() => {

    if (isVisible) {
      myWindow.setFocusOn(name);
      const myPopupId = popupId.current;
      const timeOut = setTimeout(() => {
        if (myPopupId === popupId.current) {
          closePopup();
        }
      }, duration);
      // console.log(isVisible && "open" || "close", myWindow.isFocused, nonAnimatedVisibility)
      return () => clearTimeout(timeOut);
    }

    // console.log(isVisible && "open" || "close", myWindow.isFocused, nonAnimatedVisibility)
  }, [isVisible]);

  useEffect(() => {
    // console.log(nonAnimatedVisibility)
    if (nonAnimatedVisibility) return;
    popupId.current++;
  }, [nonAnimatedVisibility]);

  return animate(
    (_style, _isVisible) =>
      _isVisible && (
        <div
          className={`${styles.container} ${styles[type]} ${
            !nonAnimatedVisibility && styles.notVisible
          }`}
        >
          <animated.div className={styles.popupContainer}>
            <animated.div
              style={_style}
              className={`${styles[type]} ${styles.content}`}
            >
              {children}
            </animated.div>
          </animated.div>
        </div>
      )
  );
};

export default Popup;
