import { Dispatch, SetStateAction, useEffect, useState } from "react";

// type myType =

export type stateCallBack = Dispatch<SetStateAction<any>> | undefined;

const useFilter = () => {
  const [filter, setFilter] = useState({_spec: ""});

  const toggleFilter = (
    filter: string,
    name: string,
    _callback: stateCallBack,
    behavior?: "string"
  ) => {
    const callback = _callback || setFilter;

    callback((_prevState) => {
      let _spec = behavior || "passive";
      let prevState = { ..._prevState, _spec };

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
