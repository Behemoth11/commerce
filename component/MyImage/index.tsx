// @ts-ignore
import styles from "./style.module.css";
import { memo, useState, useEffect, useRef } from "react";
import { getRandomInteger } from "../../shared/UtilityFunctions";

const MyImage: React.FC<{
  imageLink: string;
  ASPECT_RATIO: number;
  onLoad?: () => void;
  isVisible?: boolean;
  observer?: any;
}> = memo(({ imageLink, ASPECT_RATIO, isVisible, onLoad, observer }) => {
  const src = `https://source.unsplash.com/random/${getRandomInteger(
    200,
    250
  )}x${getRandomInteger(300, 350)}`;

  const imageRef = useRef();
  useEffect(() => {
    observer && observer.observe(imageRef.current);
  }, [observer]);

  useEffect(() => {
    console.log(isVisible)
    if (isVisible) observer && observer.unobserve(imageRef.current);
  }, [isVisible]);

  return (
    <div className={styles.myImage} ref={imageRef} style={{paddingTop: `${ASPECT_RATIO}%`}}>
     { isVisible &&
      <img
        className={styles.myImage}
        src={src}
        alt="There will soon be an alt"
        onLoad={onLoad}
      />}
    </div>
  );
});

export default MyImage;
