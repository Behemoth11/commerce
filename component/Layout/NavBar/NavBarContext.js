import React, { useState, useContext, useEffect } from "react";

const SideBarContext = React.createContext({
  sideBarIsOpen: false,
  toggleNavBar: undefined,
});

const NavBarProvider = ({ children }) => {
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false); //remeber to change this to true

  useEffect(() => {
    const page = document.getElementById("__next");
    page.style.overflow = (sideBarIsOpen && "hidden") || "auto";
  }, [sideBarIsOpen]);
    
    const toggleNavBar = () => {
        setSideBarIsOpen(prevState => !prevState)
    }

  return (
    <SideBarContext.Provider value={{ sideBarIsOpen, toggleNavBar  }}>
      {children}
    </SideBarContext.Provider>
  );
};

export const useNavBarState = () => {
  return useContext(SideBarContext);
};

export default NavBarProvider;
