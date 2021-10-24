// @ts-ignore
import styles from "./style.module.css";
import Link from "next/link";
import { memo } from "react";
import { useNavBarContext } from "../navBarContext";
import { useTransition, animated, config } from "react-spring";

const littleLinkList = [
  {
    text: "about us",
    to: "about"
  },
  {
    text: "contact us",
    to: "contact" 
  },
  {
    text: "feedback",
    to: "feedback"
  }
];

const Navigation = ({
  mainmenu,
  headers,
  title,
  index,
  visible,
  regression,
  updateSideBar,
  sideBarLocation,
  progressiveComeBack,
}) => {
  const { sideBarIsOpen, toggleNavBar } = useNavBarContext();

  const animate = useTransition(visible, {
    from: {
      transform: "translateX(100%)",
    },
    enter: { transform: "translateX(0%)" },
    leave: { transform: "translateX(100%)" },
    config: config.stiff,
  });

  return animate(
    (_styles, visible) =>
      visible && (
        <animated.div
          className={`${styles.navigation} vertical-flex container no-shrink`}
          style={_styles}
        >
          <div className={`${styles.headerSection} flex align-center`}>
            {!mainmenu && (
              <div
                className={`${styles.backArrow} flex center-children`}
                onClick={() => regression()}
              ></div>
            )}

            <h4 className="flex-center" onClick={() => progressiveComeBack(0)}>
              {title}
            </h4>

            <div
              className={`${styles.croxSection} flex center-children pointer`}
              onClick={() => toggleNavBar()}
            >
              <div
                className={`${styles.burger} ${sideBarIsOpen && styles.open}`}
              ></div>
            </div>
          </div>

          <div className={`${styles.linkSection}`}>
            {headers.map(({ label, hasDescendant }) =>
              hasDescendant ? (
                <div
                  key={label}
                  onClick={() => updateSideBar(label, index)}
                  className={`max-width flex pointer align-center ${styles.linkContainer} `}
                >
                  <Link
                    href={{
                      pathname: "/find",
                      query: {
                        categories: [
                          ...sideBarLocation.slice(index - 1, index),
                          label,
                        ],
                      },
                    }}
                  >
                    <div onClick={() => toggleNavBar()} className={`flex align-center`}>
                      <a>{label}</a>
                    </div>
                  </Link>
                </div>
              ) : (
                <Link
                  key={label}
                  href={{
                    pathname: "/find",
                    query: {
                      categories: [
                        ...sideBarLocation.slice(1, index + 1),
                        label,
                      ],
                    },
                  }}
                >
                  <div
                    className={`max-width flex pointer align-center ${styles.linkContainer}`}
                    onClick={() => toggleNavBar()}
                  >
                    <a>{label}</a>
                  </div>
                </Link>
              )
            )}
          </div>

          <div className={styles.footer}>
            <ul>
              {littleLinkList.map(({text, to}) => (
                <Link key={text} href={`/${to}`}>
                  <li onClick={() => toggleNavBar()}>
                    <a>{text}</a>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </animated.div>
      )
  );
};

export default memo(Navigation);
