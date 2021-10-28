import styles from "./style.module.css";

function Loading({width}) {
  return (
    <div style={{width: width, transition: "width var(--animation-duration)"}} >
      <div className={styles.ldsEllipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;
