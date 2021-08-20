// @ts-ignore
import styles from "./style.module.css";
import { useState, useEffect, useRef } from "react";

const setProperty = (object, property, value) => {
  object.current.style.setProperty(property, value);
};

function index({ name, criteria }) {
  const containerRef = useRef();
  const subContainerRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const newCriteria = [...criteria];
  const [checkbox, setCheckBox] = useState(newCriteria);

  useEffect(() => {
    setProperty(
      containerRef,
      "--full-height",
      // @ts-ignore
      `${subContainerRef.current.offsetHeight}px`
    );
  }, []);

  const handleCheckBoxChange = (criteriaIndex) => {
    setCheckBox((prevState) => {
      let checkboxList = prevState.slice();
      console.log(prevState)
      checkboxList[criteriaIndex].checked = !checkboxList[criteriaIndex].checked;
      return checkboxList;
    });
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.dropdownContainer} ${isOpen && styles.open}`}
    >
      <div ref={subContainerRef} className={`${styles.subContainer}`}>
        <div
          className={`${styles.label} flex align-center`}
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          <span>{name} </span>
          <div className={`${styles.arrow} ${isOpen && styles.open}`}></div>
        </div>

        {checkbox.map(({ value, checked, criteriaIndex }) => (
          <div key={value} className={`${styles.criteria} flex align-center`}>
            <input
              type="checkbox"
              id={`${name}-${value}`}
              name={`${name}-${value}`}
              value={value}
              checked={checked}
              onChange={() => handleCheckBoxChange(criteriaIndex)}
            />
            <label htmlFor={`${name}-${value}`}>{value}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default index;
