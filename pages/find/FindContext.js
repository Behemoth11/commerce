import React, { useState, useContext, useEffect, useRef } from "react";

const FilterOverlayContext = React.createContext({
  toggleFilterOverlay: undefined,
  filterOverlayIsOpen: false,
  removeFilter: undefined,
  loadFiltersToContext: undefined,
  filter: [{ value: 'No filter', filterIndex: 0, criteriaIndex: 0 }],
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

const getFilter = async (activeFilter) => {
  let result = await activeFilter
    .reduce((accum, filter) => [...accum, ...filter.criteria], [])
    .filter((element) => element.checked === true);
  return result;
};

const useFirstTimeLoading = () => {

  const load = useRef(true);
  useEffect(()=> {
    load.current = false
  },[])

  return load.current;
} 


const FindProvider = ({ children }) => {
  const [filterOverlayIsOpen, setfilterOverlayIsOpen] = useState(false); //remeber to change this to true
  const [activeFilter, setActiveFilter] = useState(filters);
  const [filter, setFilter] = useState();

  const firstTimeLoading = useFirstTimeLoading();

  /******************utilities functions for the children ****************/
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



  /****************************************************************** */

  useEffect(() => {
    (async () => {
      let filter = await getFilter(activeFilter).catch((err) => console.error(err));
      // @ts-ignore
      setFilter(filter);
      console.log('The async function just ran')
    })();
  }, [activeFilter]);

  /*******************data fetching*********************/
  useEffect(() => {
    if (firstTimeLoading) return;
    console.log("I am fetching the data using the filters " + JSON.stringify(filter))
  },[filter])

  //control the page overlay
  useEffect(() => {
    const { classList } = document.getElementById("__next");
    filterOverlayIsOpen
      ? classList.add("find_overflow")
      : classList.remove("find_overflow");
  }, [filterOverlayIsOpen]);

  return (
    <FilterOverlayContext.Provider
      value={{
        filterOverlayIsOpen,
        toggleFilterOverlay,
        filter,
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
