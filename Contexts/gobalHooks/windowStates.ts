import { useEffect, useState } from "react";

const useFocus = () => {
  //focus entities
  const [focusedEntity, setFocusedEntity] = useState("init");
  const focus_controller = { focusedEntity, setFocusedEntity };
  const [overlay_state, setOverlay] = useState({
    open: false,
    callbacks: [],
  });

  useEffect(() => {
    const unfocus = () => {
      setFocusedEntity("undefined");
    };
    window.addEventListener("click", unfocus);
    return () => window.removeEventListener("click", unfocus);
  }, []);

  //resize
  const [resize, setResize] = useState<number>(1);
  useEffect(() => {
    const resizeEvent = () => setResize((prevState) => prevState + 1);

    window.addEventListener("resize", resizeEvent);
    return () => window.removeEventListener("resize", resizeEvent);
  }, []);

  //FilterOverlayContext

  const [isShown, setIsShown] = useState("closed");

  //overlay

  const open_overlay = (cb?: () => void) => {
    setOverlay((prevState) => ({
      open: true,
      callbacks: prevState.callbacks.concat(cb),
    }));
  };

  const close_overlay = (cb?: () => void) => {
    const callbacks = overlay_state.callbacks;
    setOverlay({ open: false, callbacks: [] });

    for (let i = 0; i < callbacks.length; i++) {
      callbacks[i]();
    }
  };

  const overlay = {
    close: close_overlay,
    open: open_overlay,
    isOpen: overlay_state.open,
  };

  return {
    focusedEntity,
    setFocusedEntity,
    size: resize,
    isShown,
    setIsShown,
    overlay,
  };
};

export default useFocus;
