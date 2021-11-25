import styles from "./style.module.scss";
import { useIsomorphicLayoutEffect } from "../../shared/CustomHooks";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Auth from "./Auth";
import { useMyWindow } from "../../Contexts/GlobalContext";
import Facebook from "./Facebook"
import { compare } from "../../shared/shared_functions";
// import {compare } from 

function index({ children }) {
  const router = useRouter();
  const myWindow = useMyWindow();
  const old_url = useRef({ query: {}, pathname: "" });

  useEffect(() => {
    if (
      router.pathname != old_url.current.pathname ||
      !compare(router.query, old_url.current.query)
    ) {
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
        <Facebook />
      </div>
    </>
  );
}

export default index;
