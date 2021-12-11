// @ts-ignore
import styles from "./style.module.scss";
import React, { memo, useEffect, useRef, useState } from "react";
import { useMyWindow } from "../../../Contexts/GlobalContext";
import { validatePassword, validateUsername } from "./validator";
import { useSpring, animated, config, useTransition } from "react-spring";
import Login from "./login";
import Register from "./register";
import Cross from "../../svg/Correct/cross";

const index = () => {
  const [height, setHeight] = useState(400);
  const myWindow = useMyWindow();
  const dummyRef = useRef(0);

  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<"login" | "register" | "">("");

  const [animateHeight, animateApi] = useSpring(() => ({
    height: 400,
  }));

  useEffect(() => {
    animateApi.start({ height: height });
  }, [height]);

  useEffect(() => {
    if (myWindow.hashLocation === "#auth") {
      setVisible(true);
      setActive("login");
    } else {
      const id = dummyRef.current;
      setActive("");
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
          myWindow.hashLocation === "" && styles.closed
        }`}
        style={{ zIndex: visible ? 3 : -5 }}
        onClick={(e) => e.stopPropagation()}
      >
        <animated.div style={{ ...animateHeight }}>
          <Register
            setHeight={setHeight}
            active={active === "register"}
            setActive={setActive}
          />
          <Login
            setHeight={setHeight}
            active={active === "login"}
            setActive={setActive}
          />
        </animated.div>
      </div>
    </>
  );
};

export default memo(index);
