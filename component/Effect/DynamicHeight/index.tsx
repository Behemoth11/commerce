import { animated, useSpring } from "@react-spring/web";
import React, { Children, useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";

interface Props {
  show?: boolean;
  dependency?: any[];
  children: React.ReactNode;
}
const DynamicHeight: React.FC<Props> = ({ show, children, dependency }) => {
  const child_ref = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    setHeight(`${show ? child_ref.current.clientHeight : 0}px`);
  }, dependency);
  return (
    <div style={{ height , overflow: show? "visible": "hidden"}} className={styles.d_h}>
      <div ref={child_ref}>{children}</div>
    </div>
  );
};

export default DynamicHeight;
