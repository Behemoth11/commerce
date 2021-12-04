// @ts-ignore
import styles from "./style.module.scss";
import { memo, useRef, useState, useEffect, FC } from "react";
import { animated, useSpring, config, useTransition } from "react-spring";
import { useMyWindow } from "../../../Contexts/GlobalContext";

interface Props {
  children: any;
  type: "top" | "bottom";
  width: string;
  name: string;
}

const OptionBottom: FC<Props> = ({ children, type, width, name }) => {
  const myWindow = useMyWindow();
  const popupId = useRef(0);

  const visible = myWindow.isFocused === name;
  const animate = useSpring({
    from: { opacity: 0, y: "0%" },
    opacity: visible ? 1 : 0,
    y: visible ? "0%" : (type === "top" && "-100%") || "100%",
    config: config.stiff,
  });

  useEffect(() => {
    if (visible) return;
    popupId.current++;
  }, [visible]);
  
  return (
    <animated.div
      className={`${styles.container} ${styles[type]}`}
      onClick={(e) => e.stopPropagation()}
      style={animate}
    >
      {children}
    </animated.div>
  );
};

//angel of death

export default OptionBottom;
