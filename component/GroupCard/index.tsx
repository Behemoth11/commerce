import styles from "./style.module.scss";
import MyImage from "../MyImage";
import {FC} from "react";

interface Props {
  title: string;
  message: string;
  pictures: string[];
  onClick: (e) => void;
}

const GroupCard: FC<Props> = ({ title, onClick, message, pictures }) => {
  return (
    <div className={styles.b} onClick={onClick}>
      <h2>{title}</h2>
      <p>{message}</p>
      <div className={styles.imageContainer}>
        {pictures.map((picture) => (
          <MyImage
          isVisible={true}
            imageLink={picture}
            ASPECT_RATIO={100}
            loadingState={true}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupCard;
