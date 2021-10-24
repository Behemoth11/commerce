// @ts-ignore
import styles from "./style.module.css";
import { useState, useEffect, memo, useMemo } from "react";
import Navigation from "./Navigation";

import { navBarSections } from "../navBarSections";
import { useNavBarContext } from "../navBarContext";


const END_POINT = "END_POINT";

const formatLocation = (object, index) => {
  const content = object.content.map((element) => {
    return {
      label: element,
      hasDescendant: object[element] ? true : false,
    };
  });
  return { title: object.title, content, index };
};

const getHeaders = (navContentTodDisplay, _location) => {
  const location = _location;

  let result =
    navContentTodDisplay[location[0]] || navContentTodDisplay["menu"];

  let side_pages = [formatLocation(result, 0)];

  for (let i = 1; i < location.length; i++) {
    let _result = result[location[i]];
    if (_result) {
      result = _result;
      side_pages.push(formatLocation(result, i));
    } else break;
  }
  return side_pages;
};

const index = () => {
  const [positionIndex, setPositionIndex] = useState(0);
  const { sideBarIsOpen, toggleNavBar } = useNavBarContext();
  const [sideBarLocation, setSideBarLocation] = useState(["menu"]);

  const updateSideBar = (update, index) => {
    setSideBarLocation((prevState) => {
      let temp = [...prevState];
      temp[index + 1] = update;
      return temp;
    });
    setPositionIndex((prevState) => prevState + 1);
  };

  const progressiveComeBack = (index,prevIndex?: number) => {
    var newIndex;


    setPositionIndex((prevState) => {
      if (prevState < 1 || prevIndex != undefined && prevState != prevIndex) return prevState;
      newIndex = prevState-1;
      return prevState - 1;
    });

    if (newIndex && newIndex > index ) {
      setTimeout(() => progressiveComeBack(index, newIndex), 500);
    }
  };

  const regressSideBar = () => {
    setPositionIndex((prevState) => {
      if (prevState < 1) return prevState;
      return prevState - 1;
    });
  };

  const sideBarPages = useMemo(
    () => getHeaders(navBarSections, sideBarLocation),
    [sideBarLocation]
  );

  return (
    <>
      <div
        className={`${styles.overlay} ${sideBarIsOpen && styles.open}`}
        onClick={() => toggleNavBar()}
      ></div>

      <div
        className={`flex
        ${styles.sideBar}
        ${sideBarIsOpen && styles.open}`}
      >
        {sideBarPages.map((page) => (
          <Navigation
            key={page.title}
            index={page.index}
            title={page.title}
            regression={regressSideBar}
            updateSideBar={updateSideBar}
            mainmenu={page.title === "menu"}
            sideBarLocation={sideBarLocation}
            visible={positionIndex >= page.index}
            headers={page.content || [END_POINT]}
            progressiveComeBack={progressiveComeBack}
          />
        ))}
      </div>
    </>
  );
};

export default memo(index);
