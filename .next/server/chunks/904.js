exports.id = 904;
exports.ids = [904];
exports.modules = {

/***/ 7660:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1250);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_module_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ProductCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2180);
/* harmony import */ var _shared_CustomHooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8740);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
// @ts-ignore






const index = ({
  items,
  displayType,
  aspect_ratio
}) => {
  const {
    0: activeOpenField,
    1: setActiveOpenField
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(undefined);
  const [visibilityIndex, observer] = (0,_shared_CustomHooks__WEBPACK_IMPORTED_MODULE_1__/* .useIntersectionObserver */ .S1)("500px");
  const DEFAULT_ASPECT_RATIO = displayType == "double" && 130 || 100;
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("div", {
    className: `${(_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default().container)} ${(_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default())[displayType]} `,
    children: items.map((element, index) => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_ProductCard__WEBPACK_IMPORTED_MODULE_0__/* .default */ .Z, {
      type: "grid-display",
      aspect_ratio: aspect_ratio || DEFAULT_ASPECT_RATIO //data section
      ,
      _id: element._id,
      price: element.price,
      footer: element.footer,
      imageLink: element.pr_image_url,
      productName: element.productName,
      description: element.description //end of the data section
      ,
      index: index,
      observer: observer,
      isVisible: index < visibilityIndex,
      setActiveOpenField: setActiveOpenField,
      infoFieldIsOpen: activeOpenField == index
    }, element._id || index))
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_2__.memo)(index));

/***/ }),

/***/ 1250:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "style_container__3WpKp",
	"double": "style_double__akvon"
};


/***/ })

};
;