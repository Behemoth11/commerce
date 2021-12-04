// @ts-ignore
import styles from "./style.module.scss";
import { memo, useEffect, useRef } from "react";
import { useTransition, animated, config } from "react-spring";
import { useMyWindow } from "../../Contexts/GlobalContext";

interface Props {
  duration: number;
  type: string;
  name: string;
  cb?: () => void;
}

const Popup: React.FC<Props> = ({ children, duration, type, name, cb }) => {
  const myWindow = useMyWindow();
  const popupId = useRef(0);

  const visibility = myWindow.isFocused === name;

  let animate;

  switch (type) {
    case "type1":
      animate = useTransition(visibility, {
        from: { opacity: 0, y: -200 },
        enter: { opacity: 1, y: 0 },
        leave: { opacity: 0, y: -20 },
        config: config.stiff,
      });

      break;
    default:
      animate = useTransition(visibility, {
        from: { opacity: 0, x: -100 },
        enter: { opacity: 1, x: 0 },
        leave: { opacity: 0, x: 100 },
        config: config.stiff,
      });
  }

  useEffect(() => {
    // console.log("visibility accoridng to parent : ", isVisible)

    if (visibility) {
      myWindow.setFocusOn(name);
      const myPopupId = popupId.current;
      const timeOut = setTimeout(() => {
        if (myPopupId === popupId.current) {
          myWindow.setFocusOn("none");
          if (cb) cb();
        }
      }, duration);
      // console.log(isVisible && "open" || "close", myWindow.isFocused, nonAnimatedVisibility)
      return () => clearTimeout(timeOut);
    }

    // console.log(isVisible && "open" || "close", myWindow.isFocused, nonAnimatedVisibility)
  }, [visibility]);

  useEffect(() => {
    // console.log(nonAnimatedVisibility)
    if (visibility) return;
    popupId.current++;
  }, [visibility]);

  return animate(
    (_style, _isVisible) =>
      _isVisible && (
        <div
          className={`${styles.container} ${styles[type]} ${
            !visibility && styles.notVisible
          }`}
        >
          <animated.div className={styles.popupContainer}>
            <animated.div
              style={_style}
              className={`${styles[type]} ${styles.content}z`}
            >
              {children}
            </animated.div>
          </animated.div>
        </div>
      )
  );
};

export default Popup;
