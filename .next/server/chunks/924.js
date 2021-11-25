exports.id = 924;
exports.ids = [924];
exports.modules = {

/***/ 8924:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9058);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_module_scss__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _MyImage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3513);
/* harmony import */ var _MyLink__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2008);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _shared_UtilityFunctions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5035);
/* harmony import */ var react_spring__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6821);
/* harmony import */ var react_spring__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_spring__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
// @ts-ignore










const CartProduct = ({
  product,
  visible,
  onClick
}) => {
  if (!product.productName) return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {});
  let productName = product.productName.slice(0, 15);
  if (product.productName.length > 15) productName += "...";
  const {
    0: showFullName,
    1: setShowFullName
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(react_spring__WEBPACK_IMPORTED_MODULE_3__.animated.div, {
    className: `${(_style_module_scss__WEBPACK_IMPORTED_MODULE_5___default().container)} max-width ${visible && (_style_module_scss__WEBPACK_IMPORTED_MODULE_5___default().visible)}`,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_5___default().wrapper),
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
        className: `${(_style_module_scss__WEBPACK_IMPORTED_MODULE_5___default().imageContainer)}`,
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_MyLink__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z, {
          href: `/product/${product._id}`,
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_MyImage__WEBPACK_IMPORTED_MODULE_0__/* .default */ .Z, {
            imageLink: product.pr_image_url,
            isVisible: true,
            ASPECT_RATIO: 100,
            observer: undefined
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_5___default().middleSection),
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("p", {
          className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_5___default().productName),
          onClick: () => setShowFullName(prevState => !prevState),
          children: showFullName && product.productName || productName
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("p", {
          className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_5___default().price),
          children: (0,_shared_UtilityFunctions__WEBPACK_IMPORTED_MODULE_6__/* .formatPrice */ .T4)(product.price)
        })]
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_5___default().rm),
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("button", {
          className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_5___default().trashBeen),
          onClick: () => onClick(product._id),
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("img", {
            src: "/svg/trash.svg"
          })
        })
      })]
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_2__.memo)(CartProduct));

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

/***/ 9058:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "style_container__1MFy9",
	"visible": "style_visible__2_NjG",
	"wrapper": "style_wrapper__2KMSo",
	"imageContainer": "style_imageContainer__2If1-",
	"productName": "style_productName__CB7Va",
	"middleSection": "style_middleSection__1G8yN",
	"rm": "style_rm__Tn6o1",
	"trashBeen": "style_trashBeen__3X24b",
	"price": "style_price__3Ml0u",
	"buyPrompt": "style_buyPrompt__3y4DM"
};


/***/ })

};
;