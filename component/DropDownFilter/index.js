// @ts-ignore
import styles from "./style.module.css";
import { useState, useEffect, useRef } from "react";
import { useMyWindow } from "../../Contexts/GlobalContext";

const setProperty = (object, property, value) => {
  object.current.style.setProperty(property, value);
};

const match = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
};

function index({
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
                  onChange={() =>
                    toggleChecked(filterName, name, stateFunction)
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
              <>
                <input
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
                  key={name}
                  htmlFor={filterName + name + marker}
                  className={`${styles.colorItem} ${
                    (myState[name] && styles.checked) || ""
                  }`}
                  style={{ backgroundColor: name }}
                ></label>
              </>
            ))}
        </div>
      </div>
    </div>
  );
}

export default index;
