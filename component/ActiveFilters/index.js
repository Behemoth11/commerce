// @ts-ignore
import styles from "./style.module.css";
import ProductCard from "../ProductCard";
import Filter from "./Filter.js";
import { memo } from "react";
import {useFindContext} from '../../pages/find/FindContext';

const index = () => {
  const { toggleFilterOverlay, activeFilter, removeFilter } = useFindContext();

  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.filterSetter} flex align-center`} onClick={() => toggleFilterOverlay() } >
          <p>Filter</p>
          <img src='/filter.svg'></img>
        </div>
        <div className={styles.filterContainer}>
          {/* <Filter content="Fast" />
          <Filter content="Blue" />
          <Filter content="Movable" />
          <Filter content="Larmange" />
          <Filter content="Faisable" />
          <Filter content="Big Size" />
          <Filter content="Affordable" /> */}
        </div>
      </div>
    </>
  );
};

export default memo(index);
