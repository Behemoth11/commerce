// @ts-ignore
import styles from "./style.module.css";
import { useGlobalContext } from "../../Contexts/GlobalContext";
import { memo, useEffect, useState } from "react";
import { useSpring } from "react-spring";

const Options = ({children, name}) => {
  const {myWindow} = useGlobalContext()

  // console.log(myWindow.isFocused )
  const isOpen = myWindow.isFocused ==name;

  const handleClick  = (e) => {
    e.stopPropagation()
    myWindow.setFocusOn(name)
  }
  
  return (
    <div
      className={styles.container}
      
    >
      <div className={`${styles.wrapper} ${isOpen && styles.open}`} onClick={handleClick }>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={`${styles.optionsContainer} ${isOpen && styles.open}`}>
        <label> Options</label>
        {children}
      </div>
    </div>
  );
};

export default Options;
