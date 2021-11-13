(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

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

/***/ 4257:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: ./component/Layout/style.module.css
var style_module = __webpack_require__(3521);
var style_module_default = /*#__PURE__*/__webpack_require__.n(style_module);
// EXTERNAL MODULE: ./shared/CustomHooks.tsx
var CustomHooks = __webpack_require__(8740);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(6731);
// EXTERNAL MODULE: ./component/Layout/NavBar/NavTop/style.module.css
var NavTop_style_module = __webpack_require__(9070);
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
  const {
    0: sideBarIsOpen,
    1: setSideBarIsOpen
  } = (0,external_react_.useState)(false); //remeber to change this to true

  const myWindow = (0,GlobalContext/* useMyWindow */.$9)();
  const {
    0: toBottom,
    1: _setToBottom
  } = (0,external_react_.useState)(false);
  (0,external_react_.useEffect)(() => {
    const {
      classList
    } = document.getElementById("__next");
    sideBarIsOpen ? classList.add("navBar_overflow") : classList.remove("navBar_overflow");
  }, [sideBarIsOpen]);

  const toggleNavBar = () => {
    setSideBarIsOpen(prevState => {
      if (prevState === false) {
        return true;
      } else {
        return false;
      }
    });
  };

  (0,CustomHooks/* useIsomorphicLayoutEffect */.LI)(() => {
    if (sideBarIsOpen) myWindow.overlay.open(() => setSideBarIsOpen(false));else myWindow.overlay.close();
  }, [sideBarIsOpen]);

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
// EXTERNAL MODULE: ./component/Inputs/NormalInput/index.tsx
var NormalInput = __webpack_require__(8977);
// EXTERNAL MODULE: ./component/LoadingController/loading.tsx
var loading = __webpack_require__(2770);
;// CONCATENATED MODULE: ./component/Layout/NavBar/NavTop/index.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// @ts-ignore













const {
  menu
} = navBarSections/* navBarSections */.Mk;

const NavTop = () => {
  var _User$data, _User$data2;

  const router = (0,router_.useRouter)();
  const {
    toggleNavBar
  } = useNavBarContext();
  const User = (0,GlobalContext/* useUser */.aF)();
  const myWindow = (0,GlobalContext/* useMyWindow */.$9)();
  const {
    0: inputValue,
    1: setInputValue
  } = (0,external_react_.useState)({});

  const handleClick = e => {
    if (inputValue.search_query.length === 0) return;
    router.push(`/find?categories=search&&categories=${inputValue.search_query}`);
  };

  const {
    0: temp,
    1: setTemp
  } = (0,external_react_.useState)("none");
  return /*#__PURE__*/jsx_runtime_.jsx("nav", {
    className: `${(NavTop_style_module_default()).navTop} container flex`,
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
        children: !User.data && /*#__PURE__*/jsx_runtime_.jsx(Icon, {})
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: `${(NavTop_style_module_default()).brandIcon}`,
        onClick: e => e.stopPropagation(),
        children: /*#__PURE__*/jsx_runtime_.jsx(MyLink/* default */.Z, {
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
        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: `${(NavTop_style_module_default()).textSearch}`,
          onKeyDown: e => {
            e.key === "Enter" && handleClick(e);
          },
          children: [/*#__PURE__*/jsx_runtime_.jsx("button", {
            className: "sm",
            children: /*#__PURE__*/jsx_runtime_.jsx("svg", {
              fill: "#000000",
              viewBox: "0 0 50 50",
              onClick: e => {
                e.stopPropagation();
                myWindow.setFocusOn("searchBar");
              },
              children: /*#__PURE__*/jsx_runtime_.jsx("path", {
                className: "sm",
                id: "svg",
                style: {
                  strokeDashoffset: myWindow.isFocused === "searchBar" ? 400 : 0
                },
                d: "M24.9105 27.7542L44.4856 42.2346L45.2356 41.2196L25.7646 26.8163L26.4219 25.8178C27.7312 23.8286 28.4932 21.4477 28.4932 18.885C28.4932 11.9137 22.8449 6.26227 15.8774 6.26227C8.90986 6.26227 3.26158 11.9137 3.26158 18.885C3.26158 25.8563 8.90986 31.5077 15.8774 31.5077C19.0419 31.5077 21.9316 30.3435 24.1467 28.4181L24.9105 27.7542ZM47 40.955L44.75 44L24.9741 29.3711C22.5382 31.4883 19.3574 32.77 15.8774 32.77C8.21311 32.77 2 26.5534 2 18.885C2 11.2165 8.21311 5 15.8774 5C23.5416 5 29.7547 11.2165 29.7547 18.885C29.7547 21.702 28.9163 24.3231 27.4755 26.512L47 40.955ZM27.2316 18.885C27.2316 25.1592 22.1481 30.2454 15.8774 30.2454C9.60661 30.2454 4.52316 25.1592 4.52316 18.885C4.52316 12.6108 9.60661 7.52454 15.8774 7.52454C22.1481 7.52454 27.2316 12.6108 27.2316 18.885ZM15.8774 28.9832C21.4514 28.9832 25.7646 24.462 25.7646 18.885C25.7646 13.3079 21.4514 8.78681 15.8774 8.78681C10.3034 8.78681 5.78474 13.3079 5.78474 18.885C5.78474 24.462 10.3034 28.9832 15.8774 28.9832Z"
              })
            })
          }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("form", {
            className: "big",
            children: [/*#__PURE__*/jsx_runtime_.jsx("button", {
              onClick: e => {
                e.preventDefault();
                e.stopPropagation();
                myWindow.isFocused === "searchBar" && handleClick(e) || myWindow.setFocusOn("searchBar");
              },
              children: /*#__PURE__*/jsx_runtime_.jsx("svg", {
                fill: "#000000",
                viewBox: "0 0 50 50",
                children: /*#__PURE__*/jsx_runtime_.jsx("path", {
                  id: "svg",
                  d: "M24.9105 27.7542L44.4856 42.2346L45.2356 41.2196L25.7646 26.8163L26.4219 25.8178C27.7312 23.8286 28.4932 21.4477 28.4932 18.885C28.4932 11.9137 22.8449 6.26227 15.8774 6.26227C8.90986 6.26227 3.26158 11.9137 3.26158 18.885C3.26158 25.8563 8.90986 31.5077 15.8774 31.5077C19.0419 31.5077 21.9316 30.3435 24.1467 28.4181L24.9105 27.7542ZM47 40.955L44.75 44L24.9741 29.3711C22.5382 31.4883 19.3574 32.77 15.8774 32.77C8.21311 32.77 2 26.5534 2 18.885C2 11.2165 8.21311 5 15.8774 5C23.5416 5 29.7547 11.2165 29.7547 18.885C29.7547 21.702 28.9163 24.3231 27.4755 26.512L47 40.955ZM27.2316 18.885C27.2316 25.1592 22.1481 30.2454 15.8774 30.2454C9.60661 30.2454 4.52316 25.1592 4.52316 18.885C4.52316 12.6108 9.60661 7.52454 15.8774 7.52454C22.1481 7.52454 27.2316 12.6108 27.2316 18.885ZM15.8774 28.9832C21.4514 28.9832 25.7646 24.462 25.7646 18.885C25.7646 13.3079 21.4514 8.78681 15.8774 8.78681C10.3034 8.78681 5.78474 13.3079 5.78474 18.885C5.78474 24.462 10.3034 28.9832 15.8774 28.9832Z"
                })
              })
            }), /*#__PURE__*/jsx_runtime_.jsx("div", {
              className: `${(NavTop_style_module_default()).inputWrapper} big ${myWindow.isFocused == "searchBar" && (NavTop_style_module_default()).focus}`,
              children: /*#__PURE__*/jsx_runtime_.jsx(NormalInput/* default */.Z, {
                required: false,
                name: "search_query",
                placeholder: "search",
                inputValue: inputValue,
                setInputValue: setInputValue,
                required: true
              })
            })]
          })]
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "big",
          children: !User.data && /*#__PURE__*/jsx_runtime_.jsx(Icon, {})
        }), ((_User$data = User.data) === null || _User$data === void 0 ? void 0 : _User$data.username) == "loading" && /*#__PURE__*/jsx_runtime_.jsx(loading/* default */.Z, {
          width: "50px",
          background: "var(--theme-color)",
          style: {
            margin: "7px"
          }
        }) || /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
          children: [/*#__PURE__*/jsx_runtime_.jsx(Account, {}), ((_User$data2 = User.data) === null || _User$data2 === void 0 ? void 0 : _User$data2._id) && /*#__PURE__*/jsx_runtime_.jsx(Icon, {})]
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
      children: /*#__PURE__*/jsx_runtime_.jsx("a", {
        className: (NavTop_style_module_default()).mainLink,
        children: title
      })
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
    console.log("The account was here");
    console.log(myWindow.isFocused);

    if (myWindow.isFocused === "account") {
      myWindow.setFocusOn("none", e);
    } else {
      console.log("the focus on accout");
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
            children: User.data.username.slice(0, 1)
          })
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_spring_.animated.div, {
          style: _objectSpread(_objectSpread({}, spring), {}, {
            pointerEvents: isFocused ? "all" : "none"
          }),
          className: (NavTop_style_module_default()).rg_menu,
          children: [/*#__PURE__*/jsx_runtime_.jsx(MyLink/* default */.Z, {
            href: "/account",
            children: /*#__PURE__*/jsx_runtime_.jsx("a", {
              children: /*#__PURE__*/jsx_runtime_.jsx("div", {
                className: (NavTop_style_module_default()).user,
                children: /*#__PURE__*/jsx_runtime_.jsx("p", {
                  children: "Account"
                })
              })
            })
          }), User.hasAuthorization("seller") && /*#__PURE__*/jsx_runtime_.jsx(MyLink/* default */.Z, {
            href: "/upload",
            children: /*#__PURE__*/jsx_runtime_.jsx("a", {
              children: /*#__PURE__*/jsx_runtime_.jsx("div", {
                style: {
                  margin: "var(--margin) 0"
                },
                children: /*#__PURE__*/jsx_runtime_.jsx("p", {
                  children: "Upload item"
                })
              })
            })
          }) || /*#__PURE__*/jsx_runtime_.jsx(MyLink/* default */.Z, {
            href: "/account",
            children: /*#__PURE__*/jsx_runtime_.jsx("a", {
              children: /*#__PURE__*/jsx_runtime_.jsx("div", {
                style: {
                  margin: "var(--margin) 0"
                },
                children: /*#__PURE__*/jsx_runtime_.jsx("p", {
                  children: "Become a seller"
                })
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
            myWindow.setHashLocation("#login", e);
          },
          children: /*#__PURE__*/jsx_runtime_.jsx("p", {
            children: "Register"
          })
        })
      })
    })
  });
};
// EXTERNAL MODULE: ./component/Layout/NavBar/NavSide/style.module.css
var NavSide_style_module = __webpack_require__(6388);
var NavSide_style_module_default = /*#__PURE__*/__webpack_require__.n(NavSide_style_module);
;// CONCATENATED MODULE: ./component/Layout/NavBar/NavSide/Navigation.js
// @ts-ignore







const littleLinkList = [{
  text: "about us",
  to: "about"
}, {
  text: "contact us",
  to: "contact"
}, {
  text: "feedback",
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
            children: /*#__PURE__*/jsx_runtime_.jsx("a", {
              children: text
            })
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
// EXTERNAL MODULE: ./component/Layout/NavBar/style.module.css
var NavBar_style_module = __webpack_require__(9775);
var NavBar_style_module_default = /*#__PURE__*/__webpack_require__.n(NavBar_style_module);
// EXTERNAL MODULE: ./component/Layout/NavBar/SearchBar/style.module.css
var SearchBar_style_module = __webpack_require__(7461);
var SearchBar_style_module_default = /*#__PURE__*/__webpack_require__.n(SearchBar_style_module);
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
      transform: "translate(-50%,0%)"
    },
    transform: visible && "translate(-50%,100%)" || "translate(-50%,0%)",
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
      style: springAnimate,
      className: ` big-container sm ${(SearchBar_style_module_default()).wrapper}`,
      onClick: e => e.stopPropagation(),
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: (SearchBar_style_module_default()).inputContainer,
        onKeyDown: e => e.key === "Enter" && handleClick(e),
        children: [/*#__PURE__*/jsx_runtime_.jsx(NormalInput/* default */.Z, {
          required: false,
          name: "search_query",
          placeholder: "search",
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









const useScrollDirectionToBottom = (sensibility, sampling, element) => {
  const {
    toBottom,
    setToBottom
  } = useNavBarContext();
  (0,external_react_.useEffect)(() => {
    element = document.getElementById(element);

    const getScrollSpeed = async (e, firstTake = true, previousScroll) => {
      if (!firstTake) {
        if (previousScroll < 100) return await setToBottom(false);
        let scrollIntensity = element.scrollTop - previousScroll;
        if (Math.abs(scrollIntensity) >= sensibility) await setToBottom(scrollIntensity > 0 ? true : false);
        return;
      }

      previousScroll = element.scrollTop;
      setTimeout(() => {
        getScrollSpeed(e, false, previousScroll);
      }, sampling);
    };

    element.addEventListener("scroll", getScrollSpeed);
    return () => element.removeEventListener("scroll", getScrollSpeed);
  }, []);
  return toBottom;
};

const R_NavBar = () => {
  const toBottom = useScrollDirectionToBottom(5, 50, "__next");
  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: `${(NavBar_style_module_default()).navigation} ${toBottom && (NavBar_style_module_default()).hidden} max-width`,
      children: [/*#__PURE__*/jsx_runtime_.jsx("h3", {
        className: (NavBar_style_module_default()).annoncement,
        children: "This is something cool"
      }), /*#__PURE__*/jsx_runtime_.jsx(NavBar_NavTop, {}), /*#__PURE__*/jsx_runtime_.jsx(NavSide, {}), /*#__PURE__*/jsx_runtime_.jsx(NavBar_SearchBar, {})]
    })
  });
};

const NavBar_Navigation = () => {
  return /*#__PURE__*/jsx_runtime_.jsx(navBarContext, {
    children: /*#__PURE__*/jsx_runtime_.jsx(R_NavBar, {})
  });
};

/* harmony default export */ const NavBar = (NavBar_Navigation);
// EXTERNAL MODULE: ./component/Layout/Footer/style.module.css
var Footer_style_module = __webpack_require__(7669);
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
// EXTERNAL MODULE: ./component/Layout/Auth/style.module.css
var Auth_style_module = __webpack_require__(5377);
var Auth_style_module_default = /*#__PURE__*/__webpack_require__.n(Auth_style_module);
// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(2376);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
;// CONCATENATED MODULE: ./component/Layout/Auth/TPLogin.tsx
//@ts-ignore







function TPLogin({
  setEditState
}) {
  const {
    0: google_url,
    1: setGoogle_url
  } = (0,external_react_.useState)();
  const User = (0,GlobalContext/* useUser */.aF)();
  const auth = (0,GlobalContext/* useAuthcontext */.BU)();
  const myWindow = (0,GlobalContext/* useMyWindow */.$9)();

  const handleGoogleClick = () => {
    localStorage.setItem("meta_64", "0");
    const checker = setInterval(async () => {
      if (localStorage.getItem("meta_64") == "1") {
        User.setUserData({
          username: "loading"
        });
        await auth.getNewToken();
        myWindow.setHashLocation("");
        User.refresh();
        clearInterval(checker);
      }
    }, 1000);
  };

  (0,external_react_.useEffect)(() => {
    (async () => {
      const response = await external_axios_default().get("/api/auth/google");
      setGoogle_url(response.data.url);
    })();
  }, []);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: (Auth_style_module_default()).TPContainer,
    children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
      className: (Auth_style_module_default()).TPheader,
      children: /*#__PURE__*/jsx_runtime_.jsx("span", {
        children: "or"
      })
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: (Auth_style_module_default()).TPcontent,
      children: /*#__PURE__*/jsx_runtime_.jsx("a", {
        href: google_url,
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
      })
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
;// CONCATENATED MODULE: ./component/Layout/Auth/login.tsx












const Login = ({
  inputValue,
  setInputValue,
  setHeight
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
    const loginResponse = await external_axios_default().post("/api/auth/login", data).catch(err => {
      setError({
        global: "wrong User name or password"
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
      myWindow.setHashLocation("");
    } else setEditState("failure");
  };

  const transition = (0,external_react_spring_.useTransition)(myWindow.hashLocation == "#login", {
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
    if (myWindow.hashLocation == "#login") {
      //@ts-ignore
      setHeight(myRef.current.clientHeight);
    }
  }, [myWindow.hashLocation, error, myWindow.size]);
  return transition((style, condition) => condition && /*#__PURE__*/jsx_runtime_.jsx(external_react_spring_.animated.div, {
    style: style,
    className: (Auth_style_module_default()).formContainer,
    ref: myRef,
    id: "#login",
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: (Auth_style_module_default())._formContainer,
      children: [/*#__PURE__*/jsx_runtime_.jsx("h3", {
        children: " Login KdShop"
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
        })]
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
        onClick: () => myWindow.setHashLocation("#register"),
        children: [/*#__PURE__*/jsx_runtime_.jsx("p", {
          children: "Don't yet have an Accout?"
        }), /*#__PURE__*/jsx_runtime_.jsx("span", {
          children: "create an account."
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
  setHeight
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
      myWindow.setHashLocation("");
    } else setEditState("failure");
  };

  const transition = (0,external_react_spring_.useTransition)(myWindow.hashLocation == "#register", {
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
    if (myWindow.hashLocation == "#register") {
      //@ts-ignore
      setHeight(myRef.current.clientHeight);
    }
  }, [myWindow.hashLocation, error, myWindow.size]);
  return transition((style, condition) => condition && /*#__PURE__*/jsx_runtime_.jsx(external_react_spring_.animated.div, {
    style: style,
    className: (Auth_style_module_default()).formContainer,
    ref: myRef,
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: (Auth_style_module_default())._formContainer,
      children: [/*#__PURE__*/jsx_runtime_.jsx("h3", {
        children: " Register your accout"
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("form", {
        className: (Auth_style_module_default()).registerForm,
        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: (Auth_style_module_default()).two,
          children: [/*#__PURE__*/jsx_runtime_.jsx(NormalInput/* default */.Z, {
            error: error,
            name: "First Name",
            required: true,
            inputValue: inputValue,
            allowCapitalCase: true,
            setInputValue: setInputValue,
            defaultValue: inputValue["First Name"]
          }), /*#__PURE__*/jsx_runtime_.jsx(NormalInput/* default */.Z, {
            error: error,
            name: "Last Name",
            required: true,
            inputValue: inputValue,
            allowCapitalCase: true,
            setInputValue: setInputValue,
            defaultValue: inputValue["Last Name"]
          })]
        }), /*#__PURE__*/jsx_runtime_.jsx(NormalInput/* default */.Z, {
          error: error,
          name: "username",
          required: true,
          inputValue: inputValue,
          setInputValue: setInputValue,
          defaultValue: inputValue["username"]
        }), /*#__PURE__*/jsx_runtime_.jsx(NormalInput/* default */.Z, {
          error: error,
          type: "password",
          name: "password",
          required: true,
          allowCapitalCase: true,
          inputValue: inputValue,
          setInputValue: setInputValue,
          defaultValue: inputValue["password"]
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: (Auth_style_module_default()).terms,
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
            children: ["By registering, you agree with our", " ", /*#__PURE__*/jsx_runtime_.jsx("span", {
              children: "The term of utilisations"
            })]
          })
        })]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("button", {
        className: (Auth_style_module_default()).validate,
        onClick: handleSubmit,
        children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
          children: "Register"
        }), /*#__PURE__*/jsx_runtime_.jsx(loading/* default */.Z, {
          width: editState == "loading" ? "4em" : "0"
        })]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: (Auth_style_module_default()).else,
        onClick: () => myWindow.setHashLocation("#login"),
        children: [/*#__PURE__*/jsx_runtime_.jsx("p", {
          children: "Already have an accout?"
        }), /*#__PURE__*/jsx_runtime_.jsx("span", {
          children: "Login into you acout"
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
  const [animateHeight, animateApi] = (0,external_react_spring_.useSpring)(() => ({
    height: 400
  }));
  (0,external_react_.useEffect)(() => {
    animateApi.start({
      height: height
    });
  }, [height]);
  (0,external_react_.useEffect)(() => {
    if (myWindow.hashLocation === "#login" || myWindow.hashLocation === "#register") {
      setVisible(true);
    } else {
      const id = dummyRef.current;
      setTimeout(() => {
        if (id == dummyRef.current) {
          setVisible(false);
        }
      }, 200);
    }
  }, [myWindow.hashLocation]);
  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: `${(Auth_style_module_default()).prompt} ${myWindow.hashLocation === "#" && (Auth_style_module_default()).closed}`,
      style: {
        zIndex: visible ? 3 : -5
      },
      onClick: e => e.stopPropagation(),
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_spring_.animated.div, {
        style: Auth_objectSpread({}, animateHeight),
        children: [/*#__PURE__*/jsx_runtime_.jsx(register, {
          inputValue: inputValue,
          setInputValue: setInputValue,
          setHeight: setHeight
        }), /*#__PURE__*/jsx_runtime_.jsx(login, {
          inputValue: inputValue,
          setInputValue: setInputValue,
          setHeight: setHeight
        })]
      })
    })
  });
};

/* harmony default export */ const Auth = (/*#__PURE__*/(0,external_react_.memo)(Auth_index));
;// CONCATENATED MODULE: ./component/Layout/index.js












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
    if (router.pathname != old_url.current.pathname || !compare(router.query, old_url.current.query)) {
      // console.log("The path changed");
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
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: (style_module_default())[myWindow.phase],
      children: /*#__PURE__*/jsx_runtime_.jsx(Footer, {})
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
    children: /*#__PURE__*/jsx_runtime_.jsx(Layout, {
      children: /*#__PURE__*/jsx_runtime_.jsx(Component, _app_objectSpread({}, pageProps))
    })
  });
}

/* harmony default export */ const _app = (MyApp);

/***/ }),

/***/ 5377:
/***/ ((module) => {

// Exports
module.exports = {
	"error": "style_error__1ov07",
	"prompt": "style_prompt__36YRx",
	"closed": "style_closed__wNWNB",
	"loginForm": "style_loginForm__3ivGH",
	"two": "style_two__3kOxi",
	"validate": "style_validate__3fXAp",
	"else": "style_else__2IHCL",
	"formContainer": "style_formContainer__2YhP-",
	"_formContainer": "style__formContainer__1TXTn",
	"terms": "style_terms__5G1OU",
	"spinner": "style_spinner__3qK-T",
	"spin": "style_spin__1rFAv",
	"TPContainer": "style_TPContainer__38jGa",
	"TPheader": "style_TPheader__NPNLZ",
	"TPcontent": "style_TPcontent__1rPOW",
	"alternative": "style_alternative__STGlP"
};


/***/ }),

/***/ 7669:
/***/ ((module) => {

// Exports
module.exports = {
	"footerContainer": "style_footerContainer__smSaW",
	"footerHeader": "style_footerHeader__3lSWf",
	"brandName": "style_brandName__3EuVL",
	"Icons": "style_Icons__1ceRz",
	"footerBody": "style_footerBody__1mJS2",
	"footerLink": "style_footerLink__m7TcU",
	"footerBottom": "style_footerBottom__25wEt"
};


/***/ }),

/***/ 6388:
/***/ ((module) => {

// Exports
module.exports = {
	"sideBar": "style_sideBar__1pXOV",
	"open": "style_open__lNq24",
	"overlay": "style_overlay__VenYa",
	"navigation": "style_navigation__KrtxR",
	"headerSection": "style_headerSection__2HOkO",
	"croxSection": "style_croxSection__2niNR",
	"backArrow": "style_backArrow__1Rldm",
	"burger": "style_burger__2eBBb",
	"linkSection": "style_linkSection__XIJnJ",
	"linkContainer": "style_linkContainer__2-I0X",
	"footer": "style_footer__2ijHt"
};


/***/ }),

/***/ 9070:
/***/ ((module) => {

// Exports
module.exports = {
	"navTop": "style_navTop__1DAN5",
	"burgerDiv": "style_burgerDiv__ZpqGs",
	"middle": "style_middle__1uwLp",
	"brandIcon": "style_brandIcon__1vxph",
	"bagIcon": "style_bagIcon__5nm6s",
	"account": "style_account__1io8u",
	"ItemsInCart": "style_ItemsInCart__1nm-j",
	"rightSection": "style_rightSection__1TP1w",
	"textSearch": "style_textSearch__2hHch",
	"inputWrapper": "style_inputWrapper__31Yl6",
	"focus": "style_focus__19ooK",
	"navLink": "style_navLink__2YbGH",
	"mainLink": "style_mainLink__3GQcy",
	"content": "style_content__3GXbQ",
	"headerGroup": "style_headerGroup__1kVD6",
	"burgerDivContainer": "style_burgerDivContainer__36zJM",
	"linkContainer": "style_linkContainer__Kb0KH",
	"rg_menu": "style_rg_menu__3Wspn",
	"login": "style_login__1PQFx",
	"register": "style_register__28yEh",
	"user": "style_user__1wqCV",
	"signOut": "style_signOut__Nkl4F",
	"userImage": "style_userImage__13bHI"
};


/***/ }),

/***/ 7461:
/***/ ((module) => {

// Exports
module.exports = {
	"wrapper": "style_wrapper__16If8",
	"inputContainer": "style_inputContainer__3N4XZ"
};


/***/ }),

/***/ 9775:
/***/ ((module) => {

// Exports
module.exports = {
	"navigation": "style_navigation__3mjfe",
	"annoncement": "style_annoncement__2iZ51",
	"hidden": "style_hidden__2ZSc8"
};


/***/ }),

/***/ 3521:
/***/ ((module) => {

// Exports
module.exports = {
	"bigContainer": "style_bigContainer__17Ue3",
	"fadeIn": "style_fadeIn__tJMsL",
	"fadeOut": "style_fadeOut__2dX9v"
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
var __webpack_exports__ = __webpack_require__.X(0, [35,311,977,770,756], () => (__webpack_exec__(4257)));
module.exports = __webpack_exports__;

})();