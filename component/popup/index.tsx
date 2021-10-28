// @ts-ignore
import styles from "./style.module.css";
import { memo, useEffect } from "react";
import { useTransition, animated, config } from "react-spring";

const Popup = ({ children, isVisible, closePopup, duration, type }) => {
  const animate = useTransition(isVisible, {
    from: { opacity: 0, x: -100 },
    enter: { opacity: 1, x: 0 },
    leave: { opacity: 0, x: 100 },
    config: config.stiff,
  });

  const nonAnimatedVisibility = isVisible;

  useEffect(() => {
    if (isVisible) {
      const timeOut = setTimeout(() => {
        closePopup();
      }, duration);
      return () => clearTimeout(timeOut)
    }
  }, [isVisible]);

  return animate(
    (_style, isVisible) =>
      isVisible && (
        <div
          className={`${styles.container} ${styles[type]} ${
            !nonAnimatedVisibility && styles.notVisible
          }`}
        >
          {/* <animated.div
            style={{ opacity: _style.opacity }}
            onClick={closePopup}
            className={styles.overlay}
          ></animated.div> */}

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
