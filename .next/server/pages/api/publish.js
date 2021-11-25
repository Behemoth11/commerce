"use strict";
(() => {
var exports = {};
exports.id = 668;
exports.ids = [668];
exports.modules = {

/***/ 3140:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ publish)
});

// EXTERNAL MODULE: external "mongoose"
var external_mongoose_ = __webpack_require__(5619);
// EXTERNAL MODULE: ./_api/models/index.ts + 6 modules
var models = __webpack_require__(4151);
;// CONCATENATED MODULE: ./_api/handlers/publish/_get.ts



const handle_get = async (req, res) => {
  var _query$field;

  const body = req.body;
  const query = req.query;
  let posts;
  let error;

  switch (query.which) {
    case "mine":
      if (!req.user) return res.status(500).json({
        message: "you need to be connected to see your groups"
      });

      if ((_query$field = query["field[]"]) !== null && _query$field !== void 0 && _query$field.includes("grouping")) {
        posts = await models/* FacebookPost.find */.Hu.find({
          owner: new external_mongoose_.Types.ObjectId(req.user._id)
        }, query["field[]"]).limit(query.limit || 20).populate("grouping", ["pr_image_url", "productName"]).lean();
      } else {
        posts = await models/* FacebookPost.find */.Hu.find({
          owner: new external_mongoose_.Types.ObjectId(req.user._id)
        }, query["field[]"]).limit(query.limit || 20).lean();
      }

      res.status(200).json({
        posts
      });
      break;

    case "with_id":
      if (!req.user) return res.status(500).json({
        message: "you need to be connected to see your groups"
      });
      const post = await models/* FacebookPost.findOne */.Hu.findOne({
        owner: new external_mongoose_.Types.ObjectId(req.user._id),
        _id: new external_mongoose_.Types.ObjectId(req.query._id)
      });

      if (post) {
        res.status(200).json({
          post
        });
      } else {
        res.status(404).json({
          message: "item not found"
        });
      }

      break;

    default:
      posts = await models/* FacebookPost.find */.Hu.find({
        "published.kdshop": true
      }, query["field[]"]).limit(query.limit || 20).lean();
      return res.status(200).json({
        posts
      });
  }
};

/* harmony default export */ const _get = (handle_get);
// EXTERNAL MODULE: ./shared/UtilityFunctions.ts
var UtilityFunctions = __webpack_require__(5035);
// EXTERNAL MODULE: ./_api/utils/facebook_fn/post_with_photo_m.ts
var post_with_photo_m = __webpack_require__(1293);
;// CONCATENATED MODULE: ./_api/handlers/publish/_post.ts





const handle_post = async (req, res) => {
  const data = req.body;
  const target = req.query.target;

  switch (target) {
    case "group_post":
      const product_ids = data["ids[]"];
      const item_group = await models/* FacebookPost.create */.Hu.create({
        grouping: product_ids,
        published: {
          kdshop: data.publish_kdshop,
          fb: data.publish_facebook
        },
        owner: req.user._id,
        message: data.message,
        post_name: data.post_name
      }).catch(err => console.log(err.message));

      if (data.publish_facebook) {
        const post_picture = await models/* Product.find */.xs.find({
          _id: product_ids.map(Id => new external_mongoose_.Types.ObjectId(Id))
        }, ["pr_image_url"]).lean();
        const url = (0,UtilityFunctions/* formatUrl */.CN)(post_picture.map(item => item.pr_image_url[0]));
        const facebook_post = await (0,post_with_photo_m/* default */.Z)(item_group.message, ...url);
        const final = await models/* FacebookPost.updateOne */.Hu.updateOne({
          _id: item_group._id
        }, {
          $set: {
            fb_id: facebook_post.id
          }
        }).catch(err => console.log(err.message)); // console.log(final);
      }

      return res.status(200).json({
        message: "it was a success",
        post_id: item_group._id.toString()
      });

    case "single":
      let url = data.url;

      if (!url) {
        const product = await models/* Product.findOne */.xs.findOne({
          _id: new external_mongoose_.Types.ObjectId(data._id)
        }, "pr_image_url").lean().catch(err => console.log(err));
        url = product.pr_image_url && product.pr_image_url[0];
      }

      if (!url) return res.status(200).json({
        message: "we had issues finding the picture"
      });
      const message_root = data.message || `nous avons un nouvel articles. Suivez le lien pour plus de ${data.nature}`;
      const message_template = `https://${data.host || process.env.VERCEL_URL}/product/${data._id}`;
      const message = message_root + "\n" + message_template;
      const result = await (0,post_with_photo_m/* default */.Z)(message, "https://res.cloudinary.com/dkoatnxem/image/upload/" + url).catch(err => console.log(err.message));

      if (result.id) {
        return res.status(200).json({
          post_id: result.id
        });
      } else {
        return res.status(404).json({
          message: "something wen wrong"
        });
      }

      break;
  }
};

/* harmony default export */ const _post = (handle_post);
;// CONCATENATED MODULE: ./_api/handlers/publish/_put.ts




const handle_put = async (req, res) => {
  try {
    const query = req.query;
    const body = req.body;
    const action = query.action;
    const post_ids_string = (0,UtilityFunctions/* string_and_array_to_array */.j6)(query["post_ids[]"]);
    const post_ids = post_ids_string.map(id => new external_mongoose_.Types.ObjectId(id));

    switch (action) {
      case "add_to_set":
        console.log(body.update);
        const mongo_response = await models/* FacebookPost.updateMany */.Hu.updateMany({
          _id: {
            $in: post_ids
          },
          owner: new external_mongoose_.Types.ObjectId(req.user._id)
        }, {
          $addToSet: body.update
        });

        if (mongo_response.modifiedCount > 0) {
          return res.status(200).json({
            message: "The Post was updated"
          });
        } else if (mongo_response.matchedCount === 0) {
          return res.status(404).json({
            message: "the item to update does not exist"
          });
        } else if (mongo_response.modifiedCount === 0 && mongo_response.matchedCount >= 1) {
          return res.status(409).json({
            message: "the item is already in the group"
          });
        } else {
          return res.status(404).json({
            message: "something went wrong"
          });
        }

      case "update_field":
        delete body.update.fb_id;
        delete body.update.owner;
        const mongo_response_1 = await models/* FacebookPost.updateMany */.Hu.updateMany({
          _id: {
            $in: post_ids
          },
          owner: new external_mongoose_.Types.ObjectId(req.user._id)
        }, {
          $set: body.update
        }).catch(err => err.message);

        if (mongo_response_1.modifiedCount > 0) {
          return res.status(200).json({
            message: "The Post was updated"
          });
        } else if (mongo_response_1.matchedCount === 0) {
          return res.status(404).json({
            message: "the item to update does not exist"
          });
        } else {
          return res.status(404).json({
            message: "something went wrong"
          });
        }

      default:
        return res.status(404).json({
          message: "unknown operation"
        });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      int: "The ids passed must have been wrong"
    });
  }
};

/* harmony default export */ const _put = (handle_put);
;// CONCATENATED MODULE: ./_api/handlers/publish/_delete.ts



const handle_delete = async (req, res) => {
  try {
    const query = req.query;
    const post_id = req.query.post_id;
    const m_r = await models/* FacebookPost.deleteOne */.Hu.deleteOne({
      _id: new external_mongoose_.Types.ObjectId(post_id),
      owner: req.user._id
    });

    if (m_r.deletedCount > 0) {
      return res.status(200).json({
        message: "success"
      });
    } else {
      return res.status(404).json({
        message: "item was not found"
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};

/* harmony default export */ const _delete = (handle_delete);
// EXTERNAL MODULE: ./_api/middleware/helpers/index.js
var helpers = __webpack_require__(6771);
// EXTERNAL MODULE: ./_api/middleware/addUser.ts
var addUser = __webpack_require__(6050);
// EXTERNAL MODULE: ./_api/middleware/enforceRole.ts
var enforceRole = __webpack_require__(7398);
;// CONCATENATED MODULE: ./_api/handlers/publish/index.ts
// import PUT from "./_put";






 // export const PUT_handler = PUT;

const GET_handler = (0,helpers/* createHandler */.o)(addUser/* addUser */.c, _get);
const POST_handler = (0,helpers/* createHandler */.o)(addUser/* addUser */.c, (0,enforceRole/* enforceRole */.z)("seller"), _post);
const DELETE_handler = (0,helpers/* createHandler */.o)(addUser/* addUser */.c, (0,enforceRole/* enforceRole */.z)("seller"), _delete);
const PUT_handler = (0,helpers/* createHandler */.o)(addUser/* addUser */.c, (0,enforceRole/* enforceRole */.z)("seller"), _put);
// EXTERNAL MODULE: ./_api/middleware/mongodb.ts
var mongodb = __webpack_require__(9801);
;// CONCATENATED MODULE: ./pages/api/publish.ts



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

    case "PUT":
      //console.log("delete")
      await PUT_handler(req, res);
      break;

    default:
      res.status(404).send({
        message: "wrong method"
      });
  }
};

/* harmony default export */ const publish = ((0,mongodb/* default */.Z)(handler));

/***/ }),

/***/ 2376:
/***/ ((module) => {

module.exports = require("axios");

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

/***/ }),

/***/ 6850:
/***/ ((module) => {

module.exports = require("qs");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [460,35,334,293], () => (__webpack_exec__(3140)));
module.exports = __webpack_exports__;

})();