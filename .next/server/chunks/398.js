exports.id = 398;
exports.ids = [398];
exports.modules = {

/***/ 9797:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3616);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_module_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
// @ts-ignore




const Button = ({
  label,
  onClick,
  type,
  style,
  children
}) => {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("button", {
    className: `${(_style_module_scss__WEBPACK_IMPORTED_MODULE_2___default().container)} ${(_style_module_scss__WEBPACK_IMPORTED_MODULE_2___default())[type]}`,
    onClick: e => {
      e.preventDefault();
      onClick(e);
    },
    style: style || {},
    children: children || label || "Button"
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(Button));

/***/ }),

/***/ 8879:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(134);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_module_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_spring__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6821);
/* harmony import */ var react_spring__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_spring__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Contexts_GlobalContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1005);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
// @ts-ignore






const Expend = ({
  visible,
  children,
  top_prop,
  dependency
}) => {
  const myWindow = (0,_Contexts_GlobalContext__WEBPACK_IMPORTED_MODULE_2__/* .useMyWindow */ .$9)();
  const popupRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const childRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const [styles_animated, api] = (0,react_spring__WEBPACK_IMPORTED_MODULE_1__.useSpring)(() => ({
    top: "1px",
    left: "10px",
    width: "10px",
    height: "10px",
    opacity: 0
  }));
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (visible) {
      var _popupRef$current, _popupRef$current$par;

      const position = //@ts-ignore
      popupRef === null || popupRef === void 0 ? void 0 : (_popupRef$current = popupRef.current) === null || _popupRef$current === void 0 ? void 0 : (_popupRef$current$par = _popupRef$current.parentElement) === null || _popupRef$current$par === void 0 ? void 0 : _popupRef$current$par.getBoundingClientRect();
      api({
        from: {
          top: position.top + "px",
          left: position.left + "px",
          width: position.width + "px",
          height: position.height + "px",
          opacity: 0
        },
        reset: true,
        config: react_spring__WEBPACK_IMPORTED_MODULE_1__.config.stiff
      });
    }
  }, [visible]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    var _popupRef$current2, _popupRef$current2$pa, _childRef$current;

    //@ts-ignore
    const position = popupRef === null || popupRef === void 0 ? void 0 : (_popupRef$current2 = popupRef.current) === null || _popupRef$current2 === void 0 ? void 0 : (_popupRef$current2$pa = _popupRef$current2.parentElement) === null || _popupRef$current2$pa === void 0 ? void 0 : _popupRef$current2$pa.getBoundingClientRect(); //@ts-ignore

    const childDimensions = childRef === null || childRef === void 0 ? void 0 : (_childRef$current = childRef.current) === null || _childRef$current === void 0 ? void 0 : _childRef$current.getBoundingClientRect();

    const __next = document.getElementById("__next");

    if (visible) {
      api.start({
        opacity: 10,
        width: childDimensions.width + "px",
        height: childDimensions.height + "px",
        left: __next.clientWidth / 2 - childDimensions.width / 2 + "px",
        top: Math.max(0, top_prop || __next.clientHeight / 2 - childDimensions.height / 2) + "px"
      });
    } else {
      api.start({
        opacity: 0,
        top: Math.min(__next.clientHeight - 100, position.top) + "px",
        left: position.left + "px",
        width: position.width + "px",
        height: position.height + "px"
      });
    }
  }, [visible].concat(dependency || []));
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(react_spring__WEBPACK_IMPORTED_MODULE_1__.animated.div, {
    className: `${(_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default().container)} ${visible && (_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default().visible)}`,
    onClick: e => e.stopPropagation(),
    style: styles_animated,
    ref: popupRef,
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("div", {
      ref: childRef,
      className: `${(_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default().childrenContainer)}`,
      children: children
    })
  });
}; //angel of death


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(Expend));

/***/ }),

/***/ 3616:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "style_container__wkV-6",
	"type1": "style_type1__3QUzs"
};


/***/ }),

/***/ 134:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "style_container__3V5mc",
	"visible": "style_visible__18zlG",
	"childrenContainer": "style_childrenContainer__2S8qS",
	"overlay": "style_overlay__1W-95",
	"optionContainer": "style_optionContainer__3eccb",
	"children": "style_children__2BJWF"
};


/***/ })

};
;