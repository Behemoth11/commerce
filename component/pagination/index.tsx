// @ts-ignore
import styles from "./style.module.scss";
import { memo } from "react";

const PageIndex = ({ activePage, setPage, more }) => {
  const increase = () => {
    if (!more) return;
    setPage(parseInt(activePage) + 1);
  };
  const reduce = () => {
    if (activePage <= 1) return;
    setPage(parseInt(activePage) - 1);
  };

//   console.log(ac/tivePage, "active Page")

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${activePage === "1" && styles.done}`}
        onClick={reduce}
      >
        previous
      </button>
      <div className={`flex center-children ${styles.number}`}>
        <p>{activePage}</p>
      </div>

      <button
        className={`${styles.button} ${!more && styles.done}`}
        onClick={increase}
      >
        more
      </button>
    </div>
  );
};

export default PageIndex;
