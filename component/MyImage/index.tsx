// @ts-ignore
import styles from "./style.module.css";
import React, { SyntheticEvent } from "react";
import { memo, useState, useEffect, useRef } from "react";
import { useGlobalContext } from "../../Contexts/GlobalContext";

const MyImage: React.FC<{
  observer?: IntersectionObserver;
  no_optimization?: boolean;
  loadingState?: boolean;
  ASPECT_RATIO: number;
  onLoad?: (e: SyntheticEvent<HTMLImageElement, Event>) => void;
  isVisible: boolean;
  imageLink?: string;
}> = ({
  ASPECT_RATIO,
  imageLink,
  isVisible,
  onLoad,
  observer,
  loadingState,
  no_optimization,
}) => {
  const applyTransformation = (link: string, width: number) =>
    `https://res.cloudinary.com/dkoatnxem/image/upload/ar_${
      100 / ASPECT_RATIO
    },c_crop/c_scale,w_${width+100}/${link}`;

  const imageRef = useRef<HTMLDivElement>();
  const [_imageLink, setImageLink] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const { myWindow } = useGlobalContext();

  useEffect(() => {
    if (no_optimization) return;
    if (!imageLink) return;
    setImageLink(applyTransformation(imageLink, imageRef.current.clientWidth));
  }, [myWindow.size , imageLink, ASPECT_RATIO]);

  useEffect(() => {
    observer && observer.observe(imageRef.current);
  }, [observer]);

  useEffect(() => {
    if (isVisible) observer && observer.unobserve(imageRef.current);
  }, [isVisible]);

  const dummy = (e) => 2;
  const afterLoadInstructions = onLoad || dummy;

  return (
    <div>
      <div
        className={styles.myImage}
        ref={imageRef}
        style={{ paddingTop: `${ASPECT_RATIO}%` }}
      >
        {isVisible &&
          ((((no_optimization && imageLink) || _imageLink) && (
            <img
              src={(no_optimization && imageLink) || _imageLink}
              alt="There will soon be an alt"
              style={{ opacity: (loadingState && isLoading && 0) || 1 }}
              onLoad={(e) => {
                afterLoadInstructions(e);
                setIsLoading(false);
              }}
            />
          )) ||
            (loadingState && isLoading && (
              <div className={styles.loadingPlaceholder}>...Loading</div>
            )))}
      </div>
    </div>
  );
};

export default memo(MyImage);
