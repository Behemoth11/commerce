import React, { useState, useContext, useEffect } from "react";

const FilterOverlayContext = React.createContext({
  toggleFilterOverlay: undefined,
  filterOverlayIsOpen: false,
  removeFilter: undefined,
  loadFiltersToContext: undefined,
  activeFilter: [
    {
      name: "",
      criteria: [
        { value: "", checked: false, filterIndex: 0, criteriaIndex: 0 },
      ],
    },
  ],
});

const rawFilters = [
  {
    name: "Color",
    criteria: [
      { value: "yellow", checked: false },
      { value: "purple", checked: false },
      { value: "marrong", checked: false },
    ],
  },
  {
    name: "Size",
    criteria: [
      { value: "Large", checked: false },
      { value: "Small", checked: false },
      {value: "Medium", checked: false },
    ],
  },
  {
    name: "Diversity",
    criteria: [
      { value: "Rare", checked: false },
      { value: "Very Rare", checked: false },
      { value: "Not so Rare", checked: false },
    ],
  },
];

const filters = rawFilters.map(({ name, criteria }, filterIndex) => {
  console.log("The heavy calculation is running again");
  criteria = criteria.map((element, criteriaIndex) => ({
    ...element,
    filterIndex,
    criteriaIndex,
  }));
  return { name, criteria };
});

console.log(filters);

const FindProvider = ({ children }) => {
  const [filterOverlayIsOpen, setfilterOverlayIsOpen] = useState(false); //remeber to change this to true
  const [activeFilter, setActiveFilter] = useState(filters);

  useEffect(() => {
    const { classList } = document.getElementById("__next");
    filterOverlayIsOpen
      ? classList.add("find_overflow")
      : classList.remove("find_overflow");
    console.log(
      (filterOverlayIsOpen && "disallowed the page to overflow") ||
        "It's fine you can overflow"
    );
  }, [filterOverlayIsOpen]);

  useEffect(() => {
    console.log(activeFilter)
  }, [activeFilter])

  const toggleFilterOverlay = () => {
    setfilterOverlayIsOpen((prevState) => !prevState);
  };

  const removeFilter = (filterIndex, criteriaIndex) => {
    setActiveFilter((prevState) => {
      const prevStatecopy = JSON.parse(JSON.stringify(prevState));
      prevStatecopy[filterIndex].criteria[criteriaIndex].checked =
        !prevStatecopy[filterIndex].criteria[criteriaIndex].checked;
      return prevStatecopy;
    });
  };

  const loadFiltersToContext = (payload) => {
    setActiveFilter(payload);
  };

  return (
    <FilterOverlayContext.Provider
      value={{
        filterOverlayIsOpen,
        toggleFilterOverlay,
        activeFilter,
        removeFilter,
        loadFiltersToContext,
      }}
    >
      {children}
    </FilterOverlayContext.Provider>
  );
};

export const useFindContext = () => {
  return useContext(FilterOverlayContext);
};

export default FindProvider;
