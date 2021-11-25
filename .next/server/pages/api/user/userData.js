"use strict";
(() => {
var exports = {};
exports.id = 116;
exports.ids = [116];
exports.modules = {

/***/ 9269:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ userData)
});

// EXTERNAL MODULE: ./_api/models/index.ts + 6 modules
var models = __webpack_require__(4151);
;// CONCATENATED MODULE: ./_api/handlers/user/_get.ts


const handle_get = async (req, res) => {
  //console.log(" I could reach here")
  const query = req.query;
  const user_id = query.user_id;

  if (user_id) {
    // @ts-ignore
    const {
      username,
      firstName,
      lastName,
      contact
    } = await models/* User.findById */.n5.findById({
      _id: req.user._id
    });
    return res.json({
      userData: {
        username,
        lastName,
        firstName,
        contact
      }
    });
  }

  if (!req.user) return res.status(501).json({
    message: "not enough power"
  });

  try {
    // @ts-ignore
    const {
      username,
      firstName,
      _id,
      lastName,
      cart,
      role,
      contact
    } = await models/* User.findById */.n5.findById({
      _id: req.user._id
    });
    res.json({
      userData: {
        firstName,
        username,
        lastName,
        contact,
        role,
        cart,
        _id
      }
    });
  } catch (err) {
    res.status(501).json({
      message: "something went wrong"
    });
  }
};

/* harmony default export */ const _get = (handle_get);
;// CONCATENATED MODULE: ./_api/handlers/user/_put.ts


const handle_put = async (req, res) => {
  const query = req.query;
  const body = req.body;

  if (query.field == "cart") {
    const updatedUser = await models/* User.updateOne */.n5.updateOne({
      _id: req.user._id,
      cart: {
        $ne: req.body._id
      }
    }, {
      $addToSet: {
        cart: body._id
      }
    });

    if (updatedUser.modifiedCount >= 1) {
      res.status(200).json({
        message: "success full update"
      });
    } else {
      res.status(501).json({
        message: "Item already exists"
      });
    }
  } else {
    const updatedUser = await models/* User.updateOne */.n5.updateOne({
      _id: req.user._id
    }, {
      $set: {
        firstName: body.firstName,
        username: body.username,
        lastName: body.lastName,
        contact: {
          phoneNumber: body.phoneNumber,
          email: body.email
        }
      }
    });

    if (updatedUser.modifiedCount >= 1) {
      res.status(200).json({
        message: "success full update"
      });
    } else {
      res.status(501).json({
        message: "Item already exists"
      });
    }
  }
};

/* harmony default export */ const _put = (handle_put);
;// CONCATENATED MODULE: ./_api/handlers/user/_delete.ts


const handle_delete = async (req, res) => {
  const query = req.query; // console.log(query)

  const updatedUser = await models/* User.updateOne */.n5.updateOne({
    _id: req.user._id
  }, {
    "$pull": {
      cart: query._id
    }
  }); // console.log(updatedUser);

  res.status(200).json({
    message: "success full update"
  });
};

/* harmony default export */ const _delete = (handle_delete);
// EXTERNAL MODULE: ./_api/middleware/addUser.ts
var addUser = __webpack_require__(6050);
// EXTERNAL MODULE: ./_api/middleware/helpers/index.js
var helpers = __webpack_require__(6771);
// EXTERNAL MODULE: ./_api/middleware/enforceRole.ts
var enforceRole = __webpack_require__(7398);
;// CONCATENATED MODULE: ./_api/handlers/user/index.ts





 // export const PUT_handler = PUT;

const GET_handler = (0,helpers/* createHandler */.o)(addUser/* addUser */.c, _get);
const PUT_handler = (0,helpers/* createHandler */.o)(addUser/* addUser */.c, (0,enforceRole/* enforceRole */.z)("user"), _put);
const DELETE_handler = (0,helpers/* createHandler */.o)(addUser/* addUser */.c, (0,enforceRole/* enforceRole */.z)("user"), _delete);
;
// EXTERNAL MODULE: ./_api/middleware/mongodb.ts
var mongodb = __webpack_require__(9801);
;// CONCATENATED MODULE: ./pages/api/user/userData.ts



const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      await GET_handler(req, res);
      break;

    case "PUT":
      await PUT_handler(req, res);
      break;

    case "DELETE":
      await DELETE_handler(req, res);
      break;

    default:
      res.send(404).send({
        message: "wrong method"
      });
  }
};

/* harmony default export */ const userData = ((0,mongodb/* default */.Z)(handler));

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [460,334], () => (__webpack_exec__(9269)));
module.exports = __webpack_exports__;

})();