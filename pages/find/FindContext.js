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

const filters = [
  {
    name: "Color",
    criteria: [
      { value: "yellow", checked: false,  filterIndex: 0, criteriaIndex: 0 },
      { value: "purple", checked: false,  filterIndex: 0, criteriaIndex: 1 },
      { value: "marrong", checked: false, filterIndex: 0, criteriaIndex: 2 },
    ],
  },
  {
    name: "Size",
    criteria: [
      { value: "Large", checked: false, filterIndex: 1, criteriaIndex: 0 },
      { value: "Small", checked: false, filterIndex: 1, criteriaIndex: 1 },
      {value: "Medium", checked: false, filterIndex: 1, criteriaIndex: 2 },
    ],
  },
  {
    name: "Diversity",
    criteria: [
      { value: "Rare", checked: false, filterIndex: 2, criteriaIndex: 0 },
      { value: "Very Rare", checked: false, filterIndex: 2, criteriaIndex: 1 },
      { value: "Not so Rare", checked: false , filterIndex: 2, criteriaIndex: 2},
    ],
  },
];

// const filters = rawFilters.map(({ name, criteria }, filterIndex) => {
//   console.log("The heavy calculation is running again");
//   criteria = criteria.map((element, criteriaIndex) => ({
//     ...element,
//     filterIndex,
//     criteriaIndex,
//   }));
//   return { name, criteria };
// });


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
