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

const CartContext = createContext({
  savedProduct: [{ _id: "" }],
  saveToCart: async (product) => ({
    status: "string",
    message: "string",
  }),
  removeFromCart: (product) => console.log(0),
  setSavedProduct: undefined,
});
export const useCartContext = () => {
  return useContext(CartContext);
};

const AuthContext = createContext({
  axios: axios.create(),
  token: {
    value: "",
    expiresAt: "",
  },
  setToken: (payload: { value: string; expiresAt: string }) => console.log(0),
  getNewToken: async () => console.log(0),
});
export const useAuthcontext = () => {
  return useContext(AuthContext);
};

const MyWindowContext = createContext({
  isFocused: "",
  setFocusOn: (id: string, e?: any) => console.log(0),
  phase: "",
  setPhase: (id: string) => console.log(0),
  size: 0,
  overlay: {
    open: (cb?: () => void) => console.log(5),
    close: (cb?: () => void, param?: "force") => console.log(5),
    isOpen: Math.random() == 1,
    className: "",
  },
  hashLocation: "",
  setHashLocation: (
    id: string,
    direction?: number,
    cb?: () => void,
    className?: string
  ) => console.log(0),
});
export const useMyWindow = () => {
  return useContext(MyWindowContext);
};

const UserContext = createContext({
  data: undefined,
  refresh: () => console.log(0),
  Owns: (product) => Math.random() == 1,
  setUserData: (payload) => console.log(0),
  hasAuthorization: (requiredRole: string) => bn,
});
export const useUser = () => {
  return useContext(UserContext);
};

const FilterContext = createContext({
  value: {},
  toggleFilter: (filter: string, name: string, _callback: stateCallBack) =>
    console.log(0),
  setFilter: (payload: {}) => console.log(0),
});
export const useFilterContext = () => {
  return useContext(FilterContext);
};

declare global {
  interface Array<T> {
    map_unique(
      verifier: {},
      cb?: (item?: any, index?: number) => any,
      get_id?: (variable: any) => string
    ): Array<T>;
  }
}

function GlobalContextProvider({ children }) {
  const auth = useAuthAxios();

  const User = useUserData(auth);
  const cart = useCart(auth, User);
  const filters = useFilter();
  const myWindow = useFocus();

  useEffect(() => {
    localStorage.setItem("meta_64", "0");
  }, []);

  Array.prototype.map_unique = function (
    verifier: {},
    cb?: (item?: any, index?: number) => any,
    get_id?: (variable: any) => string
  ) {
    let result = [];

    let origin_i = 0;
    let target_i = 0;

    while (origin_i < this.length) {
      const id = get_id ? get_id(this[origin_i]) : this[origin_i]?._id;

      if (verifier[id] === true) {
        // console.log("I decided not to render the item");
        origin_i++;
        continue;
      }

      (result[target_i] =
        (cb && cb(this[origin_i], origin_i)) || this[origin_i]),
        origin_i;

      

      verifier[id] = true;
      origin_i++;
      target_i++;
    }

    return result;
  };

  return (
    <CartContext.Provider value={cart}>
      <AuthContext.Provider value={auth}>
        <FilterContext.Provider value={filters}>
          <UserContext.Provider value={User}>
            <MyWindowContext.Provider value={myWindow}>
              {children}
            </MyWindowContext.Provider>
          </UserContext.Provider>
        </FilterContext.Provider>
      </AuthContext.Provider>
    </CartContext.Provider>
  );
}

export default GlobalContextProvider;
