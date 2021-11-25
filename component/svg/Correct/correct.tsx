import styles from "./style.module.scss";

const SvgCorrect = ({ showing, className }) => {
  return (
    <svg
      viewBox="0 0 37 26"
      fill="none"
      className={className}
    >
      <path
        className={styles.svg}
        style={{ strokeDashoffset: showing ? 0 : 60, strokeDasharray: 60  }}
        d="M1.14084 14.6791L12.9923 24.5554L35.8586 0.694916"
        stroke="white"
      />
    </svg>
  );
};

export default SvgCorrect;
