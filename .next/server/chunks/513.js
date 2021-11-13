exports.id = 513;
exports.ids = [513];
exports.modules = {

/***/ 3513:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4129);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Contexts_GlobalContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1005);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
// @ts-ignore






const MyImage = ({
  ASPECT_RATIO,
  imageLink,
  isVisible,
  onLoad,
  observer,
  loadingState,
  no_optimization
}) => {
  const applyTransformation = (link, width) => `https://res.cloudinary.com/dkoatnxem/image/upload/ar_${100 / ASPECT_RATIO},c_crop/c_scale,w_${width + 100}/${link}`;

  const imageRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const {
    0: _imageLink,
    1: setImageLink
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(undefined);
  const {
    0: isLoading,
    1: setIsLoading
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const myWindow = (0,_Contexts_GlobalContext__WEBPACK_IMPORTED_MODULE_1__/* .useMyWindow */ .$9)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (no_optimization) return;
    if (!imageLink) return;
    setImageLink(applyTransformation(imageLink, imageRef.current.clientWidth));
  }, [myWindow.size, imageLink, ASPECT_RATIO]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    observer && observer.observe(imageRef.current);
  }, [observer]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isVisible) observer && observer.unobserve(imageRef.current);
  }, [isVisible]);

  const dummy = e => 2;

  const afterLoadInstructions = onLoad || dummy;
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
      className: (_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().myImage),
      ref: imageRef,
      style: {
        paddingTop: `${ASPECT_RATIO}%`
      },
      children: isVisible && ((no_optimization && imageLink || _imageLink) && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("img", {
        src: no_optimization && imageLink || _imageLink,
        alt: "There will soon be an alt",
        style: {
          opacity: loadingState && isLoading && 0 || 1
        },
        onLoad: e => {
          afterLoadInstructions(e);
          setIsLoading(false);
        }
      }) || loadingState && isLoading && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().loadingPlaceholder),
        children: "...Loading"
      }))
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(MyImage));

/***/ }),

/***/ 4129:
/***/ ((module) => {

// Exports
module.exports = {
	"myImage": "style_myImage__NFAoT",
	"loadingPlaceholder": "style_loadingPlaceholder__1xRcB"
};


/***/ })

};
;