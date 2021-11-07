// @ts-ignore
import styles from "./style.module.css";
import { memo, useRef, useState, useEffect } from "react";
import { animated, useSpring, config, useTransition } from "react-spring";
import { useGlobalContext } from "../../../Contexts/GlobalContext";

const Expend = ({ visible, children, top_prop , closePopup }) => {
  const {myWindow} = useGlobalContext()
  const popupRef = useRef();
  const childRef = useRef();

  const [styles_animated, api] = useSpring(() => ({
    top: "1px",
    left: "10px",
    width: "10px",
    height: "10px",
    opacity: 0,
  }));

  useEffect(() => {
    //@ts-ignore
    const position = popupRef?.current?.parentElement?.getBoundingClientRect();
    api({
      from: {
        top: position.top + "px",
        left: position.left + "px",
        width: position.width + "px",
        height: position.height + "px",
        opacity: 0,
      },
      reset: true,
      // config: config.stiff
    });
  }, []);

  useEffect(() => {
    //@ts-ignore
    const position = popupRef?.current?.parentElement?.getBoundingClientRect();
    //@ts-ignore
    const childDimensions = childRef?.current?.getBoundingClientRect();
    const __next = document.getElementById("__next");

    if (visible) {
      myWindow.overlay.open(closePopup)
      api.start({
        opacity: 10,
        width: childDimensions.width + "px",
        height: childDimensions.height + "px",
        left: __next.clientWidth / 2 - childDimensions.width / 2 + "px",
        top:
          (top_prop || __next.clientHeight / 2 - childDimensions.height / 2) +
          "px",
      });
    } else {
      myWindow.overlay.close()
      api.start({
        opacity: 0,
        top: position.top + "px",
        left: position.left + "px",
        width: position.width + "px",
        height: position.height + "px",
      });
    }
  }, [visible]);
  const transition = useTransition(visible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
      <animated.div
        className={`${styles.container} ${visible && styles.visible}`}
        onClick={(e) => e.stopPropagation()}
        style={styles_animated}
        ref={popupRef}
      >
        <div ref={childRef} className={`${styles.childrenContainer}`}>
          {children}
        </div>
      </animated.div>
  );
};

//angel of death

export default memo(Expend);
