import { createContext, useContext, useState, useEffect } from "react";

interface activeProductData {
  categories: string[];
}
const GlobalContext = createContext({
  activeProductData: {
    categories: [""],
  },
  setActiveProductData: undefined,
});

function GlobalContextProvider({ children }) {
  const [activeProductData, setActiveProductData] = useState<activeProductData>(
    {
      categories: [""],
    }
  );

  return (
    <GlobalContext.Provider value={{ activeProductData, setActiveProductData }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
