// @ts-ignore
import styles from "./style.module.scss";
import { memo, useState } from "react";
import DropDownFilter from "../DropDownFilter";
import { animated, useTransition } from "react-spring";
import { useFilterContext } from "../../Contexts/GlobalContext";
import Input from "../Inputs/NormalInput";
import Button from "../Button";

interface Props {
  maxOpened?: 3;
  defaultOpened?: String[];
  showApplyFilter?: boolean;
  applyFilterSideEffect?: () => void;
}

const FilterContainer: React.FC<Props> = ({
  maxOpened,
  defaultOpened,
  showApplyFilter,
  applyFilterSideEffect,
}) => {
  const filters = useFilterContext();

  const [_filter, __setFilter] = useState({ ...filters.value });
  const [wasClicked, setWasClicked] = useState(false);
  const [openedFilters, setOpenedFilters] = useState(defaultOpened || []);

  const _setFilter = (arg) => {
    __setFilter(arg);
    setWasClicked(true);
  };

  //animations
  const animate_applyFilter = useTransition(wasClicked, {
    from: {
      transform: "translateY(-100%)",
      opacity: 0,
    },
    enter: { transform: "translateY(-0%)", opacity: 1 },
    leave: { transform: "translateY(-100%)", opacity: 0 },
  });

  const updateOpenedFilters = (name, isOpen) => {
    if (isOpen) {
      setOpenedFilters((prev) => {
        return [...prev.filter((e) => e != name)];
      });
    } else {
      setOpenedFilters((prev) => {
        const _prev = [...prev];
        _prev.unshift(name);
        if (_prev.length >= (maxOpened + 1 || 50)) {
          _prev.pop();
        }
        return _prev;
      });
    }
  };


  const setFilter = (showApplyFilter && _setFilter) || filters.setFilter;
  const filter = (showApplyFilter && _filter) || filters.value;

  const handlePriceRange = (index, e) => {
    setFilter((prevState) => {
      let old_range = prevState.price || ["price : ", "0", " - ", "infinity"];
      old_range = [...old_range];
      old_range[index] = e.target.value;
      return { ...prevState, ["price"]: old_range };
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterRubriqueContainer}>
        <DropDownFilter
          filterName={"color"}
          content={[
            "bleu",
            "rouge",
            "vert",
            "noire",
            "jaune",
            "marron",
            "blanc",
          ]}
          isOpen={openedFilters.includes("color")}
          toggle={updateOpenedFilters}
          filter={filter}
          stateFunction={setFilter}
          toggleChecked={filters.toggleFilter}
          mobile={showApplyFilter}
        />
        <div className={styles.priceFilter}>
          <h6>Price : </h6>
          <div>
            <input
              //@ts-ignore
              value={filter["price"] && filter.price[1]}
              placeholder="min"
              type="number"
              onChange={(e) => handlePriceRange(1, e)}
              />
            <span> : </span>
            <input
              //@ts-ignore
              value={filter.price && filter.price[3]}
              placeholder="max"
              type="number"
              onChange={(e) => handlePriceRange(3, e)}
            />
          </div>
        </div>
      </div>

      {animate_applyFilter(
        (_style, condition) =>
          condition &&
          showApplyFilter && (
            <animated.div
              className={`${styles.apply} flex center-children`}
              style={_style}
              onClick={async() => {
                applyFilterSideEffect();
                setWasClicked(false)
                filters.setFilter({..._filter, _spec : "now"});
              }}
            >
              <Button>Apply Filter</Button>
            </animated.div>
          )
      )}
    </div>
  );
};

export default memo(FilterContainer);
