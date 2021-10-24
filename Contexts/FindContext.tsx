import React, { useState, useContext, useEffect, useRef } from "react";
import { useFirstTimeLoading } from "../shared/CustomHooks";
import {useGlobalContext} from "./GlobalContext"

export const FilterOverlayContext = React.createContext({
  toggleFilterOverlay: undefined,
  filterOverlayIsOpen: false,

});


const FindProvider = ({ children }) => {
  const [filterOverlayIsOpen, setfilterOverlayIsOpen] = useState(false); 
  const firstTimeLoading = useFirstTimeLoading();
  
  const toggleFilterOverlay = () => {
    setfilterOverlayIsOpen((prevState) => !prevState);
  };

  //control the page overflow
  useEffect(() => {
    if (firstTimeLoading) return;
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
      }}
    >
      {children}
    </FilterOverlayContext.Provider>
  );
};

export default FindProvider;

export const useFindContext = () => {
  return useContext(FilterOverlayContext);
};
