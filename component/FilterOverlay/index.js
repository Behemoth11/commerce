// @ts-ignore
import styles from "./style.module.css";
import { memo, useEffect, useState } from "react";
import { useFindContext } from "../../Contexts/FindContext";
import { useFirstTimeLoading } from "../../shared/CustomHooks";
import { useGlobalContext } from "../../Contexts/GlobalContext";
import { useTransition, animated } from "react-spring";
import DropDownFilter from "../DropDownFilter";
import FilterContainer from "../FilterContainer";


const FilterOverlay = () => {
  const { filterOverlayIsOpen, toggleFilterOverlay } = useFindContext();

  //animations
  const animate = useTransition(filterOverlayIsOpen, {
    from: {
      transform: "translateX(100%)",
    },
    enter: { transform: "translatex(0%)" },
    leave: { transform: "translateX(100%)" },
  });
  

  return animate(
    (_style, filterOverlayIsOpen) =>
      filterOverlayIsOpen && (
        <animated.div className={styles.filterContainer} style={_style}>
          
          <div className={`${styles.header} flex align-center`}>
            <div
              className={styles.crossContainer}
              onClick={() => {
                toggleFilterOverlay();
              }}
            >
              <div className={`${styles.cross} no-shrink`}></div>
            </div>
          </div>

          <FilterContainer showApplyFilter={true} applyFilterSideEffect={toggleFilterOverlay} defaultOpened={["color", "location"]} maxOpened={2}/>
        </animated.div>
      )
  );
};

export default memo(FilterOverlay);
