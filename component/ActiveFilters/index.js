// @ts-ignore
import styles from "./style.module.css";
import Filter from "./Filter.js";
import { memo, useState, useEffect } from "react";
import { useFindContext } from "../../Contexts/FindContext";
import { useFilterContext } from "../../Contexts/GlobalContext";

const ActiveFilters = ({ displayType, setDisplayType }) => {
  const { toggleFilterOverlay } = useFindContext();
  const filters = useFilterContext();

  const filterNames = filters.value && Object.keys(filters.value);
  return (
    <>
      <div className={`${styles.container}`}>
        <div className={`${styles.filterHeader} `}>
          <div
            className={`${styles.filterSetter} flex align-center sm`}
            onClick={() => toggleFilterOverlay()}
          >
            <p>Filter</p>
            <img src="/svg/filter.svg" alt="More Information"></img>
          </div>
          <div className={`${styles.filterSetter} flex align-center big`}>
            <p>Filter</p>
            <img src="/svg/filter.svg" alt="More Information"></img>
          </div>

          <div
            className={`${styles.displayType} `}
            onClick={() =>
              setDisplayType(
                (prevState) => (prevState == "single" && "double") || "single"
              )
            }
          >
            {/* {(displayType == "single" && <span>double</span>) || <span>single</span>} */}
            {(displayType == "single" && (
              <img src="/svg/grid.svg" alt="single-grid-display" />
            )) || <img src="/svg/square.svg" alt="double-grid-display" />}
          </div>
        </div>

        <div className={styles.filterContainer}>
          {filterNames.map(
            (filterName) =>
              (filterName == "price" && (
                <Filter
                  content={filters.value[filterName]}
                  key={filterName}
                  action={() => filters.toggleFilter(filterName, name)}
                />
              )) ||
              Object.keys(filters.value[filterName]).map((name) => (
                <Filter
                  content={name}
                  key={filterName + name}
                  action={() => filters.toggleFilter(filterName, name)}
                />
              ))
          )}
          {filterNames.length == 0 && (
            <>
              <div className="sm">
                <Filter
                  content={"No Filter"}
                  action={() => toggleFilterOverlay()}
                />
              </div>
              <div className="big">
                <Filter
                  content={"No Filter"}
                  action={() => 2}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(ActiveFilters);
