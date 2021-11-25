import NavTop from "./NavTop";
import NavSide from "./NavSide";
// @ts-ignore
import styles from "./style.module.scss";
import NavBarContext, { useNavBarContext } from "./navBarContext";
import { memo, useState, useEffect } from "react";
import SearchBar from "./SearchBar";



const R_NavBar = () => {


  return (
    <>
      <div
        className={`${styles.navigation} max-width`}
      >
        <NavTop />
        <NavSide />
        <SearchBar />
      </div>
    </>
  );
};

const Navigation = () => {
  return (
    <NavBarContext>
      <R_NavBar />
    </NavBarContext>
  );
};

export default Navigation;
