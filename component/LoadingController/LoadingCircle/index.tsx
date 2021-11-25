import styles from "./style.module.scss";

const LoadingCircle = ({ visible }) => {
  return (
    <div className={styles.container} style={{ opacity: visible ? 1 : 0 }}>
      <div></div>
    </div>
  );
};

export default LoadingCircle;
