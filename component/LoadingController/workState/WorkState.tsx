import { countBy } from "cypress/types/lodash";
import React, { useEffect, useRef } from "react";
import DynamicHeight from "../../Effect/DynamicHeight";
import LoadingCircle from "../LoadingCircle";
import styles from "./style.module.scss";

interface Props {
  style?: {};
  delay?: number;
  color?: string;
  type?: string;
  state: string;
  cb?: {
    general?: () => void;
    failure?: () => void;
    success?: () => void;
  };
  success?: string;
  failure?: string;
  general?: string;
  mainColor?: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const WorkState: React.FC<Props> = ({
  cb,
  type,
  state,
  style,
  delay,
  color,
  success,
  failure,
  general,
  setState,
  mainColor,
}) => {
  const id = useRef(0);

  useEffect(() => {
    id.current++;
    if (["success", "failure"].includes(state)) {
      const e_id = id.current;

      setTimeout(() => {
        if (e_id == id.current) {
          setState((prevstate) => {
            if (!cb) return "rest";
            if (prevstate === "success" && cb.success) cb.success();
            else if (prevstate === "failure" && cb.failure) cb.failure();

            if (cb.general) cb.general();
            return "rest";
          });
        }
      }, delay || 1000);
    }
  }, [state]);
  return (
    <div className={styles.ctn} style={style}>
      <DynamicHeight dependency={[state]}>
        {(state == "working" && <LoadingCircle visible={true} type={type} background={color} innerBackground={mainColor} />) ||
          (state === "success" && (
            <span className={styles.success}>
              {general || success || "L'opération a réussi"}
            </span>
          )) ||
          (state === "failure" && (
            <span className={styles.failure}>
              {general || success || "Quelque chose s'est mal passé"}
            </span>
          )) ||
          (state === "rest" && "")}
      </DynamicHeight>
    </div>
  );
};

export default WorkState;
