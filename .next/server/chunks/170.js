exports.id = 170;
exports.ids = [170];
exports.modules = {

/***/ 3503:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5288);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
// @ts-ignore






const Errors = ({
  errMsg
}) => {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: errMsg.length > 0 && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("ul", {
      className: (_style_module_css__WEBPACK_IMPORTED_MODULE_2___default().errorContainer),
      children: errMsg.map(error => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("li", {
        children: ["* ", error, "."]
      }, error))
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(Errors));

/***/ }),

/***/ 8460:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6880);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// @ts-ignore






const TextArea = ({
  name,
  required,
  inputValue,
  submitCount,
  setInputValue
}) => {
  var _inputValue$name;

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setInputValue(inputValue => _objectSpread(_objectSpread({}, inputValue), {}, {
      [name]: ""
    }));
  }, []);

  const handleTextAreachange = data => {
    setInputValue(prevState => {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        [name]: data
      });
    });
  };

  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_2___default().inputContainer)} ${(_style_module_css__WEBPACK_IMPORTED_MODULE_2___default().textArea)} `,
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("textarea", {
        value: inputValue[name] || "",
        name: inputValue[name],
        id: name,
        onChange: e => handleTextAreachange(e.target.value),
        className: `flex-center ${(_style_module_css__WEBPACK_IMPORTED_MODULE_2___default().filled)} ${required && submitCount > 0 && !((_inputValue$name = inputValue[name]) !== null && _inputValue$name !== void 0 && _inputValue$name.length) && (_style_module_css__WEBPACK_IMPORTED_MODULE_2___default().failure)}`
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("label", {
        htmlFor: name,
        children: name
      })]
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(TextArea));

/***/ }),

/***/ 1208:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3572);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_4__);
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
    className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_4___default().controller)}`,
    children: [loadingTransition((_style, visible) => visible && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(react_spring__WEBPACK_IMPORTED_MODULE_0__.animated.div, {
      className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_4___default().states)}`,
      style: _style,
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("div", {
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_loading__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z, {
          width: "80px",
          background: "var(--accent-color-1)"
        })
      })
    })), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(react_spring__WEBPACK_IMPORTED_MODULE_0__.animated.div, {
      className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_4___default().states)}`,
      style: afterSubmitSpring,
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("div", {
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("p", {
          className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_4___default())[state]} ${(_style_module_css__WEBPACK_IMPORTED_MODULE_4___default().message)}`,
          children: customMessage && customMessage[state]
        })
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("div", {
      children: children
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoadingController);

/***/ }),

/***/ 5288:
/***/ ((module) => {

// Exports
module.exports = {
	"errorContainer": "style_errorContainer__1Sz_Y"
};


/***/ })

};
;