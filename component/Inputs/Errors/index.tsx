// @ts-ignore
import styles from "./style.module.css";
import { memo } from "react";

const Errors = ({ errMsg }) => {
  return (
    <>
      {errMsg.length > 0 && (
        <ul className={styles.errorContainer}>
          {errMsg.map((error) => (
            <li key={error}>* {error}.</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default memo(Errors);

