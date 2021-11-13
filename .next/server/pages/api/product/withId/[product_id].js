"use strict";
(() => {
var exports = {};
exports.id = 169;
exports.ids = [169];
exports.modules = {

/***/ 8067:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "config": () => (/* binding */ config)
/* harmony export */ });
/* harmony import */ var _api_handlers_product__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9628);
/* harmony import */ var _api_middleware_mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9801);



const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      (0,_api_handlers_product__WEBPACK_IMPORTED_MODULE_0__/* .GET_WITH_ID_handler */ .O1)(req, res);
      break;

    case "PUT":
      (0,_api_handlers_product__WEBPACK_IMPORTED_MODULE_0__/* .PUT_handler */ .UD)(req, res);
      break;

    case "DELETE":
      (0,_api_handlers_product__WEBPACK_IMPORTED_MODULE_0__/* .DELETE_handler */ .vg)(req, res);
      break;

    default:
      res.json({
        message: "wrong method"
      });
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_api_middleware_mongodb__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z)(handler));
const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
};

/***/ }),

/***/ 6411:
/***/ ((module) => {

module.exports = require("cloudinary");

/***/ }),

/***/ 9722:
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ 5619:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [381,35,334,628], () => (__webpack_exec__(8067)));
module.exports = __webpack_exports__;

})();