// @ts-ignore
import styles from "./style.module.css";
import React, { memo, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { getRandomInteger } from "../../shared/UtilityFunctions";
import { useSpring, animated } from "react-spring";

const ASPECT_RATIO: number = 130;

const setTemporaryState = (
  setState: React.Dispatch<React.SetStateAction<any>>,
  primaryState,
  finalState,
  delay
) => {
  setState(primaryState);
  setTimeout(() => {
    setState(finalState);
  }, delay);
};

const getNumberOfTracker: (
  element: React.MutableRefObject<HTMLDivElement>
) => string[] = (element) => {
  const result = [];
  let number = Math.ceil(element.current.scrollWidth / element.current.clientWidth);

  while (number > 0){
    result.push("not-important");
    number--
  }

  return result;
};

const index: React.FC<{ imageUrls: string[] }> = ({ imageUrls }) => {
  const [index, setIndex] = useState<number>(0);
  const [hasReachedTheLimit, setHasReachTheLimit] = useState<boolean | string>(
    false
  );
  const sliderRef = useRef<HTMLDivElement>();

  const [tracker, setTracker] = useState<string[]>(undefined);

  const update = (newIndex: number) => {
    const scrollWidth = sliderRef.current.scrollWidth;
    const targetScrollPosition = sliderRef.current.clientWidth * newIndex;
    if (targetScrollPosition >= scrollWidth)
      return setTemporaryState(setHasReachTheLimit, "RIGHT", false, 200);
    if (targetScrollPosition < 0)
      return setTemporaryState(setHasReachTheLimit, "LEFT", false, 200);

    sliderRef.current.scroll(targetScrollPosition, 0);
    return setIndex(newIndex);
  };


  const animateSpring = useSpring({
    transform:
      (hasReachedTheLimit == "LEFT" && "translateX(30%)") ||
      (hasReachedTheLimit == "RIGHT" && "translateX(-30%)") ||
      "translateX(0px)",
    from: {
      transform: "translateX(0px)",
    },
  });


  const eventListeners = useRef<number>(0)
  useEffect(() => {
    const resizingUpdate = () => {
      update(index);
      setTracker(getNumberOfTracker(sliderRef));
    };
    window.addEventListener("resize", resizingUpdate);
    () => window.removeEventListener("resize", resizingUpdate);
  }, []);

  useEffect(() => {
    setTracker(getNumberOfTracker(sliderRef));
  }, []);



  return (
    <div
      className={`${styles.container} container flex center-children`}
      style={{ position: "relative" }}
    >
      <animated.div
        className={`${styles.slider}`}
        ref={sliderRef}
        style={animateSpring}
      >
        {imageUrls.map((imageLink) => (
          <MyImage key={imageLink} imageLink={imageLink} />
        ))}
      </animated.div>

      <button
        onClick={() => update(index + 1)}
        className={styles.toLeft}
      ></button>
      <button
        onClick={() => update(index - 1)}
        className={styles.toRight}
      ></button>
      <div className={styles.tracker}>
        {tracker && tracker.map((unused, imageLinkIndex) => (
          <div
            key={imageLinkIndex}
            className={`${styles.circle} ${
              index == imageLinkIndex && styles.active
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(index);

const MyImage: React.FC<{ imageLink: string }> = memo((imageLink) => {
  return (
    <>
      <Image
        loader={() =>
          `https://source.unsplash.com/random/${getRandomInteger(
            490,
            510
          )}x${getRandomInteger(630, 670)}`
        }
        src={undefined || "/images/image1.jpg"}
        alt="There will soon be an alt"
        width={100}
        height={ASPECT_RATIO}
        layout="responsive"
      />
    </>
  );
});
