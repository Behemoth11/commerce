"use strict";
exports.id = 615;
exports.ids = [615];
exports.modules = {

/***/ 4289:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(817);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3305);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);






const MoreProduct = ({
  items,
  preset,
  title,
  style
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().moreProduct)} ${(_style_module_css__WEBPACK_IMPORTED_MODULE_3___default())[preset]}`,
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("h3", {
      children: title
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
      style: {
        fontSize: "0.8em"
      },
      className: (_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().container),
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(___WEBPACK_IMPORTED_MODULE_0__/* .default */ .Z, {
        items: items
      })
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MoreProduct);

/***/ }),

/***/ 5962:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ fetchNavigation),
/* harmony export */   "r": () => (/* binding */ fecthRelated)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2376);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _component_Layout_NavBar_navBarSections__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7756);


const fetchNavigation = async (categories, cb) => {
  let response;

  if (categories != "all") {
    const representation = (0,_component_Layout_NavBar_navBarSections__WEBPACK_IMPORTED_MODULE_1__/* .getRelated */ .cE)(categories);
    if (representation.length >= 5) response = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`/api/product/representation?${representation}&field=pr_image_url&field=description&field=productName&field=representation`).catch(err => console.log(err));
  }

  if (!response || response.data.products.length < 2) {
    response = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`/api/product/representation?representation=all&field=pr_image_url&field=description&field=productName&field=representation&limit=4`).catch(err => console.log(err));
  }

  cb(response.data.products);
};
const fecthRelated = async (product, cb) => {
  let response;

  if (product.related.length > 0) {
    response = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`/api/product?categories=search&&categories=${product.categories.join(" ")}&ne=${product._id}`);
  }

  if (response) {
    cb(response.data.products);
  }
};

/***/ })

};
;