import styles from "./style.module.css";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Auth from "./Auth";

function index({ children }) {
  const [activeChildren, setActiveChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState("fadeOut");

  useEffect(() => {
    setTransitionStage("fadeIn");
  }, []);

  useEffect(() => {
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
              document.getElementById("__next").scroll(0, 0)
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
