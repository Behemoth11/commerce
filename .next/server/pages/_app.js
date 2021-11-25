(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 6726:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9940);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_module_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
// @ts-ignore




const CaptChat = () => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_1___default().captchat),
    children: ["This site is protected by reCAPTCHA and the Google\xA0", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
      href: "https://policies.google.com/privacy",
      children: "Privacy Policy"
    }), "\xA0 and\xA0", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
      href: "https://policies.google.com/terms",
      children: "Terms of Service"
    }), "\xA0 apply."]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CaptChat);

/***/ }),

/***/ 2008:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6731);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Contexts_GlobalContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1005);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);




const MyLink = ({
  children,
  href,
  className
}) => {
  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_0__.useRouter)();
  const myWindow = (0,_Contexts_GlobalContext__WEBPACK_IMPORTED_MODULE_1__/* .useMyWindow */ .$9)();

  const handleClick = e => {
    // console.log(router.asPath)
    // console.log(router.pathname)
    // e.stopPropagation();
    myWindow.setPhase("fadeOut");
    setTimeout(() => {
      router.push(href);
    }, 200);
  };

  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("a", {
    onClick: handleClick,
    className: className,
    children: children
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyLink);

/***/ }),

/***/ 6919:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

;// CONCATENATED MODULE: external "next/script"
const script_namespaceObject = require("next/script");
var script_default = /*#__PURE__*/__webpack_require__.n(script_namespaceObject);
// EXTERNAL MODULE: ./component/Layout/style.module.scss
var style_module = __webpack_require__(4287);
var style_module_default = /*#__PURE__*/__webpack_require__.n(style_module);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(6731);
// EXTERNAL MODULE: ./component/Layout/NavBar/NavTop/style.module.scss
var NavTop_style_module = __webpack_require__(8378);
var NavTop_style_module_default = /*#__PURE__*/__webpack_require__.n(NavTop_style_module);
// EXTERNAL MODULE: ./component/MyLink.tsx
var MyLink = __webpack_require__(2008);
// EXTERNAL MODULE: external "react-spring"
var external_react_spring_ = __webpack_require__(6821);
// EXTERNAL MODULE: ./component/Layout/NavBar/navBarSections.tsx
var navBarSections = __webpack_require__(7756);
// EXTERNAL MODULE: ./Contexts/GlobalContext.tsx + 4 modules
var GlobalContext = __webpack_require__(1005);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./component/Layout/NavBar/navBarContext.tsx



const SideBarContext = /*#__PURE__*/external_react_default().createContext({
  toBottom: false,
  sideBarIsOpen: false,
  setToBottom: undefined,
  toggleNavBar: undefined
});

const NavBarProvider = ({
  children
}) => {
  const myWindow = (0,GlobalContext/* useMyWindow */.$9)();
  const {
    0: toBottom,
    1: _setToBottom
  } = (0,external_react_.useState)(false);
  const sideBarIsOpen = myWindow.hashLocation === "#side_bar_navigation";
  (0,external_react_.useEffect)(() => {
    const {
      classList
    } = document.getElementById("__next");
    sideBarIsOpen ? classList.add("navBar_overflow") : classList.remove("navBar_overflow");
  }, [sideBarIsOpen]);

  const toggleNavBar = () => {
    if (sideBarIsOpen) {
      myWindow.setHashLocation("none", -1);
    } else {
      myWindow.setHashLocation("#side_bar_navigation");
    }
  };

  const setToBottom = payload => {
    _setToBottom(payload);
  };

  return /*#__PURE__*/jsx_runtime_.jsx(SideBarContext.Provider, {
    value: {
      sideBarIsOpen,
      toggleNavBar,
      toBottom,
      setToBottom
    },
    children: children
  });
};

const useNavBarContext = () => {
  return (0,external_react_.useContext)(SideBarContext);
};
/* harmony default export */ const navBarContext = (NavBarProvider);
// EXTERNAL MODULE: ./component/LoadingController/loading.tsx
var loading = __webpack_require__(2770);
;// CONCATENATED MODULE: ./component/Layout/NavBar/NavTop/index.tsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// @ts-ignore












const {
  menu
} = navBarSections/* navBarSections */.Mk;

const useScrollDirectionToBottom = (sensibility, sampling, element) => {
  const {
    toBottom,
    setToBottom
  } = useNavBarContext();
  (0,external_react_.useEffect)(() => {
    element = document.getElementById(element);

    const getScrollSpeed = (e, firstTake = true, previousScroll) => {
      if (!firstTake) {
        const currentScroll = element.scrollTop;
        if (currentScroll < 100) return setToBottom(false);
        let scrollIntensity = currentScroll - previousScroll;
        if (Math.abs(scrollIntensity) >= sensibility) setToBottom(scrollIntensity > 0 ? true : false);
        return;
      }

      previousScroll = element.scrollTop;
      setTimeout(() => {
        getScrollSpeed(e, false, previousScroll);
      }, sampling);
    };

    element.addEventListener("scroll", getScrollSpeed);
    return () => element.removeEventListener("scroll", getScrollSpeed, {
      passive: true
    });
  }, []);
  return toBottom;
};

const NavTop = () => {
  var _User$data;

  const router = (0,router_.useRouter)();
  const {
    toggleNavBar,
    setToBottom
  } = useNavBarContext();
  const toBottom = useScrollDirectionToBottom(5, 50, "__next");
  const User = (0,GlobalContext/* useUser */.aF)();
  const myWindow = (0,GlobalContext/* useMyWindow */.$9)();
  const {
    0: inputValue,
    1: setInputValue
  } = (0,external_react_.useState)({
    search_query: ""
  });

  const handleClick = e => {
    if (inputValue.search_query.length === 0) return;
    router.push(`/find?categories=search&&categories=${inputValue.search_query}`);
  };

  (0,external_react_.useEffect)(() => {
    if (myWindow.phase === "fadeIn") {
      setToBottom(false);
    }
  }, [myWindow.phase]);
  return /*#__PURE__*/jsx_runtime_.jsx("nav", {
    className: `${(NavTop_style_module_default()).navTop} ${toBottom && (NavTop_style_module_default()).hidden} container flex`,
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "big-container flex flex-center center-children",
      children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
        className: `${(NavTop_style_module_default()).burgerDivContainer}`,
        onClick: () => toggleNavBar(),
        children: /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: `${(NavTop_style_module_default()).burgerDiv}`,
          children: /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: (NavTop_style_module_default()).middle
          })
        })
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "sm",
        children: /*#__PURE__*/jsx_runtime_.jsx(Icon, {})
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: `${(NavTop_style_module_default()).brandIcon}`,
        onClick: e => e.stopPropagation(),
        children: router.pathname === "/" && /*#__PURE__*/jsx_runtime_.jsx("img", {
          src: "/svg/BrandLogo.svg"
        }) || /*#__PURE__*/jsx_runtime_.jsx(MyLink/* default */.Z, {
          href: "/",
          children: /*#__PURE__*/jsx_runtime_.jsx("img", {
            src: "/svg/BrandLogo.svg"
          })
        })
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: (NavTop_style_module_default()).linkContainer,
        children: menu.content.map(element => /*#__PURE__*/jsx_runtime_.jsx(Links, {
          title: element,
          elementData: menu[element] && menu[element] || []
        }, element))
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: `${(NavTop_style_module_default()).rightSection}`,
        children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
          className: `${(NavTop_style_module_default()).textSearch}`,
          onKeyDown: e => {
            e.key === "Enter" && handleClick(e);
          },
          children: /*#__PURE__*/jsx_runtime_.jsx("button", {
            className: "",
            children: /*#__PURE__*/jsx_runtime_.jsx("svg", {
              fill: "#000000",
              viewBox: "0 0 50 50",
              onClick: e => {
                e.stopPropagation();
                myWindow.setFocusOn("searchBar");
              },
              children: /*#__PURE__*/jsx_runtime_.jsx("path", {
                className: "",
                id: "svg",
                style: {
                  strokeDashoffset: myWindow.isFocused === "searchBar" ? 400 : 0
                },
                d: "M24.9105 27.7542L44.4856 42.2346L45.2356 41.2196L25.7646 26.8163L26.4219 25.8178C27.7312 23.8286 28.4932 21.4477 28.4932 18.885C28.4932 11.9137 22.8449 6.26227 15.8774 6.26227C8.90986 6.26227 3.26158 11.9137 3.26158 18.885C3.26158 25.8563 8.90986 31.5077 15.8774 31.5077C19.0419 31.5077 21.9316 30.3435 24.1467 28.4181L24.9105 27.7542ZM47 40.955L44.75 44L24.9741 29.3711C22.5382 31.4883 19.3574 32.77 15.8774 32.77C8.21311 32.77 2 26.5534 2 18.885C2 11.2165 8.21311 5 15.8774 5C23.5416 5 29.7547 11.2165 29.7547 18.885C29.7547 21.702 28.9163 24.3231 27.4755 26.512L47 40.955ZM27.2316 18.885C27.2316 25.1592 22.1481 30.2454 15.8774 30.2454C9.60661 30.2454 4.52316 25.1592 4.52316 18.885C4.52316 12.6108 9.60661 7.52454 15.8774 7.52454C22.1481 7.52454 27.2316 12.6108 27.2316 18.885ZM15.8774 28.9832C21.4514 28.9832 25.7646 24.462 25.7646 18.885C25.7646 13.3079 21.4514 8.78681 15.8774 8.78681C10.3034 8.78681 5.78474 13.3079 5.78474 18.885C5.78474 24.462 10.3034 28.9832 15.8774 28.9832Z"
              })
            })
          })
        }), ((_User$data = User.data) === null || _User$data === void 0 ? void 0 : _User$data.username) == "loading" && /*#__PURE__*/jsx_runtime_.jsx(loading/* default */.Z, {
          width: "50px",
          background: "var(--theme-color)",
          style: {
            margin: "7px"
          }
        }) || /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
          children: /*#__PURE__*/jsx_runtime_.jsx(Account, {})
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "big",
          children: [" ", /*#__PURE__*/jsx_runtime_.jsx(Icon, {})]
        })]
      })]
    })
  });
};

/* harmony default export */ const NavBar_NavTop = (NavTop);

const Links = ({
  title,
  elementData
}) => {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: `${(NavTop_style_module_default()).navLink}`,
    children: [/*#__PURE__*/jsx_runtime_.jsx(MyLink/* default */.Z, {
      href: {
        pathname: "/find",
        query: {
          categories: [title]
        }
      },
      className: (NavTop_style_module_default()).mainLink,
      children: title
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: `${(NavTop_style_module_default()).content}`,
      children: elementData.content && elementData.content.map((subHeaderelement, index) => /*#__PURE__*/(0,jsx_runtime_.jsxs)("ul", {
        className: (NavTop_style_module_default()).headerGroup,
        children: [/*#__PURE__*/jsx_runtime_.jsx("h2", {
          className: (NavTop_style_module_default()).subHeader,
          children: /*#__PURE__*/jsx_runtime_.jsx(MyLink/* default */.Z, {
            href: {
              pathname: "/find",
              query: {
                categories: [title, subHeaderelement]
              }
            },
            children: /*#__PURE__*/jsx_runtime_.jsx("a", {
              children: subHeaderelement
            })
          })
        }), elementData[subHeaderelement] && elementData[subHeaderelement].content.map(element => /*#__PURE__*/jsx_runtime_.jsx("li", {
          children: /*#__PURE__*/jsx_runtime_.jsx(MyLink/* default */.Z, {
            href: {
              pathname: "/find",
              query: {
                categories: [title, subHeaderelement, element]
              }
            },
            children: /*#__PURE__*/jsx_runtime_.jsx("h3", {
              children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
                children: [" ", element]
              })
            })
          })
        }, title + subHeaderelement + element))]
      }, subHeaderelement))
    })]
  });
};

const Icon = () => {
  const cart = (0,GlobalContext/* useCartContext */.iQ)();
  const {
    setToBottom
  } = useNavBarContext();
  const savedProduct = cart.savedProduct;
  (0,external_react_.useEffect)(() => {
    setToBottom(false);
  }, [savedProduct]);
  return /*#__PURE__*/jsx_runtime_.jsx("div", {
    className: "flex",
    style: {
      position: "relative",
      marginRight: "15px"
    },
    children: /*#__PURE__*/jsx_runtime_.jsx(MyLink/* default */.Z, {
      href: "/cart",
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: `${(NavTop_style_module_default()).bagIcon} flex center-children hidden-overflow`,
        children: [/*#__PURE__*/jsx_runtime_.jsx("img", {
          src: "/svg/bagIcon.svg"
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: `${(NavTop_style_module_default()).ItemsInCart} flex center-children`,
          children: /*#__PURE__*/jsx_runtime_.jsx("p", {
            children: savedProduct === null || savedProduct === void 0 ? void 0 : savedProduct.length
          })
        })]
      })
    })
  });
};

const Account = () => {
  var _User$data$username;

  const {
    toBottom
  } = useNavBarContext();
  const myWindow = (0,GlobalContext/* useMyWindow */.$9)();
  const User = (0,GlobalContext/* useUser */.aF)();
  const auth = (0,GlobalContext/* useAuthcontext */.BU)();
  const isFocused = myWindow.isFocused == "account";
  const spring = (0,external_react_spring_.useSpring)({
    transform: isFocused ? "translate(0%, 105%)" : "translate(100%, 105%)",
    opacity: isFocused ? "1" : "0",
    from: {
      transform: "scale(1) translateY(103%)",
      opacity: "0"
    },
    config: {
      tension: 210,
      friction: 20
    }
  });
  (0,external_react_.useEffect)(() => {
    if (myWindow.isFocused == "account") {
      myWindow.setFocusOn("none"); // the name here has no importance to the
    }
  }, [toBottom]);

  const handleClick = e => {
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
    response = await auth.axios.post("/api/auth/logout").catch(err => response = err);

    if (response.status === 200) {
      auth.setToken(undefined);
      User.setUserData(undefined);
    }
  };

  return /*#__PURE__*/jsx_runtime_.jsx("div", {
    className: "flex",
    children: /*#__PURE__*/jsx_runtime_.jsx("div", {
      tabIndex: 3,
      className: `${(NavTop_style_module_default()).bagIcon} ${(NavTop_style_module_default()).account} flex center-children hidden-overflow`,
      children: User.data && /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        onClick: handleClick,
        children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
          className: (NavTop_style_module_default()).userImage,
          children: /*#__PURE__*/jsx_runtime_.jsx("span", {
            children: (_User$data$username = User.data.username) === null || _User$data$username === void 0 ? void 0 : _User$data$username.slice(0, 1)
          })
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_spring_.animated.div, {
          style: _objectSpread(_objectSpread({}, spring), {}, {
            pointerEvents: isFocused ? "all" : "none"
          }),
          className: (NavTop_style_module_default()).rg_menu,
          children: [/*#__PURE__*/jsx_runtime_.jsx(MyLink/* default */.Z, {
            href: "/account",
            children: /*#__PURE__*/jsx_runtime_.jsx("div", {
              className: (NavTop_style_module_default()).user,
              children: /*#__PURE__*/jsx_runtime_.jsx("p", {
                children: "Account"
              })
            })
          }), User.hasAuthorization("seller") && /*#__PURE__*/jsx_runtime_.jsx(MyLink/* default */.Z, {
            href: "/upload",
            children: /*#__PURE__*/jsx_runtime_.jsx("div", {
              style: {
                margin: "var(--margin) 0"
              },
              children: /*#__PURE__*/jsx_runtime_.jsx("p", {
                children: "Upload item"
              })
            })
          }) || /*#__PURE__*/jsx_runtime_.jsx(MyLink/* default */.Z, {
            href: "/account",
            children: /*#__PURE__*/jsx_runtime_.jsx("div", {
              style: {
                margin: "var(--margin) 0"
              },
              children: /*#__PURE__*/jsx_runtime_.jsx("p", {
                children: "Become a seller"
              })
            })
          }), /*#__PURE__*/jsx_runtime_.jsx("hr", {}), /*#__PURE__*/jsx_runtime_.jsx("div", {
            onClick: handleLogout,
            children: /*#__PURE__*/jsx_runtime_.jsx("p", {
              className: (NavTop_style_module_default()).signOut,
              children: "sign Out"
            })
          })]
        })]
      }) || /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: (NavTop_style_module_default()).loginContainer,
        children: /*#__PURE__*/jsx_runtime_.jsx("button", {
          className: (NavTop_style_module_default()).register,
          onClick: e => {
            e.stopPropagation();
            myWindow.setHashLocation("#auth");
          },
          children: /*#__PURE__*/jsx_runtime_.jsx("p", {
            children: "connect"
          })
        })
      })
    })
  });
};
// EXTERNAL MODULE: ./component/Layout/NavBar/NavSide/style.module.scss
var NavSide_style_module = __webpack_require__(5399);
var NavSide_style_module_default = /*#__PURE__*/__webpack_require__.n(NavSide_style_module);
;// CONCATENATED MODULE: ./component/Layout/NavBar/NavSide/Navigation.js
// @ts-ignore







const littleLinkList = [{
  text: "a propos",
  to: "about"
}, {
  text: "nous contacter",
  to: "contact"
}, {
  text: "votre avis",
  to: "feedback"
}];

const Navigation = ({
  mainmenu,
  headers,
  title,
  index,
  visible,
  regression,
  updateSideBar,
  sideBarLocation,
  progressiveComeBack
}) => {
  const {
    sideBarIsOpen,
    toggleNavBar
  } = useNavBarContext();
  const animate = (0,external_react_spring_.useTransition)(visible, {
    from: {
      transform: "translateX(100%)"
    },
    enter: {
      transform: "translateX(0%)"
    },
    leave: {
      transform: "translateX(100%)"
    },
    config: external_react_spring_.config.stiff
  });
  return animate((_styles, visible) => visible && /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_spring_.animated.div, {
    className: `${(NavSide_style_module_default()).navigation} vertical-flex container no-shrink`,
    style: _styles,
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: `${(NavSide_style_module_default()).headerSection} flex align-center`,
      children: [!mainmenu && /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: `${(NavSide_style_module_default()).backArrow} flex center-children`,
        onClick: () => regression()
      }), /*#__PURE__*/jsx_runtime_.jsx("h4", {
        className: "flex-center",
        onClick: () => progressiveComeBack(0),
        children: title
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: `${(NavSide_style_module_default()).croxSection} flex center-children pointer`,
        onClick: () => toggleNavBar(),
        children: /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: `${(NavSide_style_module_default()).burger} ${sideBarIsOpen && (NavSide_style_module_default()).open}`
        })
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: `${(NavSide_style_module_default()).linkSection}`,
      children: headers.map(({
        label,
        hasDescendant
      }) => hasDescendant ? /*#__PURE__*/jsx_runtime_.jsx("div", {
        onClick: () => updateSideBar(label, index),
        className: `max-width flex pointer align-center ${(NavSide_style_module_default()).linkContainer} `,
        children: /*#__PURE__*/jsx_runtime_.jsx(MyLink/* default */.Z, {
          href: {
            pathname: "/find",
            query: {
              categories: [...sideBarLocation.slice(index - 1, index), label]
            }
          },
          children: /*#__PURE__*/jsx_runtime_.jsx("div", {
            onClick: () => toggleNavBar(),
            className: `flex align-center`,
            children: /*#__PURE__*/jsx_runtime_.jsx("a", {
              children: label
            })
          })
        })
      }, label) : /*#__PURE__*/jsx_runtime_.jsx(MyLink/* default */.Z, {
        href: {
          pathname: "/find",
          query: {
            categories: [...sideBarLocation.slice(1, index + 1), label]
          }
        },
        children: /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: `max-width flex pointer align-center ${(NavSide_style_module_default()).linkContainer}`,
          onClick: () => toggleNavBar(),
          children: /*#__PURE__*/jsx_runtime_.jsx("a", {
            children: label
          })
        })
      }, label))
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: (NavSide_style_module_default()).footer,
      children: /*#__PURE__*/jsx_runtime_.jsx("ul", {
        children: littleLinkList.map(({
          text,
          to
        }) => /*#__PURE__*/jsx_runtime_.jsx(MyLink/* default */.Z, {
          href: `/${to}`,
          children: /*#__PURE__*/jsx_runtime_.jsx("li", {
            onClick: () => toggleNavBar(),
            children: text
          })
        }, text))
      })
    })]
  }));
};

/* harmony default export */ const NavSide_Navigation = (/*#__PURE__*/(0,external_react_.memo)(Navigation));
;// CONCATENATED MODULE: ./component/Layout/NavBar/NavSide/index.tsx
// @ts-ignore









const END_POINT = "END_POINT";

const formatLocation = (object, index) => {
  const content = object.content.map(element => {
    return {
      label: element,
      hasDescendant: object[element] ? true : false
    };
  });
  return {
    title: object.title,
    content,
    index
  };
};

const getHeaders = (navContentTodDisplay, _location) => {
  const location = _location;
  let result = navContentTodDisplay[location[0]] || navContentTodDisplay["menu"];
  let side_pages = [formatLocation(result, 0)];

  for (let i = 1; i < location.length; i++) {
    let _result = result[location[i]];

    if (_result) {
      result = _result;
      side_pages.push(formatLocation(result, i));
    } else break;
  }

  return side_pages;
};

const index = () => {
  const {
    0: positionIndex,
    1: setPositionIndex
  } = (0,external_react_.useState)(0);
  const {
    sideBarIsOpen,
    toggleNavBar
  } = useNavBarContext();
  const {
    0: sideBarLocation,
    1: setSideBarLocation
  } = (0,external_react_.useState)(["menu"]);
  const myWindow = (0,GlobalContext/* useMyWindow */.$9)();

  const updateSideBar = (update, index) => {
    setSideBarLocation(prevState => {
      let temp = [...prevState];
      temp[index + 1] = update;
      return temp;
    });
    setPositionIndex(prevState => prevState + 1);
  };

  const progressiveComeBack = (index, prevIndex) => {
    var newIndex;
    setPositionIndex(prevState => {
      if (prevState < 1 || prevIndex != undefined && prevState != prevIndex) return prevState;
      newIndex = prevState - 1;
      return prevState - 1;
    });

    if (newIndex && newIndex > index) {
      setTimeout(() => progressiveComeBack(index, newIndex), 500);
    }
  };

  const regressSideBar = () => {
    setPositionIndex(prevState => {
      if (prevState < 1) return prevState;
      return prevState - 1;
    });
  };

  const sideBarPages = (0,external_react_.useMemo)(() => getHeaders(navBarSections/* navBarSections */.Mk, sideBarLocation), [sideBarLocation]);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
      className: `${(NavSide_style_module_default()).overlay} ${myWindow.overlay.isOpen && (NavSide_style_module_default()).open}`,
      onClick: () => myWindow.overlay.close()
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: `flex
        ${(NavSide_style_module_default()).sideBar}
        ${sideBarIsOpen && (NavSide_style_module_default()).open}`,
      children: sideBarPages.map(page => /*#__PURE__*/jsx_runtime_.jsx(NavSide_Navigation, {
        index: page.index,
        title: page.title,
        regression: regressSideBar,
        updateSideBar: updateSideBar,
        mainmenu: page.title === "menu",
        sideBarLocation: sideBarLocation,
        visible: positionIndex >= page.index,
        headers: page.content || [END_POINT],
        progressiveComeBack: progressiveComeBack
      }, page.title))
    })]
  });
};

/* harmony default export */ const NavSide = (/*#__PURE__*/(0,external_react_.memo)(index));
// EXTERNAL MODULE: ./component/Layout/NavBar/style.module.scss
var NavBar_style_module = __webpack_require__(1945);
var NavBar_style_module_default = /*#__PURE__*/__webpack_require__.n(NavBar_style_module);
// EXTERNAL MODULE: ./component/Layout/NavBar/SearchBar/style.module.scss
var SearchBar_style_module = __webpack_require__(7388);
var SearchBar_style_module_default = /*#__PURE__*/__webpack_require__.n(SearchBar_style_module);
// EXTERNAL MODULE: ./component/Inputs/NormalInput/index.tsx
var NormalInput = __webpack_require__(8977);
;// CONCATENATED MODULE: ./component/Layout/NavBar/SearchBar/index.tsx
// @ts-ignore











const SearchBar = () => {
  const router = (0,router_.useRouter)();
  const myWindow = (0,GlobalContext/* useMyWindow */.$9)();
  const {
    toBottom
  } = useNavBarContext();
  const visible = myWindow.isFocused === "searchBar" && !toBottom;
  const {
    0: inputValue,
    1: setInputValue
  } = (0,external_react_.useState)({
    search_query: ""
  });
  const {
    0: isCompletelyVisible,
    1: setIsCompleteVisible
  } = (0,external_react_.useState)(false);
  const springAnimate = (0,external_react_spring_.useSpring)({
    from: {
      transform: "translate(0%,-100%)"
    },
    transform: visible && "translate(0%, 100%)" || "translate(0%,-100%)",
    onRest: () => {
      setIsCompleteVisible(visible);
    }
  });

  const handleClick = e => {
    if (inputValue.search_query.length === 0) return;
    router.push(`/find?categories=search&&categories=${inputValue.search_query}`);
  };

  (0,external_react_.useEffect)(() => {
    if (visible) document.getElementById("search_query").focus();
  }, [visible]);
  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: /*#__PURE__*/jsx_runtime_.jsx(external_react_spring_.animated.div, {
      className: ` big-container ${(SearchBar_style_module_default()).wrapper}`,
      onClick: e => e.stopPropagation(),
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_spring_.animated.div, {
        style: springAnimate,
        className: (SearchBar_style_module_default()).inputContainer,
        onKeyDown: e => e.key === "Enter" && handleClick(e),
        children: [/*#__PURE__*/jsx_runtime_.jsx(NormalInput/* default */.Z, {
          required: false,
          name: "search_query",
          placeholder: "chercher",
          inputValue: inputValue,
          setInputValue: setInputValue
        }), /*#__PURE__*/jsx_runtime_.jsx("svg", {
          fill: "#000000",
          viewBox: "0 0 50 50",
          onClick: handleClick,
          children: /*#__PURE__*/jsx_runtime_.jsx("path", {
            style: {
              strokeDashoffset: !visible && "400" || isCompletelyVisible && "0" || "400"
            },
            d: "M24.9105 27.7542L44.4856 42.2346L45.2356 41.2196L25.7646 26.8163L26.4219 25.8178C27.7312 23.8286 28.4932 21.4477 28.4932 18.885C28.4932 11.9137 22.8449 6.26227 15.8774 6.26227C8.90986 6.26227 3.26158 11.9137 3.26158 18.885C3.26158 25.8563 8.90986 31.5077 15.8774 31.5077C19.0419 31.5077 21.9316 30.3435 24.1467 28.4181L24.9105 27.7542ZM47 40.955L44.75 44L24.9741 29.3711C22.5382 31.4883 19.3574 32.77 15.8774 32.77C8.21311 32.77 2 26.5534 2 18.885C2 11.2165 8.21311 5 15.8774 5C23.5416 5 29.7547 11.2165 29.7547 18.885C29.7547 21.702 28.9163 24.3231 27.4755 26.512L47 40.955ZM27.2316 18.885C27.2316 25.1592 22.1481 30.2454 15.8774 30.2454C9.60661 30.2454 4.52316 25.1592 4.52316 18.885C4.52316 12.6108 9.60661 7.52454 15.8774 7.52454C22.1481 7.52454 27.2316 12.6108 27.2316 18.885ZM15.8774 28.9832C21.4514 28.9832 25.7646 24.462 25.7646 18.885C25.7646 13.3079 21.4514 8.78681 15.8774 8.78681C10.3034 8.78681 5.78474 13.3079 5.78474 18.885C5.78474 24.462 10.3034 28.9832 15.8774 28.9832Z"
          })
        })]
      })
    })
  });
};

/* harmony default export */ const NavBar_SearchBar = (/*#__PURE__*/(0,external_react_.memo)(SearchBar));
;// CONCATENATED MODULE: ./component/Layout/NavBar/index.tsx

 // @ts-ignore








const R_NavBar = () => {
  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: `${(NavBar_style_module_default()).navigation} max-width`,
      children: [/*#__PURE__*/jsx_runtime_.jsx(NavBar_NavTop, {}), /*#__PURE__*/jsx_runtime_.jsx(NavSide, {}), /*#__PURE__*/jsx_runtime_.jsx(NavBar_SearchBar, {})]
    })
  });
};

const NavBar_Navigation = () => {
  return /*#__PURE__*/jsx_runtime_.jsx(navBarContext, {
    children: /*#__PURE__*/jsx_runtime_.jsx(R_NavBar, {})
  });
};

/* harmony default export */ const NavBar = (NavBar_Navigation);
// EXTERNAL MODULE: ./component/Layout/Footer/style.module.scss
var Footer_style_module = __webpack_require__(9078);
var Footer_style_module_default = /*#__PURE__*/__webpack_require__.n(Footer_style_module);
;// CONCATENATED MODULE: ./component/Layout/Footer/index.tsx
// @ts-ignore





const Footer_index = () => {
  return /*#__PURE__*/jsx_runtime_.jsx("footer", {
    className: `${(Footer_style_module_default()).loop} flex max-width center-children`,
    style: {
      marginTop: "50px"
    },
    children: /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "big-container  ",
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: `${(Footer_style_module_default()).footerContainer}`,
        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: `${(Footer_style_module_default()).footerHeader} flex`,
          children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
            className: `${(Footer_style_module_default()).brandName}`,
            children: "Moment"
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: `${(Footer_style_module_default()).Icons}`
          })]
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: `${(Footer_style_module_default()).footerBody}`,
          children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("ul", {
            className: (Footer_style_module_default()).footerLink,
            children: [/*#__PURE__*/jsx_runtime_.jsx("li", {
              children: /*#__PURE__*/jsx_runtime_.jsx("h3", {
                children: "Links"
              })
            }), /*#__PURE__*/jsx_runtime_.jsx("li", {
              children: "Feedback"
            }), /*#__PURE__*/jsx_runtime_.jsx("li", {
              children: "About Us "
            }), /*#__PURE__*/jsx_runtime_.jsx("li", {
              children: "Contact Us"
            }), /*#__PURE__*/jsx_runtime_.jsx("li", {
              children: "More Informatioins"
            })]
          }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("ul", {
            className: (Footer_style_module_default()).footerLink,
            children: [/*#__PURE__*/jsx_runtime_.jsx("li", {
              children: /*#__PURE__*/jsx_runtime_.jsx("h3", {
                children: "Our Product"
              })
            }), /*#__PURE__*/jsx_runtime_.jsx("li", {
              children: "dolor sit amet"
            }), /*#__PURE__*/jsx_runtime_.jsx("li", {
              children: "adipiscing elit"
            }), /*#__PURE__*/jsx_runtime_.jsx("li", {
              children: "Vivamus sollicitudin"
            }), /*#__PURE__*/jsx_runtime_.jsx("li", {
              children: "Aliquam elementum turpis"
            }), /*#__PURE__*/jsx_runtime_.jsx("li", {
              children: "Aenean iaculis "
            })]
          }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("ul", {
            className: (Footer_style_module_default()).footerLink,
            children: [/*#__PURE__*/jsx_runtime_.jsx("li", {
              children: /*#__PURE__*/jsx_runtime_.jsx("h3", {
                children: "Links"
              })
            }), /*#__PURE__*/jsx_runtime_.jsx("li", {
              children: "Quisque vel neque"
            }), /*#__PURE__*/jsx_runtime_.jsx("li", {
              children: "vitae blandit aliquam"
            }), /*#__PURE__*/jsx_runtime_.jsx("li", {
              children: "Mauris ullamcorper"
            }), /*#__PURE__*/jsx_runtime_.jsx("li", {
              children: "vitae blandit"
            }), /*#__PURE__*/jsx_runtime_.jsx("li", {
              children: "fringilla molestie"
            })]
          })]
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: `${(Footer_style_module_default()).footerBottom}`,
          children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
            children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
              children: "posuere ligula"
            }), /*#__PURE__*/jsx_runtime_.jsx("span", {
              children: "Pellentesque dictum"
            }), /*#__PURE__*/jsx_runtime_.jsx("span", {
              children: "finibus libero"
            }), /*#__PURE__*/jsx_runtime_.jsx("span", {
              children: "Morbi convallis felis"
            })]
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            children: "@ ALiquam sit"
          })]
        })]
      })
    })
  });
};

/* harmony default export */ const Footer = (/*#__PURE__*/(0,external_react_.memo)(Footer_index));
// EXTERNAL MODULE: ./component/Layout/Auth/style.module.scss
var Auth_style_module = __webpack_require__(2557);
var Auth_style_module_default = /*#__PURE__*/__webpack_require__.n(Auth_style_module);
// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(2376);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
;// CONCATENATED MODULE: ./component/Layout/Auth/TPLogin.tsx
//@ts-ignore






function TPLogin({
  setEditState
}) {
  // const [google_url, setGoogle_url] = useState();
  const User = (0,GlobalContext/* useUser */.aF)();
  const auth = (0,GlobalContext/* useAuthcontext */.BU)();
  const myWindow = (0,GlobalContext/* useMyWindow */.$9)();

  const handleGoogleClick = () => {
    localStorage.setItem("meta_64", "0");
    const checker = setInterval(async () => {
      if (localStorage.getItem("meta_64") == "1") {
        clearInterval(checker);
        User.setUserData({
          username: "loading"
        });
        myWindow.setHashLocation("");
        await auth.getNewToken();
        User.refresh();
      }
    }, 1000);
  };

  const handleFacebookLogin = async () => {
    const {
      authResponse,
      status
    } = await new Promise((resolve, reject) => {
      //@ts-ignore
      window.FB.getLoginStatus(response => resolve(response));
    });

    const act = async authResponse => {
      User.setUserData({
        username: "loading"
      });
      myWindow.setHashLocation("");
      const response = await external_axios_default().post(`/api/auth/facebook`, {
        accessToken: authResponse.accessToken
      });
      const data = response.data;
      User.setUserData(data.userData);
      auth.setToken(data.token);
    };

    if (status == "connected") {
      act(authResponse);
    } else {
      //@ts-ignore
      window.FB.login(response => {
        act(response.authResponse);
      });
    }
  };

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: (Auth_style_module_default()).TPContainer,
    children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
      className: (Auth_style_module_default()).TPheader,
      children: /*#__PURE__*/jsx_runtime_.jsx("span", {
        children: "or"
      })
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: (Auth_style_module_default()).TPcontent,
      children: [/*#__PURE__*/jsx_runtime_.jsx("a", {
        href: `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&response_type=code&client_id=799043813636-6752mpc2el076am9cckotrocrs0b814d.apps.googleusercontent.com&redirect_uri=${window.location.origin}/api/auth/google`,
        target: "blank",
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: (Auth_style_module_default()).alternative,
          onClick: handleGoogleClick,
          children: [/*#__PURE__*/jsx_runtime_.jsx("img", {
            src: "/svg/google_icon.svg",
            id: "google_icon",
            alt: "login using coogle"
          }), /*#__PURE__*/jsx_runtime_.jsx("label", {
            htmlFor: "google_icon",
            children: "Google"
          })]
        })
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: (Auth_style_module_default()).alternative,
        onClick: handleFacebookLogin,
        children: [/*#__PURE__*/jsx_runtime_.jsx("img", {
          src: "/svg/facebook_icon.svg",
          id: "google_icon",
          alt: "login using coogle"
        }), /*#__PURE__*/jsx_runtime_.jsx("label", {
          htmlFor: "google_icon",
          children: "Facebook"
        })]
      })]
    })]
  });
}

/* harmony default export */ const Auth_TPLogin = (TPLogin);
;// CONCATENATED MODULE: ./component/Layout/Auth/validator.ts
const validatePassword = password => {
  let error = [];

  if (!password || password.length < 5) {
    error.push("password is to shord");
  }

  return error;
};
const validateUsername = username => {
  let error = [];

  if (!username || username.length < 5) {
    error.push("userName is to short");
  }

  return error;
};
// EXTERNAL MODULE: ./shared/shared_functions.ts
var shared_functions = __webpack_require__(5962);
// EXTERNAL MODULE: ./component/CaptChat/index.tsx
var CaptChat = __webpack_require__(6726);
;// CONCATENATED MODULE: ./component/Layout/Auth/login.tsx














const Login = ({
  inputValue,
  setInputValue,
  setHeight,
  active,
  setActive
}) => {
  const {
    0: error,
    1: setError
  } = (0,external_react_.useState)({});
  const {
    0: editState,
    1: setEditState
  } = (0,external_react_.useState)("login");
  const User = (0,GlobalContext/* useUser */.aF)();
  const auth = (0,GlobalContext/* useAuthcontext */.BU)();
  const myWindow = (0,GlobalContext/* useMyWindow */.$9)();

  const handleSubmit = async () => {
    const data = {
      username: inputValue["user name"],
      password: inputValue["password"]
    };
    const error_password = validatePassword(data.password);
    const error_username = validateUsername(data.username);

    if (error_password || error_username) {
      setError({
        password: error_password,
        username: error_username
      });
    }

    setEditState("loading");
    await (0,shared_functions/* add_captchat_token */.Xf)(data);
    const loginResponse = await external_axios_default().post("/api/auth/login", data).catch(err => {
      setError({
        global: err.response.data.message
      });
    });

    if (loginResponse && loginResponse.data.userData) {
      const {
        token,
        userData,
        expiresAt
      } = loginResponse.data;
      User.setUserData(userData);
      auth.setToken({
        value: token,
        expiresAt
      });
      setEditState("success");
      window.history.go(-1);
    } else setEditState("failure");
  };

  const transition = (0,external_react_spring_.useTransition)(active, {
    enter: {
      x: "0%"
    },
    leave: {
      x: "100%"
    },
    from: {
      x: "100%"
    } // config: config.stiff,

  }); // console.log(myWindow.isFocused, "what is showing on the window")

  const myRef = (0,external_react_.useRef)();
  (0,external_react_.useEffect)(() => {
    if (active) {
      //@ts-ignore
      setHeight(myRef.current.clientHeight);
    }
  }, [active, error, myWindow.size]);
  return transition((style, condition) => condition && /*#__PURE__*/jsx_runtime_.jsx(external_react_spring_.animated.div, {
    style: style,
    className: (Auth_style_module_default()).formContainer,
    ref: myRef,
    id: "#login",
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: (Auth_style_module_default())._formContainer,
      children: [/*#__PURE__*/jsx_runtime_.jsx("h3", {
        children: " Se connecter a KdShop"
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("form", {
        className: (Auth_style_module_default()).loginForm,
        children: [/*#__PURE__*/jsx_runtime_.jsx(NormalInput/* default */.Z, {
          name: "user name",
          required: true,
          inputValue: inputValue,
          setInputValue: setInputValue,
          defaultValue: inputValue["user name"]
        }), /*#__PURE__*/jsx_runtime_.jsx(NormalInput/* default */.Z, {
          type: "password",
          name: "password",
          required: true,
          allowCapitalCase: true,
          inputValue: inputValue,
          setInputValue: setInputValue,
          defaultValue: inputValue["password"]
        }), /*#__PURE__*/jsx_runtime_.jsx(CaptChat/* default */.Z, {})]
      }), //@ts-ignore
      error.global &&
      /*#__PURE__*/
      //@ts-ignore
      (0,jsx_runtime_.jsxs)("div", {
        className: (Auth_style_module_default()).error,
        children: ["*", error.global]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("button", {
        className: (Auth_style_module_default()).validate,
        onClick: handleSubmit,
        children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
          children: "Login"
        }), /*#__PURE__*/jsx_runtime_.jsx(loading/* default */.Z, {
          width: editState == "loading" ? "4em" : "0"
        })]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: (Auth_style_module_default()).else,
        onClick: () => setActive("register"),
        children: [/*#__PURE__*/jsx_runtime_.jsx("p", {
          children: "Vous n'avez pas encore de compte?"
        }), /*#__PURE__*/jsx_runtime_.jsx("span", {
          children: "creer un compte graduit."
        })]
      }), /*#__PURE__*/jsx_runtime_.jsx(Auth_TPLogin, {
        setEditState: setEditState
      })]
    })
  }));
};

/* harmony default export */ const login = (Login);
;// CONCATENATED MODULE: ./component/Layout/Auth/register.tsx













const Register = ({
  inputValue,
  setInputValue,
  setHeight,
  active,
  setActive
}) => {
  const {
    0: error,
    1: setError
  } = (0,external_react_.useState)({});
  const {
    0: editState,
    1: setEditState
  } = (0,external_react_.useState)("register");
  const User = (0,GlobalContext/* useUser */.aF)();
  const auth = (0,GlobalContext/* useAuthcontext */.BU)();
  const myWindow = (0,GlobalContext/* useMyWindow */.$9)();

  const handleSubmit = async () => {
    const data = {
      username: inputValue["username"],
      password: inputValue["password"],
      lastName: inputValue["Last Name"],
      firstName: inputValue["First Name"]
    };
    setError({});
    const error_password = validatePassword(data.password);
    const error_username = validateUsername(data.username);

    if (error_password.length > 0 || error_username.length > 0) {
      return setError({
        password: error_password,
        username: error_username
      });
    }

    setEditState("loading");
    await (0,shared_functions/* add_captchat_token */.Xf)(data);
    const registerResponse = await external_axios_default().post("/api/auth/register", data).catch(err => setError({
      username: [err.response.data.message]
    }));

    if (registerResponse && registerResponse.data.userData) {
      const {
        token,
        userData,
        expiresAt
      } = registerResponse.data;
      User.setUserData(userData);
      auth.setToken({
        value: token,
        expiresAt
      });
      setEditState("success");
      window.history.go(-1);
    } else setEditState("failure");
  };

  const transition = (0,external_react_spring_.useTransition)(active, {
    enter: {
      x: "0%"
    },
    leave: {
      x: "100%"
    },
    from: {
      x: "100%"
    } // config: config.stiff,

  });
  const myRef = (0,external_react_.useRef)();
  (0,external_react_.useEffect)(() => {
    if (active) {
      //@ts-ignore
      setHeight(myRef.current.clientHeight);
    }
  }, [active, error, myWindow.size]);
  return transition((style, condition) => condition && /*#__PURE__*/jsx_runtime_.jsx(external_react_spring_.animated.div, {
    style: style,
    className: (Auth_style_module_default()).formContainer,
    ref: myRef,
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: (Auth_style_module_default())._formContainer,
      children: [/*#__PURE__*/jsx_runtime_.jsx("h3", {
        children: " Creer a compte gratuit !"
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("form", {
        className: (Auth_style_module_default()).registerForm,
        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: (Auth_style_module_default()).two,
          children: [/*#__PURE__*/jsx_runtime_.jsx(NormalInput/* default */.Z, {
            error: error,
            required: true,
            label: "prenom",
            name: "First Name",
            inputValue: inputValue,
            allowCapitalCase: true,
            setInputValue: setInputValue,
            defaultValue: inputValue["First Name"]
          }), /*#__PURE__*/jsx_runtime_.jsx(NormalInput/* default */.Z, {
            error: error,
            required: true,
            label: "non de famille",
            name: "Last Name",
            inputValue: inputValue,
            allowCapitalCase: true,
            setInputValue: setInputValue,
            defaultValue: inputValue["Last Name"]
          })]
        }), /*#__PURE__*/jsx_runtime_.jsx(NormalInput/* default */.Z, {
          error: error,
          name: "username",
          label: "nom d'utilisateur",
          required: true,
          inputValue: inputValue,
          setInputValue: setInputValue,
          defaultValue: inputValue["username"]
        }), /*#__PURE__*/jsx_runtime_.jsx(NormalInput/* default */.Z, {
          error: error,
          type: "password",
          name: "password",
          required: true,
          label: "mot de passe",
          allowCapitalCase: true,
          inputValue: inputValue,
          setInputValue: setInputValue,
          defaultValue: inputValue["password"]
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: (Auth_style_module_default()).terms,
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
            children: ["En creant un compte vous accepter", /*#__PURE__*/jsx_runtime_.jsx("span", {
              children: "condition d'utilisations"
            }), " et politique de confidentialit\xE9"]
          })
        })]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("button", {
        className: (Auth_style_module_default()).validate,
        onClick: handleSubmit,
        children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
          children: "Creer mon compte"
        }), /*#__PURE__*/jsx_runtime_.jsx(loading/* default */.Z, {
          width: editState == "loading" ? "4em" : "0"
        })]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: (Auth_style_module_default()).else,
        onClick: () => setActive("login"),
        children: [/*#__PURE__*/jsx_runtime_.jsx("p", {
          children: "Vous avez deja un compte"
        }), /*#__PURE__*/jsx_runtime_.jsx("span", {
          children: "conectez vous a votre compte"
        })]
      }), /*#__PURE__*/jsx_runtime_.jsx(Auth_TPLogin, {
        setEditState: setEditState
      })]
    })
  }));
};

/* harmony default export */ const register = (Register);
;// CONCATENATED MODULE: ./component/Layout/Auth/index.tsx
function Auth_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function Auth_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { Auth_ownKeys(Object(source), true).forEach(function (key) { Auth_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { Auth_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Auth_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// @ts-ignore










const Auth_index = () => {
  const {
    0: inputValue,
    1: setInputValue
  } = (0,external_react_.useState)({});
  const {
    0: height,
    1: setHeight
  } = (0,external_react_.useState)(400);
  const myWindow = (0,GlobalContext/* useMyWindow */.$9)();
  const dummyRef = (0,external_react_.useRef)(0);
  const {
    0: visible,
    1: setVisible
  } = (0,external_react_.useState)(false);
  const {
    0: active,
    1: setActive
  } = (0,external_react_.useState)("");
  const [animateHeight, animateApi] = (0,external_react_spring_.useSpring)(() => ({
    height: 400
  }));
  (0,external_react_.useEffect)(() => {
    animateApi.start({
      height: height
    });
  }, [height]);
  (0,external_react_.useEffect)(() => {
    if (myWindow.hashLocation === "#auth") {
      setVisible(true);
      setActive("login");
    } else {
      const id = dummyRef.current;
      setActive("");
      setTimeout(() => {
        if (id == dummyRef.current) {
          setVisible(false);
        }
      }, 200);
    }
  }, [myWindow.hashLocation]);
  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: `${(Auth_style_module_default()).prompt} ${myWindow.hashLocation === "" && (Auth_style_module_default()).closed}`,
      style: {
        zIndex: visible ? 3 : -5
      },
      onClick: e => e.stopPropagation(),
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_spring_.animated.div, {
        style: Auth_objectSpread({}, animateHeight),
        children: [/*#__PURE__*/jsx_runtime_.jsx(register, {
          inputValue: inputValue,
          setInputValue: setInputValue,
          setHeight: setHeight,
          active: active === "register",
          setActive: setActive
        }), /*#__PURE__*/jsx_runtime_.jsx(login, {
          inputValue: inputValue,
          setInputValue: setInputValue,
          setHeight: setHeight,
          active: active === "login",
          setActive: setActive
        })]
      })
    })
  });
};

/* harmony default export */ const Auth = (/*#__PURE__*/(0,external_react_.memo)(Auth_index));
;// CONCATENATED MODULE: ./component/Layout/Facebook/index.tsx
//@ts-nocheck





const Facebook = () => {
  (0,external_react_.useEffect)(() => {
    if (!document || !window) return;
    console.log("The initializer ran");

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "971187146826531",
        cookie: true,
        xfbml: true,
        version: "v12.0"
      });
      window.FB.AppEvents.logPageView();
    };
  }, []);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
      id: "fb-root"
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      id: "fb-customer-chat",
      attribution: "biz_inbox",
      page_id: "104940965341501",
      className: "fb-customerchat"
    })]
  });
};

/* harmony default export */ const Layout_Facebook = (Facebook);
;// CONCATENATED MODULE: ./component/Layout/index.tsx








 // import {compare } from 





function Layout_index({
  children
}) {
  const router = (0,router_.useRouter)();
  const myWindow = (0,GlobalContext/* useMyWindow */.$9)();
  const old_url = (0,external_react_.useRef)({
    query: {},
    pathname: ""
  });
  (0,external_react_.useEffect)(() => {
    if (router.pathname != old_url.current.pathname || !(0,shared_functions/* compare */.qu)(router.query, old_url.current.query)) {
      document.getElementById("__next").scroll(0, 0);
      old_url.current = {
        query: router.query,
        pathname: router.pathname
      };
    }

    myWindow.setPhase("fadeIn");
  }, [children]);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(NavBar, {}), /*#__PURE__*/jsx_runtime_.jsx(Auth, {}), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "flex center-children",
      style: {
        position: "relative"
      },
      children: /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: `${(style_module_default())[myWindow.phase]} ${(style_module_default()).bigContainer} big-container`,
        children: children
      })
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: (style_module_default())[myWindow.phase],
      children: [/*#__PURE__*/jsx_runtime_.jsx(Footer, {}), /*#__PURE__*/jsx_runtime_.jsx(Layout_Facebook, {})]
    })]
  });
}

/* harmony default export */ const Layout = (Layout_index);
;// CONCATENATED MODULE: ./pages/_app.tsx
function _app_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _app_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { _app_ownKeys(Object(source), true).forEach(function (key) { _app_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { _app_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _app_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








function MyApp({
  Component,
  pageProps
}) {
  return /*#__PURE__*/jsx_runtime_.jsx(GlobalContext/* default */.ZP, {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(Layout, {
      children: [/*#__PURE__*/jsx_runtime_.jsx((script_default()), {
        async: true,
        defer: true,
        crossOrigin: "anonymous",
        src: "https://connect.facebook.net/en_US/sdk.js"
      }), /*#__PURE__*/jsx_runtime_.jsx((script_default()), {
        async: true,
        defer: true,
        src: "https://connect.facebook.net/fr_FR/sdk/xfbml.customerchat.js"
      }), /*#__PURE__*/jsx_runtime_.jsx((script_default()), {
        async: true,
        defer: true,
        src: `https://www.google.com/recaptcha/api.js?render=${"6Lc-lUMdAAAAALrqJdMgC82t5NuX9BfPXfk2aGyP"}`
      }), /*#__PURE__*/jsx_runtime_.jsx(Component, _app_objectSpread({}, pageProps))]
    })
  });
}

/* harmony default export */ const _app = (MyApp);

/***/ }),

/***/ 9940:
/***/ ((module) => {

// Exports
module.exports = {
	"captchat": "style_captchat__2i3ZI"
};


/***/ }),

/***/ 2557:
/***/ ((module) => {

// Exports
module.exports = {
	"error": "style_error__2hFfj",
	"prompt": "style_prompt__ImPrz",
	"closed": "style_closed__3khTO",
	"loginForm": "style_loginForm__OBf2s",
	"two": "style_two__16j89",
	"validate": "style_validate__1CNJK",
	"else": "style_else__33YY0",
	"formContainer": "style_formContainer__2snoO",
	"_formContainer": "style__formContainer__2PDJ2",
	"terms": "style_terms__3x9BS",
	"spinner": "style_spinner__3xA32",
	"spin": "style_spin__1IC6T",
	"TPContainer": "style_TPContainer__I4bvd",
	"TPheader": "style_TPheader__2axEm",
	"TPcontent": "style_TPcontent__35fV4",
	"alternative": "style_alternative__38R3e"
};


/***/ }),

/***/ 9078:
/***/ ((module) => {

// Exports
module.exports = {
	"footerContainer": "style_footerContainer__P-w0B",
	"footerHeader": "style_footerHeader__s33za",
	"brandName": "style_brandName__3F92G",
	"Icons": "style_Icons__21T1f",
	"footerBody": "style_footerBody__3zfKQ",
	"footerLink": "style_footerLink__1jRuK",
	"footerBottom": "style_footerBottom__JEy0e"
};


/***/ }),

/***/ 5399:
/***/ ((module) => {

// Exports
module.exports = {
	"sideBar": "style_sideBar__1CGFD",
	"open": "style_open__2KMIy",
	"overlay": "style_overlay__2MvMI",
	"navigation": "style_navigation__3cYTl",
	"headerSection": "style_headerSection__1I4-U",
	"croxSection": "style_croxSection__1Np2i",
	"backArrow": "style_backArrow__1d7oh",
	"burger": "style_burger__c237P",
	"linkSection": "style_linkSection__2-C-c",
	"linkContainer": "style_linkContainer__2veM8",
	"footer": "style_footer__Mfl3q"
};


/***/ }),

/***/ 8378:
/***/ ((module) => {

// Exports
module.exports = {
	"navTop": "style_navTop__3_kew",
	"hidden": "style_hidden__1Vdbv",
	"burgerDiv": "style_burgerDiv__1y0-2",
	"middle": "style_middle__-SMgR",
	"brandIcon": "style_brandIcon__1WaEr",
	"bagIcon": "style_bagIcon__2Uh6C",
	"account": "style_account__2v0-U",
	"ItemsInCart": "style_ItemsInCart__oEFIv",
	"rightSection": "style_rightSection__5Sydi",
	"textSearch": "style_textSearch__HRSDj",
	"inputWrapper": "style_inputWrapper__9cU8d",
	"focus": "style_focus__2NKfo",
	"navLink": "style_navLink__1oOYW",
	"mainLink": "style_mainLink__3t4rf",
	"content": "style_content__3PlBH",
	"headerGroup": "style_headerGroup__1gWrZ",
	"burgerDivContainer": "style_burgerDivContainer__1ioKu",
	"linkContainer": "style_linkContainer___tjp8",
	"rg_menu": "style_rg_menu__1hrx5",
	"login": "style_login__3y-qM",
	"register": "style_register__2MiBU",
	"user": "style_user__1vo9I",
	"signOut": "style_signOut__3vHyK",
	"userImage": "style_userImage__1jg9l"
};


/***/ }),

/***/ 7388:
/***/ ((module) => {

// Exports
module.exports = {
	"wrapper": "style_wrapper__2vWUh",
	"inputContainer": "style_inputContainer__2F3cI"
};


/***/ }),

/***/ 1945:
/***/ ((module) => {

// Exports
module.exports = {
	"navigation": "style_navigation__ht3VW",
	"annoncement": "style_annoncement__1-0IQ"
};


/***/ }),

/***/ 4287:
/***/ ((module) => {

// Exports
module.exports = {
	"bigContainer": "style_bigContainer__210sT",
	"fadeIn": "style_fadeIn__2te59",
	"fadeOut": "style_fadeOut__1TtUS"
};


/***/ }),

/***/ 2376:
/***/ ((module) => {

"use strict";
module.exports = require("axios");

/***/ }),

/***/ 6731:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 9297:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 6821:
/***/ ((module) => {

"use strict";
module.exports = require("react-spring");

/***/ }),

/***/ 5282:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [35,311,962,977,770], () => (__webpack_exec__(6919)));
module.exports = __webpack_exports__;

})();