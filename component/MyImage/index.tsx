// @ts-ignore
import styles from "./style.module.scss";
import React, { SyntheticEvent } from "react";
import { memo, useState, useEffect, useRef } from "react";
import { useMyWindow } from "../../Contexts/GlobalContext";

const MyImage: React.FC<{
  observer?: IntersectionObserver;
  no_optimization?: boolean;
  loadingState?: boolean;
  ASPECT_RATIO: number;
  onLoad?: (e: SyntheticEvent<HTMLImageElement, Event>) => void;
  isVisible: boolean;
  imageLink?: string;
  alt?: string;
}> = ({
  ASPECT_RATIO,
  imageLink,
  isVisible,
  onLoad,
  alt,
  observer,
  loadingState,
  no_optimization,
}) => {
  const adapt = (link: string, width: number) =>
    `https://res.cloudinary.com/${
      process.env.NEXT_PUBLIC_CLOUDINARY_NAME
    }/image/upload/ar_${
      Math.round(10000 / ASPECT_RATIO) / 100
    },c_crop/c_scale,w_${width}/${link}.jpg`;
  //   },c_crop/c_scale,w_${width+100}/${link}`;

  const imageRef = useRef<HTMLDivElement>();
  // const [_imageLink, setImageLink] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const myWindow = useMyWindow();
  
  useEffect(() => {
    if (no_optimization) return;
    if (!imageLink) return;
    // setImageLink(applyTransformation(imageLink, imageRef.current.clientWidth));
  }, [myWindow.size, imageLink, ASPECT_RATIO]);

  useEffect(() => {
    observer && observer.observe(imageRef.current);
  }, [observer]);

  useEffect(() => {
    // if (isVisible) console.log("I am visible");
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
        {(isVisible && no_optimization && imageLink && (
          <img
            src={imageLink}
            alt="There will soon be an alt"
            style={{ opacity: (loadingState && isLoading && 0) || 1 }}
            onLoad={(e) => {
              afterLoadInstructions(e);
              setIsLoading(false);
            }}
          />
        )) ||
          (isVisible && !no_optimization && imageLink && (
            <img
              srcSet={`${adapt(imageLink, 300)} 300w, ${adapt(
                imageLink,
                400
              )} 400w, ${adapt(imageLink, 500)} 500w `}
              sizes={`${imageRef?.current?.clientWidth || 350}px`}
              src={adapt(imageLink, 350)}
              alt="There will soon be an alt"
              style={{ opacity: (loadingState && isLoading && 0) || 1 }}
              onLoad={(e) => {
                afterLoadInstructions(e);
                setIsLoading(false);
              }}
            />
          )) ||
          (loadingState && isLoading && (
            <div className={`${styles.loadingPlaceholder} animated dark`}>
              ...Loading
            </div>
          ))}
      </div>
    </div>
  );
};

export default memo(MyImage);
