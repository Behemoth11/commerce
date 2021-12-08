// @ts-ignore
import styles from "./style.module.scss";
import { useState, useEffect, useRef } from "react";
import { useMyWindow } from "../../Contexts/GlobalContext";

const setProperty = (object, property, value) => {
  object.current.style.setProperty(property, value);
};

const match = {

  noire: "#000000",
  bleu: "#0000FF",
  blanc: "#FFFFFF",
  jaune: "#FFFF00",
  rouge: "#FF0000",
  vert: "#00FF00",
  violet: "#FF00FF",
  gris: "#C0C0C0",
  marron: "#800000"
};

function DropDownFilter({
  filterName,
  content,
  filter,
  isOpen,
  toggle,
  toggleChecked,
  stateFunction,
  mobile,
}) {
  const containerRef = useRef();
  const subContainerRef = useRef();
  const myWindow = useMyWindow();
  const size = myWindow.size;

  useEffect(() => {
    setProperty(
      containerRef,
      "--full-height",
      // @ts-ignore
      `${subContainerRef.current.clientHeight}px`
    );
  }, [size]);

  const myState = filter[filterName] || {};

  const marker = (mobile && "m") || "d";

  return (
    <div
      tabIndex={0}
      ref={containerRef}
      className={`${styles.dropdownContainer} ${isOpen && styles.open} ${
        mobile && styles.mobile
      }`}
    >
      <div ref={subContainerRef} className={`${styles.subContainer}`}>
        <div
          className={`${styles.label} flex align-center`}
          onClick={() => toggle(filterName, isOpen)}
        >
          <span>{filterName} </span>
          <div className={`${styles.arrow} ${isOpen && styles.open}`}></div>
        </div>

        <div className={`${styles.contentContainer} ${styles[filterName]}`}>
          {(filterName != "color" &&
            content.map((name) => (
              <div
                key={name + marker}
                className={`${styles.content} flex align-center`}
              >
                <input
                  type="checkbox"
                  id={filterName + name + marker}
                  name={name}
                  value={name}
                  checked={(myState && myState[name]) || false}
                  onChange={(e) =>{
                    toggleChecked(filterName, name, stateFunction)}
                  }
                />
                <label
                  htmlFor={filterName + name + marker}
                  className={styles.radio}
                >
                  <span></span>
                  {name}
                </label>
              </div>
            ))) ||
            content.map((name) => (
              <div className={styles.c_wrp}>
                <input
                key={name+marker}
                  type="checkbox"
                  id={filterName + name + marker}
                  name={name}
                  value={name}
                  className={styles.colorInput}
                  checked={myState[name] || false}
                  onChange={() =>
                    toggleChecked(filterName, name, stateFunction)
                  }
                />
                <label
                key={name+marker}
                  // key={name}
                  htmlFor={filterName + name + marker}
                  className={`${styles.colorItem} ${
                    (myState[name] && styles.checked) || ""
                  }`}
                  style={{ backgroundColor: match[name] }}
                ></label>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default DropDownFilter;
