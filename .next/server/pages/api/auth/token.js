"use strict";
(() => {
var exports = {};
exports.id = 974;
exports.ids = [974];
exports.modules = {

/***/ 1706:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ token)
});

// EXTERNAL MODULE: ./_api/models/index.ts + 6 modules
var models = __webpack_require__(4151);
// EXTERNAL MODULE: ./_api/utils/jwt.js
var jwt = __webpack_require__(7286);
// EXTERNAL MODULE: external "jsonwebtoken"
var external_jsonwebtoken_ = __webpack_require__(9722);
var external_jsonwebtoken_default = /*#__PURE__*/__webpack_require__.n(external_jsonwebtoken_);
// EXTERNAL MODULE: external "jwt-decode"
var external_jwt_decode_ = __webpack_require__(6420);
var external_jwt_decode_default = /*#__PURE__*/__webpack_require__.n(external_jwt_decode_);
;// CONCATENATED MODULE: ./_api/handlers/auth/refreshToken.ts





const handle_refresh = async (req, res) => {
  const refreshToken = req.cookies.z_model_23;

  try {
    let error;

    if (!refreshToken) {
      return res.status(406).json({
        message: "You do not deserve a token, you filfy human ahahah"
      });
    }

    const savedToken = await models/* RefreshToken.findOneAndDelete */.E6.findOneAndDelete({
      token: refreshToken
    }).catch(err => error = err);
    if (!savedToken) return res.status(406).json({
      message: "Something went wrong 1"
    });
    let decodedToken;

    try {
      decodedToken = external_jsonwebtoken_default().verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
    } catch (error) {
      //console.log(error);
      return res.status(406).json({
        message: "why are you trying to hack me"
      });
    } //console.log("the decodet token is", decodedToken);


    if (!decodedToken) return res.status(501).json({
      message: "Something went wrong 2"
    });
    const {
      username,
      _id,
      role
    } = decodedToken;
    const user = {
      username,
      _id,
      role
    };
    const newAccessToken = (0,jwt/* createToken */.V3)(user);
    const newDecodedToken = external_jwt_decode_default()(newAccessToken); // @ts-ignore

    const expiresAt = newDecodedToken.exp;
    const newRefreshToken = await (0,jwt/* createRefreshToken */.nE)(user);

    if (!newRefreshToken) {
      return res.status(501).json({
        message: "we couldn't refresh the token"
      });
    } //console.log(newRefreshToken);
    // //console.log("I was asked to give a new refresh token")


    res.setHeader("Set-Cookie", `z_model_23=${newRefreshToken}; httpOnly ; secure; sameSite; path=/; Max-Age=${365 * 24 * 60 * 60}`);
    res.json({
      message: "Authentication refresh successful!",
      token: newAccessToken,
      expiresAt
    });
  } catch (err) {//console.log(err)
  }
};

/* harmony default export */ const refreshToken = (handle_refresh);
// EXTERNAL MODULE: ./_api/middleware/mongodb.ts
var mongodb = __webpack_require__(9801);
;// CONCATENATED MODULE: ./pages/api/auth/token.ts



const handler = async (req, res) => {
  if (req.method === "GET") {
    await refreshToken(req, res);
  } else {
    res.send({
      message: "I Thing you did something wrong"
    });
  }
};

/* harmony default export */ const token = ((0,mongodb/* default */.Z)(handler));

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
var __webpack_exports__ = __webpack_require__.X(0, [460,286], () => (__webpack_exec__(1706)));
module.exports = __webpack_exports__;

})();