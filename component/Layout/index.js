import styles from "./style.module.css";
import { useIsomorphicLayoutEffect } from "../../shared/CustomHooks";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Auth from "./Auth";
import { useMyWindow } from "../../Contexts/GlobalContext";

const compare = (obj1, obj2) => {
  obj1.focus = "";
  obj2.focus = "";

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length != keys2.length) return false;

  for (const key of keys1) {
    if (obj1[key] != obj2[key]) return false;
  }
  return true;
};

function index({ children }) {
  const router = useRouter();
  const myWindow = useMyWindow();
  const old_url = useRef({ query: {}, pathname: "" });

  useEffect(() => {
    if (
      router.pathname != old_url.current.pathname ||
      !compare(router.query, old_url.current.query)
    ) {
      // console.log("The path changed");
      document.getElementById("__next").scroll(0, 0);
      old_url.current = { query: router.query, pathname: router.pathname };
    }
    myWindow.setPhase("fadeIn");
  }, [children]);

  return (
    <>
      <NavBar />
      <Auth />
      <div className="flex center-children" style={{ position: "relative" }}>
        <div
          className={`${styles[myWindow.phase]} ${
            styles.bigContainer
          } big-container`}
        >
          {children}
        </div>
      </div>
      <div className={styles[myWindow.phase]}>
        <Footer />
      </div>
    </>
  );
}

export default index;
