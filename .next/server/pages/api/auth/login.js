"use strict";
(() => {
var exports = {};
exports.id = 908;
exports.ids = [908];
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

/***/ 8472:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ auth_login)
});

// EXTERNAL MODULE: external "jwt-decode"
var external_jwt_decode_ = __webpack_require__(6420);
var external_jwt_decode_default = /*#__PURE__*/__webpack_require__.n(external_jwt_decode_);
// EXTERNAL MODULE: ./_api/middleware/blockBot.ts + 1 modules
var blockBot = __webpack_require__(641);
// EXTERNAL MODULE: ./_api/middleware/helpers/index.js
var helpers = __webpack_require__(6771);
// EXTERNAL MODULE: ./_api/models/index.ts + 6 modules
var models = __webpack_require__(4151);
// EXTERNAL MODULE: ./_api/utils/jwt.js
var jwt = __webpack_require__(7286);
;// CONCATENATED MODULE: ./_api/handlers/auth/login.ts






const handle_login = async (req, res) => {
  try {
    const {
      username,
      password
    } = req.body; // @ts-ignore

    const user = await models/* User.findOne */.n5.findOne({
      username,
      Oauth: {
        $exists: false
      }
    }).lean();

    if (!user) {
      return res.status(403).json({
        message: "Wrong email or password."
      });
    }

    const passwordValid = await (0,jwt/* verifyPassword */.Gv)(password, user.password);

    if (passwordValid) {
      const {
        username,
        _id,
        role,
        cart,
        firstName,
        lastName
      } = user;
      const userInfo = {
        username,
        _id,
        role
      };
      const userData = {
        username,
        _id,
        role,
        cart,
        firstName,
        lastName
      };
      const token = (0,jwt/* createToken */.V3)(userInfo);
      const decodedToken = external_jwt_decode_default()(token);
      const expiresAt = decodedToken.exp;
      const saved_refreshToken = await (0,jwt/* createRefreshToken */.nE)(userInfo);
      res.setHeader("Set-Cookie", `z_model_23=${saved_refreshToken}; httpOnly ; secure; sameSite; path=/ ; Max-Age=${365 * 24 * 60 * 60}`);
      res.json({
        message: "Authentication successful!",
        token,
        userData,
        expiresAt
      });
    } else {
      res.status(403).json({
        message: "Wrong email or password."
      });
    }
  } catch (err) {
    //console.log(err)
    return res.json({
      message: "Something went wrong."
    });
  }
};

/* harmony default export */ const login = ((0,helpers/* createHandler */.o)(blockBot/* blockBot */.C, handle_login));
// EXTERNAL MODULE: ./_api/middleware/mongodb.ts
var mongodb = __webpack_require__(9801);
;// CONCATENATED MODULE: ./pages/api/auth/login.ts



const handler = async (req, res) => {
  if (req.method === "POST") {
    await login(req, res);
  } else {
    res.send({
      message: "I Thing you did something wrong"
    });
  }
};

/* harmony default export */ const auth_login = ((0,mongodb/* default */.Z)(handler));

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
var __webpack_exports__ = __webpack_require__.X(0, [460,286,641], () => (__webpack_exec__(8472)));
module.exports = __webpack_exports__;

})();