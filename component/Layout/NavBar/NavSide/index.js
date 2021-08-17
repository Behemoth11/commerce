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
      content: ["Skirt", "ssss", "Kids", "Panties"],
    },
    Men: {
      title: "Men",
      content: ["Suit", "Glass", "computer"],
    },
    Kids: {
      title: "Kids",
      content: ["a bag", "books", "children", "leverages"],
    },
    Utilities: {
      title: "Pot",
      content: ["big", "large", "small"],
      big: {
        title: "big",
        content: ["marchall", "book", "last"],
        marchall: {
          title: "marchall",
          content: ["companies"],
        },
      },
    },
  },
};

const END_POINT = "END_POINT";

const filterLocation = (object, index) => {
  const content = object.content.map((element) => {
    return {
      label: element,
      hasDescendant: object[element] ? true : false,
    };
  });

  return { title: object.title, content, index };
};

const getHeaders = (navStructure, _location) => {
  const location = _location;

  let result = navStructure[location[0]] || navStructure["categories"];

  let side_pages = [filterLocation(result, 0)];

  for (let i = 1; i < location.length; i++) {
    let _result = result[location[i]];
    if (_result) {
      result = _result;
      side_pages.push(filterLocation(result, i));
    } else break;
  }

  const test = result.content.map((element) => {
    return { label: element, hasDescendant: result[element] ? true : false };
  });

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

  // console.log(sideBarPages);
  useEffect(() => {
    // console.log(sideBarLocation);
  }, [sideBarLocation, positionIndex]);

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
            // @ts-ignore
            title={page.title}
            key={page.title}
            visible={positionIndex >= page.index}
            index={page.index}
            mainMenu={page.title === "Menu"}
            updateSideBar={updateSideBar}
            regression={regressSideBar}
            // @ts-ignore
            headers={page.content || [END_POINT]}
            sideBarLocation={sideBarLocation}
          />
        ))}
      </div>
    </>
  );
};

export default memo(index);
