
import React, { useState, useContext, useEffect } from "react";
import { useMyWindow } from "../../../Contexts/GlobalContext";
import { useIsomorphicLayoutEffect } from "../../../shared/CustomHooks";

const SideBarContext = React.createContext({
  toBottom: false,
  sideBarIsOpen: false,
  setToBottom: undefined,
  toggleNavBar: undefined,
});

const NavBarProvider = ({ children }) => {
  const myWindow = useMyWindow();
  const [toBottom, _setToBottom] = useState(false);

  const sideBarIsOpen = myWindow.hashLocation === "#side_bar_navigation"

  useEffect(() => {
    const { classList } = document.getElementById("__next");
    sideBarIsOpen
      ? classList.add("navBar_overflow")
      : classList.remove("navBar_overflow");
  }, [sideBarIsOpen]);

  const toggleNavBar = () => {
    if (sideBarIsOpen){
      myWindow.setHashLocation("none", -1)
    }else{
      myWindow.setHashLocation("#side_bar_navigation")
    }
  };

  const setToBottom = (payload) => {
    _setToBottom(payload);
  };

  return (
    <SideBarContext.Provider
      value={{ sideBarIsOpen, toggleNavBar, toBottom, setToBottom }}
    >
      {children}
    </SideBarContext.Provider>
  );
};

export const useNavBarContext: () => {
  toBottom: boolean;
  sideBarIsOpen: boolean;
  setToBottom: any;
  toggleNavBar: any;
} = () => {
  return useContext(SideBarContext);
};

export default NavBarProvider;
