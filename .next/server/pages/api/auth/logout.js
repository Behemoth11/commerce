"use strict";
(() => {
var exports = {};
exports.id = 845;
exports.ids = [845];
exports.modules = {

/***/ 8996:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ auth_logout)
});

// EXTERNAL MODULE: ./_api/models/index.ts + 5 modules
var models = __webpack_require__(9904);
;// CONCATENATED MODULE: ./_api/handlers/auth/logout.ts


const handle_logout = async (req, res) => {
  const cookies = req.cookies;
  const erasedToken = await models/* RefreshToken.findOneAndDelete */.E6.findOneAndDelete({
    token: cookies.z_model_23
  }); // console.log(erasedToken);
  // console.log(cookies);
  // console.log(cookies.z_model_23);

  if (erasedToken) {
    res.setHeader("Set-Cookie", `z_model_23=bye; httpOnly ; secure; sameSite; path=/ ; Max-Age=${365 * 24 * 60 * 60}`);
    res.json({
      message: "successul logout"
    });
  } else {
    res.status(404).json({
      message: "we could not remove your session"
    });
  }
}; // export default createHandler(addUser, enforceRole("user"), handle_logout);


/* harmony default export */ const logout = (handle_logout);
// EXTERNAL MODULE: ./_api/middleware/mongodb.ts
var mongodb = __webpack_require__(9801);
;// CONCATENATED MODULE: ./pages/api/auth/logout.ts



const handler = async (req, res) => {
  if (req.method === "POST") {
    logout(req, res);
  } else {
    res.send({
      message: "I Thing you did something wrong"
    });
  }
};

/* harmony default export */ const auth_logout = ((0,mongodb/* default */.Z)(handler));

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
var __webpack_exports__ = __webpack_require__.X(0, [381], () => (__webpack_exec__(8996)));
module.exports = __webpack_exports__;

})();