// @ts-ignore
import styles from "./style.module.css";

import Svg from './Svg.js';
import { useNavBarState } from '../NavBarContext';
import { memo } from "react";


const index = () => {
  const {toggleNavBar} = useNavBarState()

  return (
    <nav className={`${styles.navTop} container flex`}>
      <div className="big-container flex flex-center center-children">
        <div
          className="flex-left"
          onClick={() => toggleNavBar()}
        >
          <div className={`${styles.burgerDiv}`}>
            <div className={styles.middle}></div>
          </div>
        </div>
        <div className="flex-center">MOMENT</div>
        <div className=" flex flex-right">
          <div style={{ marginTop: 10 }}>
            <Svg/>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default memo(index);
