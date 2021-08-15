// @ts-ignore
import styles from "./style.module.css";
import { useState, useEffect } from "react";
import Navigation from "./Navigation";
import { useNavBarState } from "../NavBarContext";

//Make sure everythin matches the routes
const sideBarSections = {
  categories: {
    title: 'Menu',
    content: ["Women", "Men", "kids"],
    Women: {
      title: 'Women',
      content: ["Skirt", "Ass", "Kid", "Panties"],
    },
    // Men: {
    //   title: 'Men'
    // },
    // Kids: {
    //   title: 'Kids'
    // },
  },
};

const END_POINT = 'END_POINT'

const getHeaders = (navStructure, _location) => {
  const location = _location.split("/");
  console.log(location, navStructure);

  let result = navStructure[location[0]] || navStructure["categories"];
    console.log('the result is ',result)
  for (let i = 1; i < location.length ; i++) {
    let _result = result[location[i]];
    if (_result){
     result=_result
    } else{
      break
    }
  }

  const test = result.content.map((element)=>{
    console.log(element, result)
    return {label: element, hasDescendant: result[element]? true: false}
  })
  console.log(test)
  return {title: result.title, content: test } || {title: "End", content:["End Point Here"]};
};

const index = () => {
  const { sideBarIsOpen, toggleNavBar } = useNavBarState();
  const [sideBarLocation, setSideBarLocation] = useState("categories");

  const updateSideBar = (update) => {
    setSideBarLocation((prevState) => `${prevState}/${update}`);
  };
  const regressSideBar = () => {
    setSideBarLocation((prevState) => {
      return prevState.split("/").slice(0, -1).join("/");
    });
  };

  const sideBar = getHeaders(sideBarSections, sideBarLocation);

  useEffect(() => {
    console.log(sideBarLocation)
  },[sideBarLocation])
  return (
    <>
      <div
        className={`${styles.overlay} ${sideBarIsOpen && styles.open}`}
        onClick={() => toggleNavBar()}
      ></div>

      <div
        className={` 
        ${styles.sideBar}
        ${sideBarIsOpen && styles.open}`}
      >
        <Navigation
          // @ts-ignore
          title={sideBar.title}
          mainMenu={sideBar.title==="Menu"}
          updateSideBar={updateSideBar}
          regression = {regressSideBar}
          // @ts-ignore
          headers={sideBar.content || [END_POINT]}
          sideBarLocation={sideBarLocation}
          />
      </div>
    </>
  );
};

export default index;
