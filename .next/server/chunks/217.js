exports.id = 217;
exports.ids = [217];
exports.modules = {

/***/ 5217:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5596);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_spring__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6821);
/* harmony import */ var react_spring__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_spring__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Contexts_GlobalContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1005);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
// @ts-ignore






const Popup = ({
  children,
  duration,
  type,
  name
}) => {
  const myWindow = (0,_Contexts_GlobalContext__WEBPACK_IMPORTED_MODULE_2__/* .useMyWindow */ .$9)();
  const popupId = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
  const visibility = myWindow.isFocused === name;
  const animate = (0,react_spring__WEBPACK_IMPORTED_MODULE_1__.useTransition)(visibility, {
    from: {
      opacity: 0,
      x: -100
    },
    enter: {
      opacity: 1,
      x: 0
    },
    leave: {
      opacity: 0,
      x: 100
    },
    config: react_spring__WEBPACK_IMPORTED_MODULE_1__.config.stiff
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // console.log("visibility accoridng to parent : ", isVisible)
    if (visibility) {
      myWindow.setFocusOn(name);
      const myPopupId = popupId.current;
      const timeOut = setTimeout(() => {
        if (myPopupId === popupId.current) {
          myWindow.setFocusOn("none");
        }
      }, duration); // console.log(isVisible && "open" || "close", myWindow.isFocused, nonAnimatedVisibility)

      return () => clearTimeout(timeOut);
    } // console.log(isVisible && "open" || "close", myWindow.isFocused, nonAnimatedVisibility)

  }, [visibility]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // console.log(nonAnimatedVisibility)
    if (visibility) return;
    popupId.current++;
  }, [visibility]);
  return animate((_style, _isVisible) => _isVisible && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("div", {
    className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_4___default().container)} ${(_style_module_css__WEBPACK_IMPORTED_MODULE_4___default())[type]} ${!visibility && (_style_module_css__WEBPACK_IMPORTED_MODULE_4___default().notVisible)}`,
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(react_spring__WEBPACK_IMPORTED_MODULE_1__.animated.div, {
      className: (_style_module_css__WEBPACK_IMPORTED_MODULE_4___default().popupContainer),
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(react_spring__WEBPACK_IMPORTED_MODULE_1__.animated.div, {
        style: _style,
        className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_4___default())[type]} ${(_style_module_css__WEBPACK_IMPORTED_MODULE_4___default().content)}z`,
        children: children
      })
    })
  }));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Popup);

/***/ }),

/***/ 5596:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "style_container__3Lqt-",
	"popupContainer": "style_popupContainer__3z2Lb",
	"content": "style_content__7iCDr",
	"overlay": "style_overlay__eULgt",
	"notVisible": "style_notVisible__1t1XQ"
};


/***/ })

};
;