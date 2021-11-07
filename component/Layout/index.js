import styles from "./style.module.css";
import { useIsomorphicLayoutEffect } from "../../shared/CustomHooks";
import { useState, useEffect, useLayoutEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Auth from "./Auth";


function index({ children }) {
  const [activeChildren, setActiveChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useIsomorphicLayoutEffect(() => {
    const style_tag = document.head.getElementsByTagName("style");
    for (let i = 0; i < style_tag.length; i++) {
      style_tag[i].setAttribute("media", "all");
    }
    if (activeChildren != children) setTransitionStage("fadeOut");
  }, [children]);

  return (
    <>
      <NavBar />
      <Auth />
      <div className="flex center-children" style={{ position: "relative" }}>
        <div
          className={`${styles[transitionStage]} ${styles.bigContainer} big-container`}
          onTransitionEnd={() => {
            if (transitionStage === "fadeOut") {
              setActiveChildren(children);
              document.getElementById("__next").scroll(0, 0);
              setTransitionStage("fadeIn");
            }
          }}
        >
          {activeChildren}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default index;
