// @ts-ignore
import styles from "./style.module.css";
import React, { memo, useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../../Contexts/GlobalContext";
import { validatePassword, validateUsername } from "./validator";
import { useSpring, animated, config, useTransition } from "react-spring";
import Login from "./login";
import Register from "./register";

const index = () => {
  const [inputValue, setInputValue] = useState({});
  const [height, setHeight] = useState(400);
  const { myWindow } = useGlobalContext();

  const [visible , setVisible] = useState(false)

  const [animateHeight, animateApi] = useSpring(() => ({
    height: 400,
  }));

  useEffect(() => {
    animateApi.start({ height: height });
  }, [height]);

  useEffect(() => {
    if (myWindow.isShown === "closed"){
      setTimeout(() => setVisible(false), 200)
    } else {
      setVisible(true)
    }
  }, [myWindow.isShown])


  return(
    <div
      className={`${styles.prompt} ${
        myWindow.isShown === "closed" && styles.closed
      }`}
      style={{zIndex: visible ? 3:-8}}
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
  );
};

export default memo(index);
