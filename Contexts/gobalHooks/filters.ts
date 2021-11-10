import { Dispatch, SetStateAction, useEffect, useState } from "react";

// type myType =

export type stateCallBack = Dispatch<SetStateAction<any>> | undefined;

const useFilter = () => {
  const [filter, setFilter] = useState({});

  const toggleFilter = (
    filter: string,
    name: string,
    _callback: stateCallBack
  ) => {
    const callback = _callback || setFilter;

    callback((_prevState) => {
      let prevState = { ..._prevState };

      let update = prevState[filter];
      update = update || {};

      if (filter == "price") {
        delete prevState.price;
      } else if (!update[name]) {
        update[name] = true;
        prevState[filter] = update;
        // prevState[filter] = {[name]: true}// to enable a only one choise effect
      } else {
        delete update[name];
        if (Object.keys(update).length == 0) delete prevState[filter];
      }

      return prevState;
    });
  };

  return { value: filter, toggleFilter, setFilter };
};

export default useFilter;
