import { Overlay } from "@cloudinary/base/actions/overlay";
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
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false); //remeber to change this to true
  const myWindow = useMyWindow();
  const [toBottom, _setToBottom] = useState(false);

  useEffect(() => {
    const { classList } = document.getElementById("__next");
    sideBarIsOpen
      ? classList.add("navBar_overflow")
      : classList.remove("navBar_overflow");
  }, [sideBarIsOpen]);

  const toggleNavBar = () => {
    setSideBarIsOpen((prevState) => {
      if (prevState === false) {
        return true;
      } else {
        return false;
      }
    });
  };

  useIsomorphicLayoutEffect(() => {
    if (sideBarIsOpen) myWindow.overlay.open(() => setSideBarIsOpen(false));
    else myWindow.overlay.close();
  }, [sideBarIsOpen]);

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
