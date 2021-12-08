import { detachRefs } from "@react-spring/core/dist/declarations/src/helpers";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { useIsomorphicLayoutEffect } from "../../shared/CustomHooks";
import { string_and_array_to_array } from "../../shared/UtilityFunctions";

const useFocus = () => {
  const [overlay_state, setOverlay] = useState({
    open: false,
    callbacks: [],
    className: "",
  });

  const [phase, setPhase] = useState("fadeIn");

  const [isFocused, _setFocusOn] = useState("none");

  const setFocusOn = (payload, e?: any) => {
    if (e) e.stopPropagation();
    _setFocusOn(payload);
  };

  useEffect(() => {
    const unfocus = () => {
      setFocusOn("none");
    };
    window.addEventListener("click", unfocus);
    return () => window.removeEventListener("click", unfocus);
  }, []);

  const [resize, setResize] = useState<number>(1);
  useEffect(() => {
    const resizeEvent = () => setResize((prevState) => prevState + 1);
    window.addEventListener("resize", resizeEvent);
    return () => window.removeEventListener("resize", resizeEvent);
  }, []);

  //overlay
  const open_overlay = (cb?: () => void, className?: string) => {
    setOverlay((prevState) => ({
      open: true,
      callbacks: (cb && prevState.callbacks.concat(cb)) || prevState.callbacks,
      className,
    }));
  };

  const close_overlay = (cb?: () => void, param?: string) => {
    const len = history.length;

    let i = 0;
    var index = 0;

    if (param === "force") {
      handler();
      return;
    }
    while (len - 1 - i >= 0) {
      console.log(history);
      if (history[len - 1 - i] === "" || history[len - 1 - i] === "#none") {
        // console.log("the location of the item ", i);
        index = i;
        break;
      }
      i++;
    }

    // if (depth.current && param !== "force") {
    //   window.history.go(-depth.current);
    //   depth.current = 0;
    // }

    // console.log("How much should I go back ", index);

    if (index > 0) {
      window.history.go(-index);
    }

    setOverlay({ open: false, callbacks: [], className: "" });
  };

  const overlay = {
    close: close_overlay,
    open: open_overlay,
    isOpen: overlay_state.open,
    className: overlay_state.className,
  };
  const [history, setHashLocation] = useState([""]);
  const depth = useRef(0);
  const hashLocation = history[history.length - 1];

  const open = (
    id: string,
    direction?: number,
    cb?: () => void,
    className?: string
  ) => {
    if (className) {
      setOverlay((prev) => ({ ...prev, className }));
    }

    if (!direction || direction === 1) {
      window.location.hash = id;
      depth.current += 1;
    } else if (direction === 0) {
      window.location.hash = id;
    } else if (direction === -1) {
      window.history.go(-1);
      depth.current -= 1;
    }
    // console.log(depth.current);
  };

  const handler = () => {
    setHashLocation((prev) => {
      const len = prev.length;

      // console.log(prev, window.location.hash);

      if (prev[len - 2] === window.location.hash) {
        return prev.slice(0, -1);
      } else {
        return [...prev, window.location.hash];
      }
    });

    if (
      window.location.hash === "#none" ||
      window.location.hash == "" ||
      /%20/.test(window.location.hash)
    ) {
      // console.log("just closing the overlay")
      setOverlay({ open: false, callbacks: [], className: "" });
    } else {
      setOverlay((prev) => ({ ...prev, open: true, callbacks: [] }));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      window.location.hash = "";
    }, 100);

    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return {
    size: resize,
    overlay,
    isFocused,
    setFocusOn,
    phase,
    setPhase,
    hashLocation,
    setHashLocation: open,
  };
};

export default useFocus;
