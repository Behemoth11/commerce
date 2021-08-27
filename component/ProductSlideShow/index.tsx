// @ts-ignore
import styles from "./style.module.css";
import MyImage from "../MyImage";
import { useSpring, animated } from "react-spring";
import React, { memo, useState, useRef, useEffect } from "react";

//function for setting temporary states
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

//getNumberOfTracker gives back the number of tracker that the slide should have
const getNumberOfTracker: (
  element: React.MutableRefObject<HTMLDivElement>
) => string[] = (element) => {
  const result = [];
  let number = Math.ceil(
    element.current.scrollWidth / element.current.clientWidth
  );

  while (number > 0) {
    result.push("");
    number--;
  }

  return result;
};

const index: React.FC<{ imageUrls: string[] }> = ({ imageUrls }) => {
  const [index, _setIndex] = useState<number>(0);
  const indexRef = useRef(0);

  const setIndex = (payload) => {
    _setIndex(payload);
    indexRef.current = payload;
  };

  const [hasReachedTheLimit, setHasReachTheLimit] = useState<boolean | string>(
    false
  );

  const sliderRef = useRef<HTMLDivElement>();
  const [tracker, setTracker] = useState<string[]>(undefined);

  //This functioin is used to update the position of the element given a new index
  const update = (newIndex: number, animate: boolean) => {
    const scrollWidth = sliderRef.current.scrollWidth;
    const targetScrollPosition = sliderRef.current.clientWidth * newIndex;
    if (targetScrollPosition >= scrollWidth) {
      if (animate)
        return setTemporaryState(setHasReachTheLimit, "RIGHT", false, 200);
      return springScroll({
        x: -targetScrollPosition + sliderRef.current.clientWidth,
      });
    }
    if (targetScrollPosition < 0) {
      if (animate) setTemporaryState(setHasReachTheLimit, "LEFT", false, 200);
      return springScroll({
        x: -targetScrollPosition - sliderRef.current.clientWidth,
      });
    }
    springScroll({ x: -targetScrollPosition });
    return setIndex(newIndex);
  };

  //Spring animation for invalid scroll
  const animateSpring = useSpring({
    transform:
      (hasReachedTheLimit == "LEFT" && "translateX(30%)") ||
      (hasReachedTheLimit == "RIGHT" && "translateX(-30%)") ||
      "translateX(0px)",
    from: {
      transform: "translateX(0px)",
    },
  });

  const [scrollAnimate, springScroll] = useSpring(() => ({
    from: { x: sliderRef?.current?.scrollLeft || 0 },
    onFrame: (props) => {
      sliderRef.current.scrollLeft = props.x;
    },
  }));

  useEffect(() => {
    const resizingUpdate = () => {
      if (!sliderRef?.current) return;
      setTracker(getNumberOfTracker(sliderRef));
    };
    resizingUpdate();
    window.addEventListener("resize", resizingUpdate);
    () => window.removeEventListener("resize", resizingUpdate);
  }, []);

  const [coordinate, _setCoordinate] = useState({ x: 0, y: 0 });
  const coordinateRef = useRef({ x: 0, y: 0, scroll: 0 });

  const setCoordinate = (payload) => {
    coordinateRef.current = payload;
    _setCoordinate(payload);
  };

  const touchStart = ({ changedTouches: _ }) => {
    console.log(_);
    setCoordinate({
      x: _[0].screenX,
      scroll: sliderRef.current.scrollLeft,
    });
  };

  const touchEnd_and_Action = ({ changedTouches: _ }) => {
    const STRENGHT = 60;

    const vtDirection = _[0].screenX - coordinateRef.current.x;
    if (vtDirection == 0) return;

    if (vtDirection >= STRENGHT) update(indexRef.current - 1, false);
    else if (vtDirection <= -STRENGHT) update(indexRef.current + 1, false);
    else update(indexRef.current, false);
  };

  const touchMove_and_Action = ({ changedTouches: _ }) => {
    const vtDirection = _[0].screenX - coordinateRef.current.x;
    springScroll({
      x: -sliderRef.current.clientWidth * indexRef.current + vtDirection,
    });
    console.log(sliderRef.current.clientWidth * indexRef.current + vtDirection);
  };
  useEffect(() => {}, []);

  return (
    <div
      className={`${styles.container} container flex center-children`}
      style={{ position: "relative" }}
      onTouchStart={touchStart}
      onTouchEnd={touchEnd_and_Action}
      onTouchMove={touchMove_and_Action}
    >
      <animated.div
        className={`${styles.slider}`}
        ref={sliderRef}
        style={{ ...scrollAnimate, ...animateSpring }}
      >
        {imageUrls.map((imageLink) => (
          <MyImage key={imageLink} imageLink={imageLink} ASPECT_RATIO={130} />
        ))}
      </animated.div>

      {imageUrls.length > 1 && (
        <>
          <button
            onClick={() => update(index + 1, true)}
            className={styles.toLeft}
          ></button>
          <button
            onClick={() => update(index - 1, true)}
            className={styles.toRight}
          ></button>
          <div className={styles.tracker}>
            {tracker &&
              tracker.map((unused, imageLinkIndex) => (
                <div
                  key={imageLinkIndex}
                  className={`${styles.circle} ${
                    index == imageLinkIndex && styles.active
                  }`}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default memo(index);
