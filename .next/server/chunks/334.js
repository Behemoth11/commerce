"use strict";
exports.id = 334;
exports.ids = [334];
exports.modules = {

/***/ 9770:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "m": () => (/* binding */ role_dic)
/* harmony export */ });
const role_dic = {
  user: 0,
  seller: 200,
  admin: 1000
};
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ({
  role_dic
});

/***/ }),

/***/ 6050:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "c": () => (/* binding */ addUser)
/* harmony export */ });
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9722);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);

const addUser = (req, res, cb) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    req.user = null;
    return cb(req, res);
  }

  const token = authorization;
  jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      req.user = null;
      cb(req, res);
      return;
    }

    req.user = user;
    cb(req, res);
  });
};

/***/ }),

/***/ 7398:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "z": () => (/* binding */ enforceRole)
/* harmony export */ });
/* harmony import */ var _GLOBALVARIABLE__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9770);

const enforceRole = role => (req, res, cb) => {
  if (!req.user || !req.user.role) {
    return res.status(400).send({
      message: "insufficiant authorization"
    });
  } else if (_GLOBALVARIABLE__WEBPACK_IMPORTED_MODULE_0__/* .role_dic */ .m[req.user.role] >= _GLOBALVARIABLE__WEBPACK_IMPORTED_MODULE_0__/* .role_dic */ .m[role]) {
    cb(req, res);
  } else {
    // console.log("third one one")
    res.status(400).send({
      message: "insufficiant authorization"
    });
  }
};

/***/ }),

/***/ 6771:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": () => (/* binding */ createHandler)
/* harmony export */ });
/* unused harmony export createCustomMiddlewareChain */
const createHandler = (...args) => {
  const current_middleware = args.shift();
  if (args.length == 0) return (req, res) => {
    current_middleware(req, res);
  };
  return (req, res) => {
    current_middleware(req, res, createHandler(...args));
  };
};
const createCustomMiddlewareChain = (...args) => {
  return handler => createHandler(...args, handler);
};

/***/ })

};
;