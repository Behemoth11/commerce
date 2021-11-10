import styles from "./style.module.css";
import { useIsomorphicLayoutEffect } from "../../shared/CustomHooks";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Auth from "./Auth";

function index({ children }) {
  const router = useRouter();
  const [activeChildren, setActiveChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState("fadeIn");
  const pathRef = useRef(router.asPath);

  const [that,setthat] = useState(0)

  useIsomorphicLayoutEffect(() => {
    const style_tag = document.head.getElementsByTagName("style");
    for (let i = 0; i < style_tag.length; i++) {
      style_tag[i].setAttribute("media", "all");
    }
    if (router.asPath.split("focus=")[0] != pathRef.current.split("focus=")[0]) {
      pathRef.current = router.asPath;
      setTransitionStage("fadeOut");
      setTimeout(() => {
        setTransitionStage("fadeIn");
      }, 500);
    }
  }, [children]);

  useIsomorphicLayoutEffect(() => {
    if (!router.isReady || activeChildren.props.statusCode === 404) return;
    console.log("The router is uselessly reloading the page-- I decided so");
    router.push(router.asPath);
  }, [router.isReady]);

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
      <div>
        <a href="#login" onClick={() => setthat(prev => prev+1)}>Thi is the anchor link</a>
      </div>
      <Footer />
    </>
  );
}

export default index;
