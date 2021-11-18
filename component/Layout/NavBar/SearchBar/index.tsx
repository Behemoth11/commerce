// @ts-ignore
import styles from "./style.module.css";
import { memo, useEffect, useState } from "react";
import { useMyWindow } from "../../../../Contexts/GlobalContext";
import NormalInput from "../../../Inputs/NormalInput";
import { useSpring, animated } from "react-spring";
import { useRouter } from "next/router";
import { useNavBarContext } from "../navBarContext";

const SearchBar = () => {
  const router = useRouter();
  const myWindow = useMyWindow()
  const {toBottom} = useNavBarContext()
  const visible = myWindow.isFocused === "searchBar" && !toBottom;
  const [inputValue, setInputValue] = useState({ search_query: "" });
  const [isCompletelyVisible, setIsCompleteVisible] = useState(false);

  const springAnimate = useSpring({
    from: { transform: "translate(-50%,-100%)" },
    transform: (visible && "translate(-50%, 100%)") || "translate(-50%,-100%)",
    onRest: () => {
      setIsCompleteVisible(visible);
    },
  });

  const handleClick = (e) => {
    if (inputValue.search_query.length === 0) return;
    router.push(
      `/find?categories=search&&categories=${inputValue.search_query}`
    );
  };

  useEffect(() => {
    if (visible) document.getElementById("search_query").focus();
  }, [visible]);

  return (
    <>
   
    <animated.div
      style={springAnimate}
      className={` big-container sm ${styles.wrapper}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className={styles.inputContainer}
        onKeyDown={(e) => e.key === "Enter" && handleClick(e)}
      >
        <NormalInput
          required={false}
          name="search_query"
          placeholder={"chercher"}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <svg fill="#000000" viewBox="0 0 50 50" onClick={handleClick}>
          <path
            style={{
              strokeDashoffset:
                (!visible && "400") || (isCompletelyVisible && "0") || "400",
            }}
            d="M24.9105 27.7542L44.4856 42.2346L45.2356 41.2196L25.7646 26.8163L26.4219 25.8178C27.7312 23.8286 28.4932 21.4477 28.4932 18.885C28.4932 11.9137 22.8449 6.26227 15.8774 6.26227C8.90986 6.26227 3.26158 11.9137 3.26158 18.885C3.26158 25.8563 8.90986 31.5077 15.8774 31.5077C19.0419 31.5077 21.9316 30.3435 24.1467 28.4181L24.9105 27.7542ZM47 40.955L44.75 44L24.9741 29.3711C22.5382 31.4883 19.3574 32.77 15.8774 32.77C8.21311 32.77 2 26.5534 2 18.885C2 11.2165 8.21311 5 15.8774 5C23.5416 5 29.7547 11.2165 29.7547 18.885C29.7547 21.702 28.9163 24.3231 27.4755 26.512L47 40.955ZM27.2316 18.885C27.2316 25.1592 22.1481 30.2454 15.8774 30.2454C9.60661 30.2454 4.52316 25.1592 4.52316 18.885C4.52316 12.6108 9.60661 7.52454 15.8774 7.52454C22.1481 7.52454 27.2316 12.6108 27.2316 18.885ZM15.8774 28.9832C21.4514 28.9832 25.7646 24.462 25.7646 18.885C25.7646 13.3079 21.4514 8.78681 15.8774 8.78681C10.3034 8.78681 5.78474 13.3079 5.78474 18.885C5.78474 24.462 10.3034 28.9832 15.8774 28.9832Z"
          />
        </svg>
      </div>
    </animated.div>
    </>
  );
};

export default memo(SearchBar);
