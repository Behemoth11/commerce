// @ts-ignore
import styles from "./style.module.css";
import ProductCard from "../ProductCard";
import Filter from "./Filter.js";
import { memo, useState, useEffect } from "react";
import { useFindContext } from "../../pages/find/FindContext";

const index = () => {
  const { toggleFilterOverlay, activeFilter, removeFilter } = useFindContext();
  const [filter, setFilter] = useState([{}]);

  const getFilter = async () => {
    let result = await activeFilter
      .reduce((accum, filter) => [...accum, ...filter.criteria], [])
      .filter((element) => element.checked === true);
    return result;
  };

  useEffect(() => {
    (async () => {
      let filter = await getFilter().catch((err) => console.error(err));
      setFilter(filter);
    })();
  }, [activeFilter]);

  return (
    <>
      <div className={styles.container}>
        <div
          className={`${styles.filterSetter} flex align-center`}
          onClick={() => toggleFilterOverlay()}
        >
          <p>Filter</p>
          <img src="/filter.svg"></img>
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
