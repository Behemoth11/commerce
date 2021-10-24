// @ts-ignore
import styles from "./style.module.css";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useSpring, animated, config } from "react-spring";
import { navBarSections } from "../navBarSections";
import { useNavBarContext } from "../navBarContext";
import { useGlobalContext } from "../../../../Contexts/GlobalContext";

const { menu } = navBarSections;

const NavTop = () => {
  const { toggleNavBar } = useNavBarContext();
  const { User } = useGlobalContext();

  return (
    <nav className={`${styles.navTop} container flex`}>
      <div className="big-container flex flex-center center-children">
        <div
          className={`${styles.burgerDivContainer} flex-left`}
          onClick={() => toggleNavBar()}
        >
          <div className={`${styles.burgerDiv}`}>
            <div className={styles.middle}></div>
          </div>
        </div>

        <div className={`${styles.brandIcon}`}>
          <Link href="/">
            <a>
              <img src="/svg/BrandLogo.svg" />
            </a>
          </Link>
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
          <Account />
          {User.data?._id && <Icon />}
        </div>
      </div>
    </nav>
  );
};
export default NavTop;

const Links = ({ title, elementData }) => {
  return (
    <div className={`${styles.navLink}`}>
      <Link
        href={{
          pathname: "/find",
          query: { categories: [title] },
        }}
      >
        <a className={styles.mainLink}>{title}</a>
      </Link>
      <div className={`${styles.content}`}>
        {elementData.content &&
          elementData.content.map((subHeaderelement, index) => (
            <ul key={subHeaderelement} className={styles.headerGroup}>
              <h2 className={styles.subHeader}>
                <Link
                  href={{
                    pathname: "/find",
                    query: {
                      categories: [title, subHeaderelement],
                    },
                  }}
                >
                  <a>{subHeaderelement}</a>
                </Link>
              </h2>

              {elementData[subHeaderelement] &&
                elementData[subHeaderelement].content.map((element) => (
                  <li key={title + subHeaderelement + element}>
                    <Link
                      href={{
                        pathname: "/find",
                        query: {
                          categories: [title, subHeaderelement, element],
                        },
                      }}
                    >
                      <h3>
                        <a> {element}</a>
                      </h3>
                    </Link>
                  </li>
                ))}
            </ul>
          ))}
      </div>
    </div>
  );
};

const Icon = () => {
  const { cart } = useGlobalContext();
  const { setToBottom } = useNavBarContext();
  const savedProduct = cart.savedProduct;

  useEffect(() => {
    setToBottom(false);
  }, [savedProduct]);

  return (
    <div className="flex" style={{ position: "relative", marginRight: "15px" }}>
      <Link href={"/cart"}>
        <div
          className={`${styles.bagIcon} flex center-children hidden-overflow`}
        >
          <img src="/svg/bagIcon.svg"></img>
          <div className={`${styles.ItemsInCart} flex center-children`}>
            <p>{savedProduct?.length}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

const Account = () => {
  const { toBottom } = useNavBarContext();

  const { myWindow, User, auth } = useGlobalContext();
  const isFocused = myWindow.focusedEntity == "account";

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
    myWindow.setFocusedEntity("not account"); // the name here has no importance to the
  }, [toBottom]);

  const handleClick = (e) => {
    e.stopPropagation();
    //console.log("I was responsible of it")
    myWindow.setFocusedEntity(
      (p) => (p == "account" && "undefined") || "account"
    );
  };

  const handleLogout = async () => {
    let response;
    response = await auth.axios
      .get("/api/auth/logout")
      .catch((err) => (response = err));

    if (response.status === 200) {
      auth.setToken(undefined);
      User.setUserData(undefined);
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
              <span>{User.data.username.slice(0, 1)}</span>
            </div>
            <animated.div style={spring} className={styles.rg_menu}>
              <Link href={"/account"}>
                <a>
                  <div className={styles.user}>
                    <p>Account</p>
                  </div>
                </a>
              </Link>

              <Link href={"/account"}>
                <a>
                  <div style={{ margin: "var(--margin) 0" }}>
                    <p>Become a seller</p>
                  </div>
                </a>
              </Link>
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
              onClick={() => myWindow.setIsShown("login")}
            >
              <p>Register</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
