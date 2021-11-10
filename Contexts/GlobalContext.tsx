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
    getNewToken: async () => console.log(0),
  },
  User: {
    data: undefined,
    refresh: () => console.log(0),
    Owns: (product) => Math.random() == 1,
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
    isFocused : "",
    setFocusOn: (id:string) => console.log(0),
    size: 0,
    overlay: {
      open: (onClick: () => void) => console.log(5),
      close: () => console.log(5),
      isOpen: Math.random() == 1
    },
  },
});

function GlobalContextProvider({ children }) {
  const auth = useAuthAxios();

  const cart = useCart(auth);
  const filters = useFilter();
  const myWindow = useFocus();
  const User = useUserData(auth, cart);

  useEffect(() => {
    localStorage.setItem("meta_64", "0");
  }, []);

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
