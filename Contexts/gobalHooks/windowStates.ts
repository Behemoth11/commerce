import { useEffect, useState } from "react";

const useFocus = () => {
  //focus entities
  const [focusedEntity, setFocusedEntity] = useState("init");
  const focus_controller = { focusedEntity, setFocusedEntity };
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

  useEffect(() => {
    //console.log(focusedEntity);
  }, [focusedEntity])

  return { focusedEntity, setFocusedEntity, size: resize, isShown, setIsShown };
};

export default useFocus;
