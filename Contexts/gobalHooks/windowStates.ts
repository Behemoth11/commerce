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
    const callbacks = overlay_state.callbacks.concat(cb);
    setOverlay({ open: false, callbacks: [] });

    for (let i = 0; i < callbacks.length; i++) {
      if (!callbacks[i]) continue;
      callbacks[i]();
    }
  };

  const overlay = {
    close: close_overlay,
    open: open_overlay,
    isOpen: overlay_state.open,
  };

  //inpage navigation

  const [hashLocation, setHashLocation] = useState("");

  const open = (id: string) => {
    open_overlay(() => window.history.go(-1));
    window.location.hash = id;
    setHashLocation(id);
  };

  useEffect(() => {
    const handler = (e) => {
      setHashLocation(window.location.hash);
      if (window.location.hash == "") {
        setOverlay({ open: false, callbacks: [] });
      }
    };
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
