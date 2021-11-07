import styles from "./style.module.css";
import {FC} from "react";
interface Props{
  width: string,
  background?: string,
  style?: {}
} 

const Loading:FC<Props> = ({width, background, style}) => {
  return (
    <div style={{width: width, transition: "width var(--animation-duration)" , ...style}} >
      <div className={styles.ldsEllipsis}>
        <div style={{ backgroundColor: background}}></div>
        <div style={{ backgroundColor: background}}></div>
        <div style={{ backgroundColor: background}}></div>
        <div style={{ backgroundColor: background}}></div>
      </div>
    </div>
  );
}

export default Loading;
