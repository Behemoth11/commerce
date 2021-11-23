import { detachRefs } from "@react-spring/core/dist/declarations/src/helpers";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { useIsomorphicLayoutEffect } from "../../shared/CustomHooks";
import { string_and_array_to_array } from "../../shared/UtilityFunctions";

const useFocus = () => {
  const [overlay_state, setOverlay] = useState({
    open: false,
    callbacks: [],
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
  const open_overlay = (cb?: () => void) => {
    setOverlay((prevState) => ({
      open: true,
      callbacks: (cb && prevState.callbacks.concat(cb)) || prevState.callbacks,
    }));
  };

  const close_overlay = (cb?: () => void) => {
    if (depth.current ) {
      window.history.go(-depth.current);
      depth.current = 0;
    }
    setOverlay({ open: false, callbacks: [] });
  };

  const overlay = {
    close: close_overlay,
    open: open_overlay,
    isOpen: overlay_state.open,
  };
  const [hashLocation, setHashLocation] = useState("");
  const depth = useRef(0);

  const open = (id: string, direction?: number, cb?: () => void) => {
    if (!direction || direction === 1) {
      window.location.hash = id;
      depth.current += 1;
      open_overlay();
    } else if (direction === 0) {
      window.location.hash = id;
      open_overlay();
    } else if (direction === -1) {
      window.history.go(-1);
      depth.current -= 1;
    }
    console.log(depth.current);
  };

  useEffect(() => {
    const handler = () => {
      setHashLocation(window.location.hash);
      if (window.location.hash == "") {
        setOverlay({ open: false, callbacks: [] });
        depth.current = 0;
      }
    };

    window.location.hash = "";
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
