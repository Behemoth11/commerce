// @ts-ignore
import styles from "./style.module.css";
import { memo, useEffect } from "react";
import { useFindContext } from "../../pages/find/FindContext";
import { useTransition, animated } from "react-spring";

const index = () => {
  const {
    filterOverlayIsOpen,
    toggleFilterOverlay,
    activeFilter,
    removeFilter,
    addFilter,
  } = useFindContext();
  const animate = useTransition(filterOverlayIsOpen, {
    from: {
      transform: "translateX(100%)",
    },
    enter: { transform: "translatex(0%)" },
    leave: { transform: "translateX(100%)" },
    config: { duration: 200 },
  });
  return animate(
    (_style, filterOverlayIsOpen) =>
      filterOverlayIsOpen && (
        <animated.div className={styles.filterContainer} style={_style}>
          <div className={`${styles.header}`}>
            <div
              className={styles.crossContainer}
              onClick={() => toggleFilterOverlay()}
            >
              <div className={`${styles.cross} no-shrink`}></div>
            </div>
          </div>

          <div>This is another div</div>
          <div>This is another div</div>
          <div>This is another div</div>
          <div>This is another div</div>
          <div>This is another div</div>
          <div>This is another div</div>
          <div>This is another div</div>
          <div>This is another div</div>
          <div>This is another div</div>
        </animated.div>
      )
  );
};

export default memo(index);
