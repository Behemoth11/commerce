import { useTransition } from "@react-spring/core";
import { FC } from "react";
import { animated } from "react-spring";
import styles from "./style.module.scss";
import Loading from "../loading";

interface Props {
  visible: boolean;
  type?: string;
  background?: string;
  innerBackground?: string;
}

const LoadingCircle: FC<Props> = ({ visible, background, type, innerBackground }) => {
  const transition = useTransition(visible, {
    from: {
      transform: "scale(0)",
    },
    enter: {
      transform: "scale(1)",
    },
    leave: {
      transform: "scale(0)",
    },
  });

  if (type == "2")
    return transition(
      (style, boolean) =>
        boolean && (
          <animated.span style={style} className={styles.n_l_ctn}>
            <span className={styles.n_l}></span>
          </animated.span>
        )
    );

  if (type === "3")
    return (
      <Loading
        width={(visible  && "2em") || "0px"}
        background={ background ||"var(--accent-color)"}
        style={{ display: "inline-block", marginLeft: "var(--margin)" }}
      />
    );

  return (
    <div className={styles.b}>
      <div
        style={{
          opacity: visible ? 1 : 0,
          background: `linear-gradient(25deg, ${background}, white)`,
        }}
      >
        {/* <div
          className={styles.container}
 
        > */}
        <div style={{backgroundColor: innerBackground}}></div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default LoadingCircle;
