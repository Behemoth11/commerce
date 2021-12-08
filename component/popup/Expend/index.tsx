// @ts-ignore
import styles from "./style.module.scss";
import { memo, useRef, useState, useEffect, ReactNode, FC } from "react";
import { animated, useSpring, config, useTransition } from "react-spring";
import { useMyWindow } from "../../../Contexts/GlobalContext";

export interface Props {
  dependency?: any[];
  top_prop: number;
  visible: boolean;
  children: ReactNode;
  closePopup: () => void;
  className?: string;
  timeout?: number
}

const Expend: FC<Props> = ({
  visible,
  children,
  top_prop,
  dependency,
  className,
  timeout
}) => {
  const [myState, setMyState] = useState("idle");
  const myWindow = useMyWindow();
  const popupRef = useRef();
  const childRef = useRef();

  const [styles_animated, api] = useSpring(() => ({
    top: "1px",
    left: "10px",
    width: "10px",
    height: "10px",
    opacity: 0,
    onRest: () => setMyState("idle"),
  }));

  useEffect(() => {
    setMyState("working");
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
        onRest: () => console.log("I am resting 2"),
      });
    }
  }, [visible]);

  useEffect(() => {
    setMyState("working");
    //@ts-ignore
    const position = popupRef?.current?.parentElement?.getBoundingClientRect();
    const __next = document.getElementById("__next");
    
    // console.log("evaluation of the target height", childDimensions.height)
    // console.log("input value :", dependency)
    
    if (visible) {
      // setTimeout(() => {
        //@ts-ignore
        const childDimensions = childRef?.current?.getBoundingClientRect();
        api.start({
          opacity: 10,
          width: childDimensions.width + "px",
          height: childDimensions.height + "px",
          left: __next.clientWidth / 2 - childDimensions.width / 2 + "px",
          top:
            Math.max(
              0,
              top_prop || __next.clientHeight / 2 - childDimensions.height / 2
            ) + "px",
        });
      // }, timeout || 0);
    } else {
      api.start({
        opacity: 0,
        top: Math.min(__next.clientHeight - 100, position.top) + "px",
        left: position.left + "px",
        width: position.width + "px",
        height: position.height + "px",
      });
    }
  }, [visible, myWindow.size].concat(dependency || []));

  return (
    <animated.div
      className={`${styles.container} ${
        visible && styles.visible
      } ${className}`}
      onClick={(e) => e.stopPropagation()}
      style={
        myState === "idle"
          ? { ...styles_animated, height: "auto" }
          : styles_animated
      }
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
