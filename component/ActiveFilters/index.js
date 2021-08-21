// @ts-ignore
import styles from "./style.module.css";
import ProductCard from "../ProductCard";
import Filter from "./Filter.js";
import { memo, useState, useEffect } from "react";
import { useFindContext } from "../../pages/find/FindContext";

const index = ({ displayType ,setDisplayType }) => {
  const { toggleFilterOverlay, filter, removeFilter } = useFindContext();

  return (
    <>
      <div className={`${styles.container}`}>
        <div className={`${styles.filterHeader}`}>
          <div
            className={`${styles.filterSetter}  flex align-center`}
            onClick={() => toggleFilterOverlay()}
          >
            <p>Filter</p>
            <img src="/filter.svg"></img>
          </div>
          <div
            onClick={() =>
              setDisplayType(
                (prevState) => (prevState == "single" && "double") || 'single'
              )
            }
          >
           {(displayType == "single" && "double") || 'single'}
          </div>
        </div>

        <div className={styles.filterContainer}>
          {(filter &&
            filter
              // @ts-ignore
              .map(({ value, filterIndex, criteriaIndex }) => (
                <Filter
                  key={value}
                  content={value}
                  action={() => removeFilter(filterIndex, criteriaIndex)}
                />
              ))) || (
            <Filter content={"loading"} action={() => toggleFilterOverlay()} />
          )}
        </div>
      </div>
    </>
  );
};

export default memo(index);
