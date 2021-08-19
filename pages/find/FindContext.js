import React, { useState, useContext, useEffect } from "react";

const FilterOverlayContext = React.createContext({
  toggleFilterOverlay: undefined,
  filterOverlayIsOpen: false,
  removeFilter: undefined,
  addFilter: undefined,
  activeFilter: [""],

});

const FindProvider = ({ children }) => {
  const [filterOverlayIsOpen, setfilterOverlayIsOpen] = useState(false); //remeber to change this to true
  const [activeFilter, setActiveFilter] = useState([""]);

  useEffect(() => {
    const page = document.getElementById("__next");
    page.style.overflow = (filterOverlayIsOpen && "hidden") || "auto";
  }, [filterOverlayIsOpen]);

  const toggleFilterOverlay = () => {
    setfilterOverlayIsOpen((prevState) => !prevState);
  };

  const removeFilter = (index) => {
    setActiveFilter((prevState) => {
      return [...prevState.slice(0, index), ...prevState.slice(index + 1)];
    });
  };

  const addFilter = (payload) => {
    setActiveFilter((prevState) => {
      return [...prevState, payload];
    });
  };

  return (
    <FilterOverlayContext.Provider
      value={{ filterOverlayIsOpen, toggleFilterOverlay, activeFilter, removeFilter, addFilter }}
    >
      {children}
    </FilterOverlayContext.Provider>
  );
};

export const useFindContext = () => {
  return useContext(FilterOverlayContext);
};

export default FindProvider;
