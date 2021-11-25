"use strict";
(() => {
var exports = {};
exports.id = 7;
exports.ids = [7];
exports.modules = {

/***/ 6771:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": () => (/* binding */ createHandler)
/* harmony export */ });
/* unused harmony export createCustomMiddlewareChain */
const createHandler = (...args) => {
  const current_middleware = args.shift();
  if (args.length == 0) return async (req, res) => {
    await current_middleware(req, res);
  };
  return async (req, res) => {
    await current_middleware(req, res, createHandler(...args));
  };
};
const createCustomMiddlewareChain = (...args) => {
  return handler => createHandler(...args, handler);
};

/***/ }),

/***/ 5169:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ auth_register)
});

// EXTERNAL MODULE: ./_api/models/index.ts + 6 modules
var models = __webpack_require__(4151);
// EXTERNAL MODULE: external "jwt-decode"
var external_jwt_decode_ = __webpack_require__(6420);
var external_jwt_decode_default = /*#__PURE__*/__webpack_require__.n(external_jwt_decode_);
// EXTERNAL MODULE: ./_api/utils/jwt.js
var jwt = __webpack_require__(7286);
// EXTERNAL MODULE: ./_api/middleware/helpers/index.js
var helpers = __webpack_require__(6771);
// EXTERNAL MODULE: ./_api/middleware/blockBot.ts + 1 modules
var blockBot = __webpack_require__(641);
;// CONCATENATED MODULE: ./_api/handlers/auth/register.ts






const handle_register = async (req, res) => {
  try {
    const {
      username,
      firstName,
      lastName
    } = req.body;
    const hashedPassword = await (0,jwt/* hashPassword */.c_)(req.body.password);
    const userData = {
      username,
      firstName,
      lastName,
      password: hashedPassword,
      role: "user"
    };
    const existingUser = await models/* User.findOne */.n5.findOne({
      username: userData.username
    }).lean();

    if (existingUser) {
      return res.status(400).json({
        message: "Username already in use "
      });
    } // @ts-ignore


    const savedUser = await models/* User.create */.n5.create(userData);

    if (savedUser) {
      const token = (0,jwt/* createToken */.V3)(savedUser);
      const decodedToken = external_jwt_decode_default()(token); // @ts-ignore

      const expiresAt = decodedToken.exp;
      const refreshToken = await (0,jwt/* createRefreshToken */.nE)(savedUser);
      res.setHeader("Set-Cookie", `z_model_23=${refreshToken}; httpOnly ; secure; sameSite; path=/ ; Max-Age=${365 * 24 * 60 * 60}`);
      const {
        firstName,
        lastName,
        username,
        role,
        cart,
        _id
      } = savedUser;
      const userData = {
        firstName,
        lastName,
        username,
        role,
        cart,
        _id
      };
      return res.json({
        message: "User Created!",
        token,
        userData,
        expiresAt
      });
    } else {
      return res.status(400).json({
        message: "There was a problem creating your account"
      });
    }
  } catch (err) {
    //console.log(err);
    return res.status(400).json({
      message: "There was a problem creating your account",
      err
    });
  }
};

/* harmony default export */ const register = ((0,helpers/* createHandler */.o)(blockBot/* blockBot */.C, handle_register));
// EXTERNAL MODULE: ./_api/middleware/mongodb.ts
var mongodb = __webpack_require__(9801);
;// CONCATENATED MODULE: ./pages/api/auth/register.ts



const handler = async (req, res) => {
  if (req.method === "POST") {
    await register(req, res);
  } else {
    res.send({
      message: "I Thing you did something wrong"
    });
  }
};

/* harmony default export */ const auth_register = ((0,mongodb/* default */.Z)(handler));

/***/ }),

/***/ 2376:
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ 6552:
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ 334:
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ 9722:
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ 6420:
/***/ ((module) => {

module.exports = require("jwt-decode");

/***/ }),

/***/ 5619:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [460,286,641], () => (__webpack_exec__(5169)));
module.exports = __webpack_exports__;

})();