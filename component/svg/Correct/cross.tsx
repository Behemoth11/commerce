import styles from "./style.module.scss";

interface Props {
  stroke?: string;
  showing: boolean;
  className?: string;
}

const Cross:React.FC<Props> = ({ showing, className, stroke }) => {
  return (
    <svg viewBox="0 0 37 46" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        id="looking"
        className={styles.svg}
        style={{ strokeDashoffset: showing ? 0 : 141, strokeDasharray: 141, stroke: stroke || "red" }}
        d="M36 45L18.5 23M1 1L18.5 23M18.5 23L36 1L1 45"
      />
    </svg>
  );
};

export default Cross;
