"use strict";
(() => {
var exports = {};
exports.id = 576;
exports.ids = [576];
exports.modules = {

/***/ 9704:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ facebook)
});

// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(2376);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
// EXTERNAL MODULE: external "jwt-decode"
var external_jwt_decode_ = __webpack_require__(6420);
var external_jwt_decode_default = /*#__PURE__*/__webpack_require__.n(external_jwt_decode_);
// EXTERNAL MODULE: ./_api/models/index.ts + 6 modules
var models = __webpack_require__(4151);
// EXTERNAL MODULE: ./_api/utils/jwt.js
var jwt = __webpack_require__(7286);
;// CONCATENATED MODULE: ./_api/handlers/auth/facebook_login.ts





const handle_facebook_login = async (req, res) => {
  const body = req.body; // console.log(body.accessToken)

  const uri = `https://graph.facebook.com/v8.0/me?field=username,first_name,last_name&access_token=${body.accessToken}`;
  let response;
  response = await external_axios_default().get(uri).catch(err => err.response);
  const {
    id,
    name,
    firstName,
    lastName
  } = response.data;
  const myUser = {
    password: "facebook",
    role: "user",
    Oauth: {
      method: "facebook",
      id
    },
    cart: [],
    firstName: firstName,
    lastName: lastName,
    username: name
  };
  let mongo_response = await models/* User.findOneAndUpdate */.n5.findOneAndUpdate({
    "Oauth.method": "facebook",
    "Oauth.id": id
  }, {
    $setOnInsert: myUser
  }, {
    upsert: true,
    new: true
  }).catch(err => console.log(err.message));
  const token = (0,jwt/* createToken */.V3)(mongo_response);
  const decodedToken = external_jwt_decode_default()(token); // @ts-ignore

  const expiresAt = decodedToken.exp;
  const refreshToken = await (0,jwt/* createRefreshToken */.nE)(mongo_response);
  res.setHeader("Set-Cookie", `z_model_23=${refreshToken}; httpOnly ; secure; sameSite; path=/ ; Max-Age=${365 * 24 * 60 * 60}`); // @ts-ignore

  const {
    username,
    role,
    cart,
    _id
  } = mongo_response;
  const userData = {
    firstName,
    lastName,
    username,
    role,
    cart,
    _id
  };
  res.send({
    userData,
    token: {
      value: token,
      expiresAt
    }
  });
  return;
};

/* harmony default export */ const facebook_login = (handle_facebook_login);
// EXTERNAL MODULE: ./_api/middleware/mongodb.ts
var mongodb = __webpack_require__(9801);
;// CONCATENATED MODULE: ./pages/api/auth/facebook.ts



const handler = async (req, res) => {
  // return res.send("This is the handpoing")
  if (req.method === "POST") {
    await facebook_login(req, res);
  } else {
    res.send({
      message: "I Thing you did something wrong"
    });
  }
};

/* harmony default export */ const facebook = ((0,mongodb/* default */.Z)(handler));

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
var __webpack_exports__ = __webpack_require__.X(0, [460,286], () => (__webpack_exec__(9704)));
module.exports = __webpack_exports__;

})();