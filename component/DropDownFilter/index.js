// @ts-ignore
import styles from "./style.module.css";
import { useState, useEffect, useRef } from "react";

const setProperty = (object, property, value) => {
  object.current.style.setProperty(property, value);
};

function index({ name, criteria,updateFilter }) {
  const containerRef = useRef();
  const subContainerRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setProperty(
      containerRef,
      "--full-height",
      // @ts-ignore
      `${subContainerRef.current.offsetHeight}px`
    );
  }, []);

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

        {criteria.map(({ value, checked, filterIndex, criteriaIndex }) => (
          <div key={value} className={`${styles.criteria} flex align-center`}>
            <input
              type="checkbox"
              id={`${name}-${value}`}
              name={`${name}-${value}`}
              value={value}
              checked={checked}
              onChange={() => updateFilter(filterIndex,criteriaIndex)}
            />
            <label htmlFor={`${name}-${value}`}>{value}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default index;
