// @ts-ignore
import styles from "./style.module.css";
import Filter from "./Filter.js";
import { memo, useState, useEffect } from "react";
import { useFindContext } from "../../Contexts/FindContext";

const index = ({ displayType ,setDisplayType }) => {
  const { toggleFilterOverlay, filter, removeFilter } = useFindContext();

  return (
    <>
      <div className={`${styles.container}`}>
        <div className={`${styles.filterHeader} `}>
          <div
            className={`${styles.filterSetter} flex align-center`}
            onClick={() => toggleFilterOverlay()}
          >
            <p>Filter</p>
            <img src="/svg/filter.svg"></img>
          </div>
          <div
            className={`${styles.displayType} `}
            onClick={() =>
              setDisplayType(
                (prevState) => (prevState == "single" && "double") || 'single'
              )
            }
          >
           {/* {(displayType == "single" && <span>double</span>) || <span>single</span>} */}
           {(displayType == "single" && <img src="/svg/grid.svg"/>) || <img src="/svg/square.svg"/>}
          </div>
        </div>

        <div className={styles.filterContainer}>
          {(filter?.length >= 1 &&
            filter
              .map(({ value, filterIndex, criteriaIndex }) => (
                <Filter
                  key={value}
                  content={value}
                  action={() => removeFilter(filterIndex, criteriaIndex)}
                />
              ))) || (
            <Filter content={"NO Filter"} action={() => toggleFilterOverlay()} />
          )}
        </div>
      </div>
    </>
  );
};

export default memo(index);
