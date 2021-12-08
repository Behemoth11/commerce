import { animated, useSpring } from "@react-spring/web";
import React, { Children, useEffect, useRef, useState } from "react";
import { useSelectiveState } from "../../../shared/CustomHooks";
import styles from "./style.module.scss";

interface Props {
  show?: boolean;
  dependency?: any[];
  children: React.ReactNode;
  isVisible?: boolean;
}
const DynamicHeight: React.FC<Props> = ({
  show,
  children,
  dependency,
  isVisible,
}) => {
  const child_ref = useRef(null);
  const [height, setHeight] = useState<string>();
  const [visible, setVisible] = useState(true);

  const [has_init, init_id, init] = useSelectiveState(false);

  useEffect(() => {
    setVisible(show === false ? false : true);
    setHeight(`${show === false ? 0 : child_ref.current.clientHeight}px`);
  }, [visible, show].concat(dependency));

  useEffect(() => {
    if (isVisible && height) {
      const _id = init_id.current;
      setTimeout(() => {
        if (init_id.current === _id) {
          init(true);
        }
      }, 1000);
    }
  }, [height]);

  useEffect(() => {
    if (!isVisible) {
      init(false);
    }
  }, [isVisible]);

  return (
    <div
      style={{ height, overflow: show ? "visible" : "hidden" }}
      onTransitionEnd={() => {
        setVisible(show === false ? false : true);
      }}
      className={has_init && styles.d_h || ""}
    >
      <div ref={child_ref}>{visible && children}</div>
    </div>
  );
};

export default DynamicHeight;
