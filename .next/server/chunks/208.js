"use strict";
exports.id = 208;
exports.ids = [208];
exports.modules = {

/***/ 1208:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2994);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_module_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_spring__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6821);
/* harmony import */ var react_spring__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_spring__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _loading__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2770);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
// @ts-ignore







const LoadingController = ({
  children,
  state,
  setState,
  no_scroll,
  customMessage,
  pseudoStateDuration
}) => {
  const afterSubmitSpring = (0,react_spring__WEBPACK_IMPORTED_MODULE_0__.useSpring)({
    x: (state == "success" || state == "failure") && "0%" || "-100%",
    opacity: (state == "success" || state == "failure") && "1" || "0",
    from: {
      x: "-100%"
    }
  });
  const loadingTransition = (0,react_spring__WEBPACK_IMPORTED_MODULE_0__.useTransition)(state == "loading", {
    enter: {
      opacity: "1",
      transform: "scale(1)"
    },
    leave: {
      opacity: "1",
      transform: "scale(1)"
    },
    from: {
      opacity: "1",
      transform: "scale(0.9)"
    }
  });
  const initRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(state);
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (!["loading", "success", "failure"].includes(state)) {
      initRef.current = state;
    }
  }, [state]);
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (state == "success" || state == "failure") {
      setTimeout(() => {
        setState(initRef.current);
      }, pseudoStateDuration || 1000);
    }
  }, [state]);
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    const next = document.getElementById("__next");
    next.scroll(0, 0);

    if (state == "loading" && no_scroll) {
      next.style.overflow = "hidden";
    } else if (state != "success" && state != "failure" && no_scroll) {
      next.style.overflow = "";
    }
  }, [state]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: `${(_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default().controller)}`,
    children: [loadingTransition((_style, visible) => visible && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(react_spring__WEBPACK_IMPORTED_MODULE_0__.animated.div, {
      className: `${(_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default().states)}`,
      style: _style,
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("div", {
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_loading__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z, {
          width: "80px",
          background: "var(--accent-color-1)"
        })
      })
    })), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(react_spring__WEBPACK_IMPORTED_MODULE_0__.animated.div, {
      className: `${(_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default().states)}`,
      style: afterSubmitSpring,
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("div", {
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("p", {
          className: `${(_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default())[state]} ${(_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default().message)}`,
          children: customMessage && customMessage[state]
        })
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("div", {
      children: children
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoadingController);

/***/ })

};
;