exports.id = 977;
exports.ids = [977];
exports.modules = {

/***/ 8977:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1397);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_module_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7328);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_module_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// @ts-ignore






const Input = ({
  name,
  type,
  error,
  label,
  required,
  inputValue,
  placeholder,
  submitCount,
  proposition,
  defaultValue,
  setInputValue,
  allowCapitalCase
}) => {
  var _proposition$name, _ref, _ref2;

  const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setInputValue(prevState => _objectSpread(_objectSpread({}, prevState), {}, {
      [name]: defaultValue || ""
    }));
  }, [defaultValue]);

  const handleChange = _payload => {
    const payload = allowCapitalCase && _payload || _payload.toLowerCase();

    setInputValue(prevState => _objectSpread(_objectSpread({}, prevState), {}, {
      [name]: payload
    }));
  };

  const myProposition = proposition && ((_proposition$name = proposition[name]) === null || _proposition$name === void 0 ? void 0 : _proposition$name.filter(proposition => new RegExp(inputValue[name], "i").test(proposition)));
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: `${(_style_module_scss__WEBPACK_IMPORTED_MODULE_2___default().inputContainer)}`,
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("input", {
        value: inputValue[name] || "",
        name: inputValue[name],
        placeholder: placeholder,
        id: name,
        required: required,
        onChange: e => handleChange(e.target.value),
        className: `flex-center ${((_ref = `${inputValue[name]}`) === null || _ref === void 0 ? void 0 : _ref.length) && (_style_module_scss__WEBPACK_IMPORTED_MODULE_2___default().filled)} ${required && submitCount > 0 && !((_ref2 = `${inputValue[name]}`) !== null && _ref2 !== void 0 && _ref2.length) && (_style_module_scss__WEBPACK_IMPORTED_MODULE_2___default().failure)}`,
        ref: inputRef,
        type: type || "text",
        autoComplete: "off"
      }), !placeholder && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("label", {
        htmlFor: name,
        children: [label || name, " ", !required && "(optional)"]
      }), (myProposition === null || myProposition === void 0 ? void 0 : myProposition.length) > 0 && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_2___default().proposition),
        children: myProposition.map(proposition => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("p", {
          onClick: e => {
            if (inputRef.current) {
              inputRef.current.focus();
            }

            handleChange(proposition);
          },
          children: proposition
        }, proposition))
      })]
    }), error && error[name] && error[name].map(err => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
      className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_3___default().error),
      children: err
    })), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
      className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_2___default().inputArrayChoices)
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(Input));

/***/ }),

/***/ 1397:
/***/ ((module) => {

// Exports
module.exports = {
	"error": "style_error__jJlmR"
};


/***/ }),

/***/ 7328:
/***/ ((module) => {

// Exports
module.exports = {
	"boss": "style_boss__2AJRx",
	"proposition": "style_proposition__2ZyZX",
	"addButtonArray": "style_addButtonArray__3Z6RG",
	"createProposition": "style_createProposition__Ml3wp",
	"superInput": "style_superInput__1556R",
	"inputContainer": "style_inputContainer__1CFzA",
	"failure": "style_failure__2xPyM",
	"inputArrayChoices": "style_inputArrayChoices__2WXkg",
	"editState": "style_editState__36ykr",
	"active": "style_active__34KR9",
	"filled": "style_filled__yz2Bu",
	"inputImageContainer": "style_inputImageContainer__1xelk",
	"add": "style_add__1ocCO",
	"rm": "style_rm__1Id02",
	"submit": "style_submit__17jXv",
	"errorContainer": "style_errorContainer__399ix",
	"imagesInput": "style_imagesInput__2sCxF",
	"utilState": "style_utilState__2BtaW"
};


/***/ })

};
;