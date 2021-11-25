"use strict";
(() => {
var exports = {};
exports.id = 240;
exports.ids = [240];
exports.modules = {

/***/ 7963:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ feedback)
});

// EXTERNAL MODULE: ./_api/models/index.ts + 6 modules
var models = __webpack_require__(4151);
;// CONCATENATED MODULE: ./_api/handlers/feedback/_get.ts


const handle_get = async (req, res) => {
  const error = []; //console.log("This is a get request")

  const mongo_response = await models/* Feedback.find */.x2.find().lean().catch(err => error.push(err.message));
  res.json({
    mongo_response,
    error
  });
};

/* harmony default export */ const _get = (handle_get);
;// CONCATENATED MODULE: ./_api/handlers/feedback/_post.ts


const handle_post = async (req, res) => {
  const {
    msg,
    focus
  } = req.body;
  const error = [];
  const mongo_response = await models/* Feedback.create */.x2.create({
    msg,
    focus
  }).catch(err => error.push(err.message));
  res.send({
    message: "feedback successfuly added",
    mongo_response,
    error
  });
};

/* harmony default export */ const _post = (handle_post);
;// CONCATENATED MODULE: ./_api/handlers/feedback/_delete.ts


const handle_delete = async (req, res) => {
  const {
    _id
  } = req.query;
  const error = [];
  if (!_id) return res.send("error: _id field is missing in query");
  const mongo_response = await models/* Feedback.findByIdAndDelete */.x2.findByIdAndDelete(_id).catch(err => error.push(err.message));
  res.send({
    message: "feedback successfully deleted",
    mongo_response,
    error
  });
};

/* harmony default export */ const _delete = (handle_delete);
// EXTERNAL MODULE: ./_api/middleware/helpers/index.js
var helpers = __webpack_require__(6771);
// EXTERNAL MODULE: ./_api/middleware/addUser.ts
var addUser = __webpack_require__(6050);
// EXTERNAL MODULE: ./_api/middleware/enforceRole.ts
var enforceRole = __webpack_require__(7398);
;// CONCATENATED MODULE: ./_api/handlers/feedback/index.ts
// import PUT from "./_put";





 // export const PUT_handler = PUT;

const GET_handler = (0,helpers/* createHandler */.o)(addUser/* addUser */.c, (0,enforceRole/* enforceRole */.z)("admin"), _get);
const POST_handler = (0,helpers/* createHandler */.o)(addUser/* addUser */.c, _post);
const DELETE_handler = (0,helpers/* createHandler */.o)(addUser/* addUser */.c, (0,enforceRole/* enforceRole */.z)("admin"), _delete);
// EXTERNAL MODULE: ./_api/middleware/mongodb.ts
var mongodb = __webpack_require__(9801);
;// CONCATENATED MODULE: ./pages/api/feedback/index.ts



const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      //console.log("get")
      await GET_handler(req, res);
      break;

    case "POST":
      //console.log("post")
      await POST_handler(req, res);
      break;

    case "DELETE":
      //console.log("delete")
      await DELETE_handler(req, res);
      break;

    default:
      res.send(404).send({
        message: "wrong method"
      });
  }
};

/* harmony default export */ const feedback = ((0,mongodb/* default */.Z)(handler));

/***/ }),

/***/ 334:
/***/ ((module) => {

module.exports = require("dotenv");

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
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [460,334], () => (__webpack_exec__(7963)));
module.exports = __webpack_exports__;

})();