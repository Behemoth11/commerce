import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { useIsomorphicLayoutEffect } from "../../shared/CustomHooks";

const useFocus = () => {
  const router = useRouter();
  //focus entities

  const [overlay_state, setOverlay] = useState({
    open: false,
    callbacks: [],
  });

  const pathnameRef = useRef();

  const isFocused = router.query.focus;

  const setFocusOn = (id, e?: any) => {
    if (e) e.stopPropagation();
    const url = new URL(window.location.href)
    console.log(url.search)
    let query;
    if (url.search.length > 0){
     query =  url.search.split("focus")[0] + "&"
    } else {
      query = "?"
    }

    router.push(
      url.pathname+ query +`focus=${id}`,
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    if (!router.isReady) return;
    const unfocus = () => {
      console.log("The unfoc thing just ran");
      setFocusOn("none");
    };
    window.addEventListener("click", unfocus);
    return () => window.removeEventListener("click", unfocus);
  }, [router.isReady]);

  //resize
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
    size: resize,
    overlay,
    isFocused,
    setFocusOn,
  };
};

export default useFocus;
