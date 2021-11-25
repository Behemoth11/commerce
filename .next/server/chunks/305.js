exports.id = 305;
exports.ids = [305];
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

/***/ 2180:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ ProductCard)
});

// EXTERNAL MODULE: ./component/MyLink.tsx
var MyLink = __webpack_require__(2008);
// EXTERNAL MODULE: ./component/ProductCard/style.module.scss
var style_module = __webpack_require__(5110);
var style_module_default = /*#__PURE__*/__webpack_require__.n(style_module);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: ./component/LoadingProductCard/style.module.scss
var LoadingProductCard_style_module = __webpack_require__(5818);
var LoadingProductCard_style_module_default = /*#__PURE__*/__webpack_require__.n(LoadingProductCard_style_module);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./component/LoadingProductCard/index.tsx
// @ts-ignore



const DEFAULT_ASPECT_RATIO = 120; //you may want to change the global css aspect-ratio after changing this

const index = ({
  type,
  price,
  footer,
  isVisible,
  aspect_ratio
}) => {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: `${(LoadingProductCard_style_module_default()).cardsContainer} ${(LoadingProductCard_style_module_default())[type]} no-shrink`,
    children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
      className: `${(LoadingProductCard_style_module_default()).cards}`,
      style: {
        paddingTop: `min(var(--max-card-height), calc(${aspect_ratio || DEFAULT_ASPECT_RATIO})*1%)`
      },
      children: /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: `${(LoadingProductCard_style_module_default()).container} ${isVisible && "animated"} `
      })
    }), price && /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: `${(LoadingProductCard_style_module_default()).description} max-width vertical-flex`,
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: `${(LoadingProductCard_style_module_default()).description2} ${(LoadingProductCard_style_module_default())[type]}`,
        children: ["p", /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: `${(LoadingProductCard_style_module_default()).after}`
        })]
      }), /*#__PURE__*/jsx_runtime_.jsx("button", {
        className: `${(LoadingProductCard_style_module_default()).buy} ${(LoadingProductCard_style_module_default())[type]} ${isVisible && "animated"}`,
        children: "buy "
      })]
    }) || footer && /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: `${(LoadingProductCard_style_module_default()).description2} ${(LoadingProductCard_style_module_default())[type]}`,
      children: ["p", /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: `${(LoadingProductCard_style_module_default()).after}`
      })]
    })]
  });
};

/* harmony default export */ const LoadingProductCard = (index);
// EXTERNAL MODULE: ./shared/UtilityFunctions.ts
var UtilityFunctions = __webpack_require__(5035);
// EXTERNAL MODULE: ./component/MyImage/index.tsx
var MyImage = __webpack_require__(3513);
;// CONCATENATED MODULE: ./component/ProductCard/index.tsx
// @ts-ignore








const ProductCard_DEFAULT_ASPECT_RATIO = 120; //you may want to change the global css aspect-ratio after changing this

const ProductCard_index = ({
  _id,
  type,
  price,
  index,
  footer,
  observer,
  isVisible,
  imageLink,
  productName,
  description,
  aspect_ratio,
  infoFieldIsOpen,
  setActiveOpenField
}) => {
  const {
    0: isLoading,
    1: setIsLoading
  } = (0,external_react_.useState)(true);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: `${(style_module_default()).cardsContainer} ${(style_module_default())[type]} no-shrink`,
    children: [isLoading && /*#__PURE__*/jsx_runtime_.jsx("div", {
      onClick: () => setIsLoading(false),
      children: /*#__PURE__*/jsx_runtime_.jsx(LoadingProductCard, {
        price: price,
        type: type,
        footer: footer,
        isVisible: isVisible,
        aspect_ratio: aspect_ratio
      })
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: `${isLoading && (style_module_default()).loading}`,
      children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
        className: `${(style_module_default()).cards}`,
        style: {
          paddingTop: `min(var(--max-card-height), calc(${aspect_ratio || ProductCard_DEFAULT_ASPECT_RATIO})*1%)`
        },
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: `${(style_module_default()).container}`,
          children: [/*#__PURE__*/jsx_runtime_.jsx("img", {
            src: "/svg/info.svg",
            alt: "more INformations",
            className: (style_module_default()).toggleInfoIcon,
            onClick: () => setActiveOpenField(prevState => prevState == index ? undefined : index)
          }), /*#__PURE__*/jsx_runtime_.jsx(MyLink/* default */.Z, {
            href: `/product/${_id}`,
            children: /*#__PURE__*/jsx_runtime_.jsx("div", {
              className: `${(style_module_default()).moreInfo}  ${infoFieldIsOpen && (style_module_default()).open} flex center-children`,
              children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                className: `${(style_module_default()).informations}`,
                children: [/*#__PURE__*/jsx_runtime_.jsx("h2", {
                  children: productName
                }), /*#__PURE__*/jsx_runtime_.jsx("p", {
                  children: description
                })]
              })
            })
          }), /*#__PURE__*/jsx_runtime_.jsx(MyLink/* default */.Z, {
            href: `/product/${_id}`,
            children: /*#__PURE__*/jsx_runtime_.jsx("div", {
              className: `${(style_module_default()).imageSection}`,
              children: /*#__PURE__*/jsx_runtime_.jsx(MyImage/* default */.Z, {
                imageLink: imageLink && imageLink[0],
                ASPECT_RATIO: aspect_ratio || ProductCard_DEFAULT_ASPECT_RATIO,
                isVisible: isVisible,
                observer: observer,
                onLoad: () => setIsLoading(false)
              })
            })
          })]
        })
      }), price && /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: `${(style_module_default()).description} ${(style_module_default())[type]} max-width`,
        children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
          className: `${(style_module_default()).price} ${(style_module_default())[type]}`,
          children: /*#__PURE__*/jsx_runtime_.jsx("p", {
            children: (0,UtilityFunctions/* formatPrice */.T4)(price)
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(MyLink/* default */.Z, {
          href: `/product/${_id}`,
          children: /*#__PURE__*/jsx_runtime_.jsx("button", {
            className: `${(style_module_default()).buy} ${(style_module_default())[type]}`,
            children: "buy"
          })
        })]
      }) || footer && /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: `${(style_module_default()).description} ${(style_module_default())[type]} max-width`,
        children: /*#__PURE__*/jsx_runtime_.jsx(MyLink/* default */.Z, {
          href: {
            pathname: "/find",
            query: {
              categories: footer.split(" ")
            }
          },
          children: /*#__PURE__*/jsx_runtime_.jsx("a", {
            style: {
              textDecoration: "underline"
            },
            children: footer
          })
        })
      })]
    })]
  });
};

/* harmony default export */ const ProductCard = (/*#__PURE__*/(0,external_react_.memo)(ProductCard_index));

/***/ }),

/***/ 3305:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6704);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_module_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ProductCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2180);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shared_CustomHooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8740);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
// @ts-ignore






const ProductListFlex = ({
  items
}) => {
  const {
    0: activeOpenField,
    1: setActiveOpenField
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
  const [visibilityIndex, observer, observerRef] = (0,_shared_CustomHooks__WEBPACK_IMPORTED_MODULE_2__/* .useIntersectionObserver */ .S1)("0px 100% 0px 0px");
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("div", {
    className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default().container),
    style: {
      fontSize: "1em"
    },
    ref: observerRef,
    children: items === null || items === void 0 ? void 0 : items.map((element, index) => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_ProductCard__WEBPACK_IMPORTED_MODULE_0__/* .default */ .Z, {
      // remenber to change this line once you build the back end
      index: index,
      type: "h-display",
      observer: observer,
      _id: element._id,
      price: element.price,
      footer: element.representation,
      imageLink: element.pr_image_url,
      productName: element.productName,
      description: element.description,
      isVisible: index < visibilityIndex,
      setActiveOpenField: setActiveOpenField,
      infoFieldIsOpen: activeOpenField == index
    }, element._id || index))
  }) // </div>
  ;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.memo)(ProductListFlex));

/***/ }),

/***/ 5818:
/***/ ((module) => {

// Exports
module.exports = {
	"cardsContainer": "style_cardsContainer__2lfX0",
	"h-display": "style_h-display__t4p_m",
	"cards": "style_cards__ONiNt",
	"container": "style_container__1apQ7",
	"description": "style_description__IOgmO",
	"description2": "style_description2__12h1p",
	"after": "style_after__3kFiI",
	"price": "style_price__MGwk_",
	"buy": "style_buy__39dFT"
};


/***/ }),

/***/ 5110:
/***/ ((module) => {

// Exports
module.exports = {
	"cardsContainer": "style_cardsContainer__2iZ-Z",
	"h-display": "style_h-display__3vvFs",
	"cards": "style_cards__2vdEh",
	"loading": "style_loading__FO-MS",
	"container": "style_container__99MT7",
	"imageSection": "style_imageSection__uXUc4",
	"moreInfo": "style_moreInfo__3RVow",
	"open": "style_open__er1AR",
	"toggleInfoIcon": "style_toggleInfoIcon__3aNKN",
	"informations": "style_informations__qBhvK",
	"description": "style_description__LpbHr",
	"price": "style_price__3sCt6",
	"buy": "style_buy__3YQZI"
};


/***/ }),

/***/ 6704:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "style_container__20GWy",
	"moreProduct": "style_moreProduct__28Ftn",
	"preset1": "style_preset1__1MfZ8"
};


/***/ })

};
;