import {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";
import { useAuthAxios, useFirstTimeLoading } from "../shared/CustomHooks";
import useCart from "./gobalHooks/cart";
import useFilter, { stateCallBack } from "./gobalHooks/filters";
import useFocus from "./gobalHooks/windowStates";
import useUserData from "./gobalHooks/userData";

let bn: boolean;

const GlobalContext = createContext({
  cart: {
    savedProduct: [{}],
    saveToCart: (product) => console.log(0),
    removeFromCart: (product) => console.log(0),
    setSavedProduct: undefined,
  },
  auth: {
    axios: axios.create(),
    token: {
      value: "",
      expiresAt: "",
    },
    setToken: (payload) => console.log(0),
  },
  User: {
    data: undefined,
    refresh: () => console.log(0),
    setUserData: (payload) => console.log(0),
    hasAuthorization: (requiredRole: string) => bn,
  },
  filters: {
    value: {},
    toggleFilter: (filter: string, name: string, _callback: stateCallBack) =>
      console.log(0),
    setFilter: (payload: {}) => console.log(0),
  },
  myWindow: {
    focusedEntity: "",
    setFocusedEntity: undefined,

    isShown: "closed",
    setIsShown: undefined,

    size: 0,
  },
});

function GlobalContextProvider({ children }) {
  
  const auth = useAuthAxios();

  const cart = useCart(auth);
  const filters = useFilter();
  const myWindow = useFocus();
  const User = useUserData(auth, cart);

  return (
    <GlobalContext.Provider
      value={{
        myWindow,
        filters,
        cart,
        auth,
        User,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};