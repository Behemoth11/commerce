// @ts-ignore
import styles from "./style.module.scss";
import { memo, useRef, useState, useEffect , ReactNode, FC} from "react";
import { animated, useSpring, config, useTransition } from "react-spring";
import { useMyWindow } from "../../../Contexts/GlobalContext";

export interface Props{
  dependency?: any[];
  top_prop: number,
  visible: boolean
  children: ReactNode,
  closePopup: () => void;
}

const Expend:FC<Props> = ({ visible, children, top_prop, dependency }) => {
  const myWindow = useMyWindow();
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
    if (visible) {
      const position =
      //@ts-ignore
        popupRef?.current?.parentElement?.getBoundingClientRect();
      api({
        from: {
          top: position.top + "px",
          left: position.left + "px",
          width: position.width + "px",
          height: position.height + "px",
          opacity: 0,
        },
        reset: true,
        config: config.stiff,
      });
    }
  }, [visible]);

  useEffect(() => {
    //@ts-ignore
    const position = popupRef?.current?.parentElement?.getBoundingClientRect();
    //@ts-ignore
    const childDimensions = childRef?.current?.getBoundingClientRect();
    const __next = document.getElementById("__next");

    if (visible) {
      api.start({
        opacity: 10,
        width: childDimensions.width + "px",
        height: childDimensions.height + "px",
        left: __next.clientWidth / 2 - childDimensions.width / 2 + "px",
        top:
          Math.max(0, (top_prop || __next.clientHeight / 2 - childDimensions.height / 2)) +
          "px",
      });
    } else {
      api.start({
        opacity: 0,
        top: Math.min(__next.clientHeight - 100 , position.top) + "px",
        left: position.left + "px",
        width: position.width + "px",
        height: position.height + "px",
      });
    }
  }, [visible].concat(dependency||[]));


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
