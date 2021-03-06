// @ts-ignore
import styles from "./style.module.scss";
import { useSpring, animated, useTransition } from "react-spring";
import Loading from "./loading";
import {
  memo,
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

interface Props {
  customMessage: {};
  no_scroll?: boolean;
  children: JSX.Element;
  pseudoStateDuration?: number;
  state: string | "loading" | "success" | "failure";
  setState: Dispatch<
    SetStateAction<string | "loading" | "success" | "failure">
  >;
}

const LoadingController: React.FC<Props> = ({
  children,
  state,
  setState,
  no_scroll,
  customMessage,
  pseudoStateDuration,
}) => {
  const afterSubmitSpring = useSpring({
    x: ((state == "success" || state == "failure") && "0%") || "-100%",
    opacity: ((state == "success" || state == "failure") && "1") || "0",
    from: {
      x: "-100%",
    },
  });

  const loadingTransition = useTransition(state == "loading", {
    enter: { opacity: "1", transform: "scale(1)" },
    leave: { opacity: "1", transform: "scale(1)" },
    from: { opacity: "1", transform: "scale(0.9)" },
  });

  const initRef = useRef(state);

  useEffect(() => {
    if (!["loading", "success", "failure"].includes(state)) {
      initRef.current = state;
    }
  }, [state]);

  useEffect(() => {
    if (state == "success" || state == "failure") {
      setTimeout(() => {
        setState(initRef.current);
      }, pseudoStateDuration || 1000);
    }
  }, [state]);

  useEffect(() => {
    const next = document.getElementById("__next");
    next.scroll(0, 0);
    if (state == "loading" && no_scroll) {
      next.style.overflow = "hidden";
    } else if (state != "success" && state != "failure" && no_scroll) {
      next.style.overflow = "";
    }
  }, [state]);
  return (
    <div className={`${styles.controller}`}>
      {loadingTransition(
        (_style, visible) =>
          visible && (
            <animated.div className={`${styles.states}`} style={_style}>
              <div>
                <Loading width="80px" background="var(--accent-color-1)" />
              </div>
            </animated.div>
          )
      )}
      <animated.div className={`${styles.states}`} style={afterSubmitSpring}>
        <div>
          <p className={`${styles[state]} ${styles.message}`}>
            {customMessage && customMessage[state]}
          </p>
        </div>
      </animated.div>

      <div>{children}</div>
    </div>
  );
};

export default LoadingController;
