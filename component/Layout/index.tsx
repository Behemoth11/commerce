import styles from "./style.module.scss";
import { useIsomorphicLayoutEffect, useSelectiveState } from "../../shared/CustomHooks";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Auth from "./Auth";
import { useMyWindow } from "../../Contexts/GlobalContext";
import Facebook from "./Facebook";
import { compare } from "../../shared/shared_functions";
import LoadingCircle from "../LoadingController/LoadingCircle";
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
      // myWindow.overlay.close(null, "force")
      old_url.current = { query: router.query, pathname: router.pathname };
    }
    
    myWindow.setPhase("fadeIn");


    setInternalState("idle")

  }, [children]);

  const [internalState, internalState_id,  setInternalState] = useSelectiveState("idle")

  return (
    <>
      <NavBar />
      <Auth />
      <div className="flex center-children" style={{ position: "relative" }}>
        {internalState === "loading" && (
          <div className={"loading"}>
            <LoadingCircle visible={true} background={"var(--accent-color)"} />
          </div>
        )}

        <div
          className={`${styles[myWindow.phase]} content ${
            styles.bigContainer
          } big-container`}
          onTransitionEnd={() => {
            if (myWindow.phase === "fadeIn") return;
            document.getElementById("__next").scroll(0, 0);

            const _id = internalState_id.current;
            setTimeout(() => {
              if (_id === internalState_id.current){
                setInternalState("loading");
              }
            }, 1000)
          }}
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
