"use strict";
(() => {
var exports = {};
exports.id = 912;
exports.ids = [912];
exports.modules = {

/***/ 7098:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ google)
});

// EXTERNAL MODULE: external "jwt-decode"
var external_jwt_decode_ = __webpack_require__(6420);
var external_jwt_decode_default = /*#__PURE__*/__webpack_require__.n(external_jwt_decode_);
// EXTERNAL MODULE: ./_api/models/index.ts + 6 modules
var models = __webpack_require__(4151);
// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(2376);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
;// CONCATENATED MODULE: external "googleapis"
const external_googleapis_namespaceObject = require("googleapis");
;// CONCATENATED MODULE: ./_api/utils/google_auth.ts



const getUrl = () => {
  let ssl;

  if (process.env.VERCEL_ENV == "development") {
    ssl = "http://";
  } else if (process.env.VERCEL_ENV == "production") {
    ssl = "https://";
  } else if (process.env.VERCEL_ENV == "preview") {
    ssl = "https://";
    return `https://commerce-behemoth11.vercel.app/api/auth/google`;
  }

  const url = ssl + process.env.VERCEL_URL + "/api/auth/google";
  return url;
};

const oauth2Client = new external_googleapis_namespaceObject.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, getUrl());
function getGoogleAuthURL() {
  const scopes = ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"];
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes // If you only need one scope you can pass it as string

  });
}
async function getGoogleUser({
  code
}) {
  console.log("Just before the supects");
  const {
    tokens
  } = await oauth2Client.getToken(code);
  console.log("Just after the suspect "); // Fetch the user's profile with the access token and bearer

  let response;
  response = await external_axios_default().get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`, {
    headers: {
      Authorization: `Bearer ${tokens.id_token}`
    }
  }).catch(error => {
    throw new Error(error.response);
  });
  return response.data;
}
// EXTERNAL MODULE: ./_api/utils/jwt.js
var jwt = __webpack_require__(7286);
;// CONCATENATED MODULE: ./_api/handlers/auth/google_login.ts




const google_url = getGoogleAuthURL();

const handle_google_login = async (req, res) => {
  const code = req.query.code;

  if (code) {
    try {
      const user = await getGoogleUser({
        code
      });
      const {
        id,
        given_name,
        name,
        email,
        family_name
      } = user;
      const myUser = {
        firstName: "",
        username: email,
        role: "user",
        lastName: family_name,
        Oauth: {
          method: "google",
          id
        },
        contact: {
          email: email
        },
        cart: []
      };
      const mongo_response = await models/* User.findOneAndUpdate */.n5.findOneAndUpdate({
        "Oauth.method": "google",
        "Oauth.id": id
      }, {
        $setOnInsert: myUser
      }, {
        upsert: true,
        new: true
      });
      const token = (0,jwt/* createToken */.V3)(mongo_response);
      const decodedToken = external_jwt_decode_default()(token); // @ts-ignore
      // const expiresAt = decodedToken.exp;

      const refreshToken = await (0,jwt/* createRefreshToken */.nE)(mongo_response);
      res.setHeader("Set-Cookie", `z_model_23=${refreshToken}; httpOnly ; secure; sameSite; path=/ ; Max-Age=${365 * 24 * 60 * 60}`);
      res.send(`
        <!DOCTYPE html>
        <html>
            <script>
            localStorage.setItem("meta_64","1")
            window.close()
            </script>
        </html>`);
      return;
    } catch (error) {
      return res.json({
        message: "we couldn't log you in",
        error: error.message
      });
    }
  }

  res.send({
    url: google_url
  });
};

/* harmony default export */ const google_login = (handle_google_login);
// EXTERNAL MODULE: ./_api/middleware/mongodb.ts
var mongodb = __webpack_require__(9801);
;// CONCATENATED MODULE: ./pages/api/auth/google.ts



const handler = async (req, res) => {
  // return res.send("This is the handpoing")
  if (req.method === "GET") {
    await google_login(req, res);
  } else {
    res.send({
      message: "I Thing you did something wrong"
    });
  }
};

/* harmony default export */ const google = ((0,mongodb/* default */.Z)(handler));

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
var __webpack_exports__ = __webpack_require__.X(0, [460,286], () => (__webpack_exec__(7098)));
module.exports = __webpack_exports__;

})();