// @ts-ignore
import styles from "./style.module.css";
import React, { memo, useEffect, useRef, useState } from "react";
import { useMyWindow } from "../../../Contexts/GlobalContext";
import { validatePassword, validateUsername } from "./validator";
import { useSpring, animated, config, useTransition } from "react-spring";
import Login from "./login";
import Register from "./register";

const index = () => {
  const [inputValue, setInputValue] = useState({});
  const [height, setHeight] = useState(400);
  const myWindow = useMyWindow();
  const dummyRef = useRef(0);

  const [visible, setVisible] = useState(false);

  const [animateHeight, animateApi] = useSpring(() => ({
    height: 400,
  }));

  useEffect(() => {
    animateApi.start({ height: height });
  }, [height]);

  useEffect(() => {
    if (
      myWindow.hashLocation === "#login" ||
      myWindow.hashLocation === "#register"
    ) {
      setVisible(true);
    } else {
      const id = dummyRef.current;
      setTimeout(() => {
        if (id == dummyRef.current) {
          setVisible(false);
        }
      }, 200);
    }
  }, [myWindow.hashLocation]);

  return (
    <>
      <div
        className={`${styles.prompt} ${
          myWindow.hashLocation === "#" && styles.closed
        }`}
        style={{ zIndex: visible ? 3 : -5 }}
        onClick={(e) => e.stopPropagation()}
      >
        <animated.div style={{ ...animateHeight }}>
          <Register
            inputValue={inputValue}
            setInputValue={setInputValue}
            setHeight={setHeight}
          />
          <Login
            inputValue={inputValue}
            setInputValue={setInputValue}
            setHeight={setHeight}
          />
        </animated.div>
      </div>
    </>
  );
};

export default memo(index);
