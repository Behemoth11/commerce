// @ts-ignore
import styles from "./style.module.css";
import { memo, useEffect, useState } from "react";
import { useFindContext } from "../../Contexts/FindContext";
import { useFirstTimeLoading } from "../../shared/CustomHooks";
import { useGlobalContext } from "../../Contexts/GlobalContext";
import { useTransition, animated, config } from "react-spring";
import DropDownFilter from "../DropDownFilter";
import FilterContainer from "../FilterContainer";

const FilterOverlay = () => {
  const { filterOverlayIsOpen, toggleFilterOverlay } = useFindContext();

  return (
    <div className={`${styles.filterContainer} ${filterOverlayIsOpen && styles.open}`}>
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

      <FilterContainer
        key="42"
        showApplyFilter={true}
        applyFilterSideEffect={toggleFilterOverlay}
        defaultOpened={["color", "location"]}
        maxOpened={2}
      />
    </div>
  );
};

export default memo(FilterOverlay);
