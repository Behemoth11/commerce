// @ts-ignore
import styles from "./style.module.css";
import { useState, useEffect, memo } from "react";
import Navigation from "./Navigation";
import { useNavBarState } from "../NavBarContext";
import { useTransition, animated } from "react-spring";

//Make sure everythin matches the routes
const sideBarSections = {
  categories: {
    title: "Menu",
    content: ["Women", "Men", "Kids", "Utilities"],
    Women: {
      title: "Women",
      content: ["Love", "Bags", "watches", "jewelries"]
    },
    Men: {
      title: "Men",
      content: ["Suit", "Pant", "Short", "Cap"],
    },
    Kids: {
      title: "Kids",
      content: ["Short", "Underwear", "children", "leverages"],
    },
    Utilities: {
      title: "Utilities",
      content: ["Pot", "Plates", "Ustensils"],
      Ustensils: {
        title: "Ustensils",
        content: ["Spoons", "Fork", "Knifes"],
      },
    },
  },
};

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
    navContentTodDisplay[location[0]] || navContentTodDisplay["categories"];

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
  const { sideBarIsOpen, toggleNavBar } = useNavBarState();
  const [sideBarLocation, setSideBarLocation] = useState(["categories"]);
  const [positionIndex, setPositionIndex] = useState(0);

  const updateSideBar = (update, index) => {
    setSideBarLocation((prevState) => {
      let temp = [...prevState];
      temp[index + 1] = update;
      return temp;
    });
    setPositionIndex((prevState) => prevState + 1);
  };

  const regressSideBar = () => {
    setPositionIndex((prevState) => {
      return prevState >= 1 ? prevState - 1 : 0;
    });
  };

  const sideBarPages = getHeaders(sideBarSections, sideBarLocation);

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
            mainMenu={page.title === "Menu"}
            sideBarLocation={sideBarLocation}
            visible={positionIndex >= page.index}
            headers={page.content || [END_POINT]}
          />
        ))}
      </div>
    </>
  );
};

export default memo(index);
