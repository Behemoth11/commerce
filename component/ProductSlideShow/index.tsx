// @ts-ignore
import styles from "./style.module.scss";
import MyImage from "../MyImage";
import { useSpring, animated } from "react-spring";
import React, { memo, useState, useRef, useEffect } from "react";
import { useIntersectionObserver } from "../../shared/CustomHooks";
import { useMyWindow } from "../../Contexts/GlobalContext";

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
  element: React.MutableRefObject<HTMLDivElement>,
  dummyChild: React.MutableRefObject<HTMLDivElement>
) => string[] = (element, dummyChild) => {
  const result = [];
  let number = Math.ceil(
    (element.current.scrollWidth - dummyChild.current.scrollWidth) /
      element.current.clientWidth
  );

  while (number > 0) {
    result.push("");
    number--;
  }

  return result;
};

const index: React.FC<{ imageUrls: string[] }> = ({ imageUrls }) => {
  const [tracker, setTracker] = useState<string[]>(undefined);
  const [index, _setIndex] = useState<number>(0);
  const myWindow = useMyWindow();
  const indexRef = useRef(0);

  const setIndex = (payload) => {
    if (!tracker) return;
    if (payload >= tracker.length) return;
    if (payload < 0) return;
    _setIndex(payload);
    indexRef.current = payload;
  };

  const [visibilityIndex, observer, observerRef] =
    useIntersectionObserver("0px");
  const [hasReachedTheLimit, setHasReachTheLimit] = useState<boolean | string>(
    false
  );

  const childrenImgRef = useRef<HTMLDivElement>();
  const sliderRef = useRef<HTMLDivElement>();

  //This functioin is used to update the position of the element given a new index
  const update = (newIndex: number, animate: boolean) => {
    var index = newIndex;

    const childrenWidth = childrenImgRef.current.clientWidth;
    const vsbl_S_W = sliderRef.current.clientWidth;

    const S_W = sliderRef.current.scrollWidth - vsbl_S_W - childrenWidth;
    var targetScrollPosition = vsbl_S_W * newIndex;

    if (targetScrollPosition < 0) {
      if (animate) setTemporaryState(setHasReachTheLimit, "LEFT", false, 200);
      targetScrollPosition = 0;
    }
    if (targetScrollPosition > S_W) {
      if (animate) setTemporaryState(setHasReachTheLimit, "RIGHT", false, 200);
      targetScrollPosition = S_W;
    }

    springScroll({ x: -targetScrollPosition });
    return setIndex(index);
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

  /*****************useEffect statement **********************/

  useEffect(() => {
    if (!sliderRef?.current) return;
    setTracker(getNumberOfTracker(sliderRef, childrenImgRef));
  }, [myWindow.size, imageUrls]);

  useEffect(() => {
    update(0, false);
  }, [imageUrls]);

  const [coordinate, _setCoordinate] = useState({ x: 0, y: 0 });
  const coordinateRef = useRef({ x: 0, y: 0, scroll: 0 });

  const setCoordinate = (payload) => {
    coordinateRef.current = payload;
    _setCoordinate(payload);
  };

  const touchStart = ({ changedTouches: _ }) => {
    setCoordinate({
      x: _[0].screenX,
      scroll: sliderRef.current.scrollLeft,
    });
  };

  const touchEnd_and_Action = ({ changedTouches: _ }) => {
    const STRENGHT = 45;

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
  };

  return (
    <div
      className={`${styles.container} container flex flex-center center-children`}
      style={{ position: "relative" }}
      onTouchStart={touchStart}
      onTouchEnd={touchEnd_and_Action}
      onTouchMove={touchMove_and_Action}
      ref={observerRef}
    >
      <animated.div
        ref={sliderRef}
        className={`${styles.slider}`}
        style={{ ...scrollAnimate, ...animateSpring }}
      >
        {imageUrls?.map((imageLink, index) => (
          <MyImage
            key={imageLink || index}
            ASPECT_RATIO={120}
            observer={observer}
            imageLink={imageLink}
            isVisible={index < visibilityIndex + 2}
            loadingState={true}
          />
        )) || (
          <MyImage
            ASPECT_RATIO={120}
            isVisible={index < visibilityIndex + 2}
            loadingState={true}
          />
        )}
        <div ref={childrenImgRef}></div>
      </animated.div>
      {imageUrls?.length > 1 && (
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
