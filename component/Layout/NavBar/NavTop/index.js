// @ts-ignore
import styles from "./style.module.css";
import { useState } from "react";

const index = () => {
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

  return (
    <nav className={`${styles.navTop} container flex`}>
      <div className="big-container flex flex-center center-children">
        <div
          className="flex-left"
          onClick={() => setSideBarIsOpen((pS) => !pS)}
        >
          <div
            className={`${styles.burgerDiv} ${sideBarIsOpen && styles.open}`}
          >
            <div className={styles.middle}></div>
          </div>
        </div>
        <div className="flex-center">MOMENT</div>
        <div className=" flex flex-right">
          <div style={{ marginTop: 10 }}>
            <svg
              width="27"
              height="31"
              viewBox="0 0 27 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.5 10C20.5 15.2712 16.4467 19.5 11.5 19.5C6.55329 19.5 2.5 15.2712 2.5 10C2.5 4.72882 6.55329 0.5 11.5 0.5C16.4467 0.5 20.5 4.72882 20.5 10Z"
                fill="white"
                stroke="#202030"
              />
              <rect
                x="0.6"
                y="7.6"
                width="21.8"
                height="17.8"
                fill="white"
                stroke="#202030"
                strokeWidth="1.2"
              />
              <ellipse cx="21" cy="25.5" rx="6" ry="5.5" fill="white" />
              <circle cx="20.8125" cy="25.1875" r="4.8125" fill="#202030" />
              <path
                d="M20.0124 29C20.0304 28.274 20.0904 27.611 20.1924 27.011C20.3004 26.405 20.4864 25.796 20.7504 25.184C21.0144 24.572 21.3864 23.972 21.8664 23.384H18.8154V22.7H22.8204V23.366C22.1784 24.068 21.6894 24.893 21.3534 25.841C21.0174 26.789 20.8494 27.842 20.8494 29H20.0124Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default index;
