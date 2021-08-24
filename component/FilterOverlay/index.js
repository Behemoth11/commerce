// @ts-ignore
import styles from "./style.module.css";
import { memo, useEffect, useState } from "react";
import { useFindContext } from "../../Contexts/FindContext";
import { useTransition, animated } from "react-spring";
import DropDownFilter from "../DropDownFilter";

const index = () => {
  const {
    loadFiltersToContext,
    filterOverlayIsOpen,
    toggleFilterOverlay,
    activeFilter
  } = useFindContext();

  const animate = useTransition(filterOverlayIsOpen, {
    from: {
      transform: "translateX(100%)",
    },
    enter: { transform: "translatex(0%)" },
    leave: { transform: "translateX(100%)" },
  });

  const [Filters, setFilter] = useState(activeFilter);

  useEffect(() => {
    setFilter(activeFilter);
  }, [activeFilter]);

  const updateFilter = (filterIndex, criteriaIndex) => {
    setFilter((prevState) => {
      const prevFilterCopy = JSON.parse(JSON.stringify(prevState));

      prevFilterCopy[filterIndex].criteria[criteriaIndex].checked =
        !prevFilterCopy[filterIndex].criteria[criteriaIndex].checked;
      return prevFilterCopy;
    });
  };

  const filter_loadToContext = () => loadFiltersToContext(Filters);

  return animate(
    (_style, filterOverlayIsOpen) =>
      filterOverlayIsOpen && (
        <animated.div className={styles.filterContainer} style={_style}>
          <div className={`${styles.header}`}>
            <div
              className={styles.crossContainer}
              onClick={() => {
                toggleFilterOverlay();
                filter_loadToContext();
              }}
            >
              <div className={`${styles.cross} no-shrink`}></div>
            </div>
          </div>

          <div className={styles.filterRubriqueContainer}>
            {Filters.map(({ name, criteria }) => (
              <DropDownFilter
                key={name}
                name={name}
                criteria={criteria}
                updateFilter={updateFilter}
              />
            ))}
          </div>
        </animated.div>
      )
  );
};

export default memo(index);
