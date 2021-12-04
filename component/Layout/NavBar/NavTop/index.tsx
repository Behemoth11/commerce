// @ts-ignore
import styles from "./style.module.scss";
import MyLink from "../../../MyLink";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { useSpring, animated, config } from "react-spring";
import { navBarSections } from "../navBarSections";
import { useNavBarContext } from "../navBarContext";
import {
  useAuthcontext,
  useCartContext,
  useMyWindow,
  useUser,
} from "../../../../Contexts/GlobalContext";
import NormalInput from "../../../Inputs/NormalInput";
import Loading from "../../../LoadingController/loading";

const { menu } = navBarSections;

const useScrollDirectionToBottom = (
  sensibility: number,
  sampling: number,
  element
) => {
  const { toBottom, setToBottom } = useNavBarContext();

  

  useEffect(() => {
    element = document.getElementById(element);
    const getScrollSpeed = (e, firstTake = true, previousScroll) => {
      if (!firstTake) {
        const currentScroll = element.scrollTop;
        if (currentScroll < 100) return setToBottom(false);

        let scrollIntensity = currentScroll - previousScroll;
        if (Math.abs(scrollIntensity) >= sensibility)
          setToBottom(scrollIntensity > 0 ? true : false);

        return;
      }
      previousScroll = element.scrollTop;
      setTimeout(() => {
        getScrollSpeed(e, false, previousScroll);
      }, sampling);
    };

    element.addEventListener("scroll", getScrollSpeed);
    return () =>
      element.removeEventListener("scroll", getScrollSpeed, { passive: true });
  }, []);

  return toBottom;
};

const NavTop = () => {
  const router = useRouter();
  const { toggleNavBar, setToBottom } = useNavBarContext();

  const toBottom = useScrollDirectionToBottom(5, 50, "__next");

  const User = useUser();
  const myWindow = useMyWindow();
  const [inputValue, setInputValue] = useState({ search_query: "" });

  const handleClick = (e) => {
    if (inputValue.search_query.length === 0) return;
    router.push(
      `/find?categories=search&&categories=${inputValue.search_query}`
    );
  };

  useEffect(() => {
    if (myWindow.phase === "fadeIn") {
      setToBottom(false);
    }
  }, [myWindow.phase]);
  return (
    <nav
      className={`${styles.navTop} ${toBottom && styles.hidden} container flex`}
    >
      <div className="big-container flex flex-center center-children">
        <div
          id="burger"
          className={`${styles.burgerDivContainer}`}
          onClick={() => toggleNavBar()}
        >
          <div className={`${styles.burgerDiv}`}>
            <div className={styles.middle}></div>
          </div>
        </div>
        {/* <div className="sm">{!User.data && <Icon />}</div> */}
        <div className="sm">
          <Icon />
        </div>

        <div
          className={`${styles.brandIcon}`}
          onClick={(e) => e.stopPropagation()}
        >
          {(router.pathname === "/" && <img src="/svg/BrandLogo.svg" />) || (
            <MyLink href="/">
              <img src="/svg/BrandLogo.svg" />
            </MyLink>
          )}
        </div>
        <div className={styles.linkContainer}>
          {menu.content.map((element) => (
            <Links
              key={element}
              title={element}
              elementData={(menu[element] && menu[element]) || []}
            />
          ))}
        </div>
        <div className={`${styles.rightSection}`}>
          <div
            className={`${styles.textSearch}`}
            onKeyDown={(e) => {
              e.key === "Enter" && handleClick(e);
            }}
          >
            <button className="">
              <svg
                fill="#000000"
                viewBox="0 0 50 50"
                onClick={(e) => {
                  e.stopPropagation();
                  myWindow.setFocusOn("searchBar");
                }}
              >
                <path
                  className=""
                  id="svg"
                  style={{
                    strokeDashoffset:
                      myWindow.isFocused === "searchBar" ? 400 : 0,
                  }}
                  d="M24.9105 27.7542L44.4856 42.2346L45.2356 41.2196L25.7646 26.8163L26.4219 25.8178C27.7312 23.8286 28.4932 21.4477 28.4932 18.885C28.4932 11.9137 22.8449 6.26227 15.8774 6.26227C8.90986 6.26227 3.26158 11.9137 3.26158 18.885C3.26158 25.8563 8.90986 31.5077 15.8774 31.5077C19.0419 31.5077 21.9316 30.3435 24.1467 28.4181L24.9105 27.7542ZM47 40.955L44.75 44L24.9741 29.3711C22.5382 31.4883 19.3574 32.77 15.8774 32.77C8.21311 32.77 2 26.5534 2 18.885C2 11.2165 8.21311 5 15.8774 5C23.5416 5 29.7547 11.2165 29.7547 18.885C29.7547 21.702 28.9163 24.3231 27.4755 26.512L47 40.955ZM27.2316 18.885C27.2316 25.1592 22.1481 30.2454 15.8774 30.2454C9.60661 30.2454 4.52316 25.1592 4.52316 18.885C4.52316 12.6108 9.60661 7.52454 15.8774 7.52454C22.1481 7.52454 27.2316 12.6108 27.2316 18.885ZM15.8774 28.9832C21.4514 28.9832 25.7646 24.462 25.7646 18.885C25.7646 13.3079 21.4514 8.78681 15.8774 8.78681C10.3034 8.78681 5.78474 13.3079 5.78474 18.885C5.78474 24.462 10.3034 28.9832 15.8774 28.9832Z"
                />
              </svg>
            </button>

            {/* <form className="big">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  if (myWindow.isFocused === "searchBar") handleClick(e);
                  else myWindow.setFocusOn("searchBar");
                }}
              >
                <svg fill="#000000" viewBox="0 0 50 50">
                  <path
                    id="svg"
                    d="M24.9105 27.7542L44.4856 42.2346L45.2356 41.2196L25.7646 26.8163L26.4219 25.8178C27.7312 23.8286 28.4932 21.4477 28.4932 18.885C28.4932 11.9137 22.8449 6.26227 15.8774 6.26227C8.90986 6.26227 3.26158 11.9137 3.26158 18.885C3.26158 25.8563 8.90986 31.5077 15.8774 31.5077C19.0419 31.5077 21.9316 30.3435 24.1467 28.4181L24.9105 27.7542ZM47 40.955L44.75 44L24.9741 29.3711C22.5382 31.4883 19.3574 32.77 15.8774 32.77C8.21311 32.77 2 26.5534 2 18.885C2 11.2165 8.21311 5 15.8774 5C23.5416 5 29.7547 11.2165 29.7547 18.885C29.7547 21.702 28.9163 24.3231 27.4755 26.512L47 40.955ZM27.2316 18.885C27.2316 25.1592 22.1481 30.2454 15.8774 30.2454C9.60661 30.2454 4.52316 25.1592 4.52316 18.885C4.52316 12.6108 9.60661 7.52454 15.8774 7.52454C22.1481 7.52454 27.2316 12.6108 27.2316 18.885ZM15.8774 28.9832C21.4514 28.9832 25.7646 24.462 25.7646 18.885C25.7646 13.3079 21.4514 8.78681 15.8774 8.78681C10.3034 8.78681 5.78474 13.3079 5.78474 18.885C5.78474 24.462 10.3034 28.9832 15.8774 28.9832Z"
                  />
                </svg>
              </button>
              <div
                className={`${styles.inputWrapper} big ${
                  myWindow.isFocused == "searchBar" && styles.focus
                }`}
              >
                <NormalInput
                  required={true}
                  name="search_query"
                  placeholder={"search"}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                />
              </div>
            </form>*/}
          </div>

          {/* <div className="big">{!User.data && <Icon />}</div> */}

          {(User.data?.username == "loading" && (
            <Loading
              width="50px"
              background={"var(--theme-color)"}
              style={{ margin: "7px" }}
            />
          )) || (
            <>
              <Account />
              {/* {User.data?._id && <Icon />} */}
            </>
          )}

          <div className="big">
            <Icon />
          </div>
          
        </div>
      </div>
    </nav>
  );
};
export default NavTop;

const Links = ({ title, elementData }) => {
  return (
    <div className={`${styles.navLink}`}>
      <MyLink
        href={{
          pathname: "/find",
          query: { categories: [title] },
        }}
        className={styles.mainLink}
      >
        {title}
      </MyLink>
      <div className={`${styles.content}`}>
        {elementData.content &&
          elementData.content.map((subHeaderelement, index) => (
            <ul key={subHeaderelement} className={styles.headerGroup}>
              <h2 className={styles.subHeader}>
                <MyLink
                  href={{
                    pathname: "/find",
                    query: {
                      categories: [title, subHeaderelement],
                    },
                  }}
                >
                  {subHeaderelement}
                </MyLink>
              </h2>

              {elementData[subHeaderelement] &&
                elementData[subHeaderelement].content.map((element) => (
                  <li key={title + subHeaderelement + element}>
                    <MyLink
                      href={{
                        pathname: "/find",
                        query: {
                          categories: [title, subHeaderelement, element],
                        },
                      }}
                    >
                      <h3>{element}</h3>
                    </MyLink>
                  </li>
                ))}
            </ul>
          ))}
      </div>
    </div>
  );
};

const Icon = () => {
  const cart = useCartContext();
  const { setToBottom } = useNavBarContext();
  const savedProduct = cart.savedProduct;

  useEffect(() => {
    setToBottom(false);
  }, [savedProduct]);

  return (
    <div className="flex" style={{ position: "relative", marginRight: "15px" }}>
      <MyLink href={"/cart"}>
        <div
          className={`${styles.bagIcon} flex center-children hidden-overflow`}
        >
          <img src="/svg/bagIcon.svg"></img>
          <div className={`${styles.ItemsInCart} flex center-children`}>
            <p>{savedProduct?.length}</p>
          </div>
        </div>
      </MyLink>
    </div>
  );
};

const Account = () => {
  const { toBottom } = useNavBarContext();

  const myWindow = useMyWindow();
  const User = useUser();
  const auth = useAuthcontext();
  const isFocused = myWindow.isFocused == "account";

  const spring = useSpring({
    transform: isFocused ? "translate(0%, 105%)" : "translate(100%, 105%)",
    opacity: isFocused ? "1" : "0",
    from: {
      transform: "scale(1) translateY(103%)",
      opacity: "0",
    },
    config: {
      tension: 210,
      friction: 20,
    },
  });

  useEffect(() => {
    if (myWindow.isFocused == "account") {
      myWindow.setFocusOn("none"); // the name here has no importance to the
    }
  }, [toBottom]);

  const handleClick = (e) => {
    // console.log("The account was here");
    // console.log(myWindow.isFocused);
    if (myWindow.isFocused === "account") {
      myWindow.setFocusOn("none", e);
    } else {
      // console.log("the focus on accout");
      myWindow.setFocusOn("account", e);
    }
  };

  const handleLogout = async () => {
    let response;

    //@ts-ignore
    if (window.FB) window.FB.logout();

    User.setUserData({ username: "loading" });
    response = await auth.axios
      .post("/api/auth/logout")
      .catch((err) => (response = err));

    if (response.status === 200) {
      auth.setToken(null);
      User.setUserData(null);
    }
  };

  return (
    <div className="flex">
      <div
        tabIndex={3}
        className={`${styles.bagIcon} ${styles.account} flex center-children hidden-overflow`}
      >
        {(User.data && (
          <div onClick={handleClick}>
            <div className={styles.userImage}>
              <span>{User.data.username?.slice(0, 1)}</span>
            </div>
            <animated.div
              style={{ ...spring, pointerEvents: isFocused ? "all" : "none" }}
              className={styles.rg_menu}
            >
              <MyLink href={"/account"}>
                <div className={styles.user}>
                  <p>Account</p>
                </div>
              </MyLink>

              {(User.hasAuthorization("seller") && (
                <>
                  <MyLink href={"/upload"} className={styles.ac_link}>
                    Upload item
                  </MyLink>
                  <MyLink href={"/seller/groups"} className={styles.ac_link}>
                    Edit Groups
                  </MyLink>
                </>
              )) || (
                <MyLink href={"/account"} className={styles.ac_link}>
                  Vendre
                </MyLink>
              )}
              <hr />

              <div onClick={handleLogout}>
                <p className={styles.signOut}>sign Out</p>
              </div>
            </animated.div>
          </div>
        )) || (
          <div className={styles.loginContainer}>
            <button
              className={styles.register}
              onClick={(e) => {
                e.stopPropagation();
                myWindow.setHashLocation("#auth");
              }}
            >
              <p>connect</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
