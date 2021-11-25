"use strict";
exports.id = 504;
exports.ids = [504];
exports.modules = {

/***/ 8504:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "vg": () => (/* binding */ DELETE_handler),
  "O1": () => (/* binding */ GET_WITH_ID_handler),
  "ip": () => (/* binding */ GET_WITH_REPRESENTATION_handler),
  "Ds": () => (/* binding */ GET_handler),
  "L": () => (/* binding */ POST_handler),
  "UD": () => (/* binding */ PUT_handler)
});

// EXTERNAL MODULE: ./_api/middleware/blockBot.ts + 1 modules
var blockBot = __webpack_require__(641);
// EXTERNAL MODULE: external "mongoose"
var external_mongoose_ = __webpack_require__(5619);
// EXTERNAL MODULE: ./_api/models/index.ts + 6 modules
var models = __webpack_require__(4151);
// EXTERNAL MODULE: external "cloudinary"
var external_cloudinary_ = __webpack_require__(6411);
;// CONCATENATED MODULE: ./_api/utils/cloudinary.ts

external_cloudinary_.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
/* harmony default export */ const utils_cloudinary = ((/* unused pure expression or super */ null && (cloudinary)));
const upload = async (image, error) => {
  const productLocation = "KdShop/" + new Date().getTime();

  const _response = await external_cloudinary_.v2.uploader.upload(image, {
    public_id: productLocation
  }).catch(err => error.push(err.message));

  return _response;
};
/**********Cloudinary upload**************/

const uploadMany = async (data, error, not_uploaded) => {
  if (!data) return error.push("The data provided does not contain pictures");
  const _imagePromise = [];

  for (let i = 0; i < data.length; i++) {
    const isOnMyServer = new RegExp("https://res.cloudinary.com/dkoatnxem").test(data[i].slice(0, 50));

    if (isOnMyServer) {
      const image_url = data[i].split("image/upload/")[1];
      not_uploaded[image_url] = true;
      _imagePromise[i] = {
        public_id: image_url
      };
    } else {
      _imagePromise[i] = await upload(data[i], error).catch(err => error.push(err.message));
    }
  }

  const _response = await Promise.all(_imagePromise).catch(err => error.push(err.message)); //@ts-ignore


  return _response.map(element => element.public_id);
};
const eraseImages = async (images, error) => {
  const promises = images.map(async image => await external_cloudinary_.v2.uploader.destroy(image));
  const result = await Promise.all(promises).catch(err => error.push(err.message));
  return result;
};
// EXTERNAL MODULE: ./_api/utils/facebook_fn/post_with_photo_m.ts
var post_with_photo_m = __webpack_require__(1293);
;// CONCATENATED MODULE: ./_api/handlers/product/_put.ts
// import model_name from "../../models/file_name";





const handle_put = async (req, res) => {
  const data = req.body;
  const _id = req.query.product_id;
  const error = [];
  const not_changed = {};
  const old_images = data.pr_image_url.concat(data.all_pr_image_url);
  const mongo_product = await models/* Product.findOne */.xs.findOne({
    _id: new external_mongoose_.Types.ObjectId(_id)
  }).lean(); //@ts-ignore

  if (mongo_product.owner != req.user._id && req.user.role != "admin") {
    return res.status(401).json({
      message: "you can only modiy items you ownn"
    });
  }

  const [pr_image_url, all_pr_image_url] = await Promise.all([uploadMany(data["presentationImage"], error, not_changed), uploadMany(data["images"], error, not_changed)]);
  const erase = await eraseImages(old_images.filter(image => !not_changed[image]), error);
  const meta = data.meta;

  if (meta !== null && meta !== void 0 && meta.create_post) {
    const message_root = data.meta.message || `nous avons un nouvel articles. Suivez le lien pour plus de ${data.categories[0]}`;
    const message_template = `${data.meta.host}/product/${_id}`;
    const message = message_root + "\n" + message_template;
    const response = await (0,post_with_photo_m/* default */.Z)(message, "https://res.cloudinary.com/dkoatnxem/image/upload/" + pr_image_url[0]);
  }

  if (meta !== null && meta !== void 0 && meta.post_with_group) {
    const mongo_response = await models/* FacebookPost.updateMany */.Hu.updateMany({
      _id: {
        $in: meta.group_selection
      },
      owner: new external_mongoose_.Types.ObjectId(req.user._id)
    }, {
      $addToSet: {
        grouping: _id
      }
    }); // console.log(mongo_response);
  }

  if (req.user.role != "admin") data.representation = "none";

  const _categories = data.categories || [];

  let categories = [data.nature];

  for (let i = 0; i < _categories.length; i++) {
    if (_categories[i] != data.nature) categories.push(data.nature);
  }

  const mongo_response = await models/* Product.updateOne */.xs.updateOne({
    _id: new external_mongoose_.Types.ObjectId(_id)
  }, {
    categories,
    //array
    pr_image_url,
    //array
    tags: data.tags,
    //array
    all_pr_image_url,
    //array
    price: data.price,
    //number
    color: data.color,
    //array
    nature: data.nature,
    //string
    location: data.location,
    //string
    materials: data.materials,
    //array
    description: data.description,
    productName: data.productName,
    //string
    representation: data.representation || "none"
  }).catch(err => error.push(err.message));

  if (error.length > 0) {
    res.status(406).json({
      message: "Something Went wrong",
      error
    });
  } else {
    res.status(200).json({
      mongo_response,
      _id
    });
  }
};

/* harmony default export */ const _put = (handle_put);
// EXTERNAL MODULE: ./shared/UtilityFunctions.ts
var UtilityFunctions = __webpack_require__(5035);
;// CONCATENATED MODULE: ./_api/handlers/product/helper.ts


const search = async (text, filters, options) => {
  const project = {
    $project: {
      _id: 1,
      score: {
        $meta: "searchScore"
      }
    }
  };

  if (options.field) {
    options.field.forEach(field => project.$project[field] = 1);
  } // console.log(filters, "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");


  const products = await models/* Product.aggregate */.xs.aggregate([{
    $search: {
      text: {
        query: text,
        path: {
          wildcard: "*"
        },
        fuzzy: {
          maxEdits: 2
        }
      }
    }
  }, {
    $match: filters
  }, project, {
    $limit: options.limit + 1
  }, {
    $skip: options.limit * options.page
  }]).catch(err => console.error(err)); //@ts-ignore

  const more = products.length > options.limit;
  return {
    products: products || [],
    more
  };
};

/* harmony default export */ const helper = (search);
;// CONCATENATED MODULE: ./_api/handlers/product/_get.ts




const handle_get = async (req, res) => {
  const query = req.query;
  const error = [];
  let page = 0;
  let limit = 50;
  let field = query.field; // console.log("new tokens")
  // console.log(query, 444444444444444444444);

  try {
    if (query.page) page = parseInt(query.page) - 1;
    if (query.limit) limit = parseInt(query.limit);
  } catch (err) {
    error.push(err.message);
  }

  delete query.page;
  delete query.limit;
  delete query.field;
  let is_a_text_search = false;
  const keys = Object.keys(query);
  const searchQuery = {};

  if (query.ne) {
    searchQuery._id = {
      $ne: query.ne
    };
    delete query.ne;
  }

  if (query.categories && query.categories[0] === "search") {
    is_a_text_search = true;
  }

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    switch (key) {
      case "price":
        const range = query.price.split("to");

        if (range[1] != "infinity") {
          //infinity var rely only on var in frontend
          searchQuery["price"] = {
            $gt: range[0],
            $lt: range[1]
          };
        } else {
          searchQuery["price"] = {
            $gt: range[0]
          };
        }

        break;

      case "categories":
        if (is_a_text_search) break;
        searchQuery[key] = {
          $all: (0,UtilityFunctions/* string_and_array_to_array */.j6)(query[key])
        };
        break;

      default:
        searchQuery[key] = {
          $in: (0,UtilityFunctions/* string_and_array_to_array */.j6)(query[key])
        };
    }
  }

  if (is_a_text_search) {
    const {
      products,
      more
    } = await helper(query.categories[1], searchQuery, {
      limit,
      field,
      page
    });
    return res.status(200).json({
      products,
      more
    });
  }

  let products = await models/* Product.find */.xs.find(searchQuery, field).sort({
    addedAt: 1
  }).skip(page * limit).limit(limit + 1).lean().catch(err => error.push(err.message)); //@ts-ignore

  const more = products.length > limit;

  if (more) {
    //@ts-ignore
    products.pop();
  } // console.log(products, error)


  res.json({
    products,
    error,
    more
  });
};

/* harmony default export */ const _get = (handle_get);
;// CONCATENATED MODULE: ./_api/handlers/product/_post.ts



const handle_post = async (req, res) => {
  const data = req.body;
  const error = [];
  const [pr_image_url, all_pr_image_url] = await Promise.all([await uploadMany(data["presentationImage"], error, {}).catch(err => error.push(err.message)), await uploadMany(data["images"] || [], error, {}).catch(err => error.push(err.message))]); // if (req.user.role != "admin") delete data.representation;

  const meta = data.meta;
  /************mongoDb upload***************/

  const mongo_response = await models/* Product.create */.xs.create({
    pr_image_url,
    //array
    tags: data.tags,
    //array
    all_pr_image_url,
    //array
    price: data.price,
    //number
    color: data.color,
    //array
    owner: req.user._id,
    nature: data.nature,
    location: data.location,
    //string
    materials: data.materials,
    //array
    categories: data.categories,
    //array
    description: data.description,
    addedAt: new Date().getTime(),
    productName: data.productName,
    //string
    representation: data.representation || "none"
  }).catch(err => error.push(err.message));

  if (error.length > 0) {
    res.status(406).json({
      message: "Something Went wrong",
      error
    });
  } else {
    res.status(200).json({
      message: "everything is good",
      _id: mongo_response._id
    });
  }
};

/* harmony default export */ const _post = (handle_post);
;// CONCATENATED MODULE: ./_api/handlers/product/_delete.ts




const handle_delete = async (req, res) => {
  const error = [];
  const Id = req.query.product_id; // console.log("the request reached me")

  const mongo_product = await models/* Product.findOne */.xs.findOne({
    _id: new external_mongoose_.Types.ObjectId(Id)
  }).lean(); //@ts-ignore

  if (mongo_product.owner != req.user._id) {
    return res.status(401).json({
      message: "could not process the operation"
    });
  }

  const erasedProduct = await models/* Product.findOneAndUpdate */.xs.findOneAndUpdate({
    _id: new external_mongoose_.Types.ObjectId(Id)
  }, {
    $set: {
      quantity: 0
    }
  }).catch(err => error.push(err.message)); //@ts-ignore

  if (erasedProduct && erasedProduct.deletedCount == 0) {
    res.json({
      message: "The query provided did not match any product"
    });
    return;
  }

  try {
    eraseImages([//@ts-ignore
    ...erasedProduct.pr_image_url, //@ts-ignore
    ...erasedProduct.all_pr_image_url], error);
  } catch (err) {
    error.push(err.message);
  }

  res.json({
    erasedProduct,
    error
  });
};

/* harmony default export */ const _delete = (handle_delete);
;// CONCATENATED MODULE: ./_api/handlers/product/_get_with_id.ts

 // req format : /api/product/withId/Id1,Id2,Id3....

const _get_with_id_handle_get = async (req, res) => {
  const query = req.query;
  const error = [];
  const field = query.field; // console.log(req.query);
  // console.log("I was hit");

  let products;
  const productIds = req.query.product_id.split(",").filter(Id => Id).map(Id => new external_mongoose_.Types.ObjectId(Id));

  if (!field || field.includes("owner")) {
    products = await models/* Product.findOne */.xs.findOne({
      _id: productIds[0]
    }, field).populate("owner", ["username", "phonenumber", "email"]).exec().catch(err => error.push(err.message));
  } else {
    products = await models/* Product.findOne */.xs.findOne({
      _id: productIds[0]
    }, field).exec().catch(err => error.push(err.message));
  }

  res.json({
    products: [products],
    error
  });
};

/* harmony default export */ const _get_with_id = (_get_with_id_handle_get);
;// CONCATENATED MODULE: ./_api/handlers/product/_get_representation.ts
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const _get_representation_handle_get = async (req, res) => {
  const query = req.query;
  const error = [];

  if (query.representation == "all") {
    const products = await models/* Product.find */.xs.find({
      representation: {
        $nin: ["none", "hot deals"]
      }
    }, query.field).limit(query.limit).lean().catch(err => error.push(err.message)); // console.log("the products to come are ", products);

    return res.json({
      products,
      error
    });
  }

  const representation = (0,UtilityFunctions/* string_and_array_to_array */.j6)(query.representation) || [];

  const _promises = representation.map(async rpr => {
    return await models/* Product.findOne */.xs.findOne({
      representation: {
        $in: rpr === null || rpr === void 0 ? void 0 : rpr.split(" ")
      }
    }, query.field).lean().catch(err => error.push(err.message));
  });

  const products = await Promise.all(_promises);
  const finalProducts = [];
  const missingRepresentation = [];
  products.forEach((p, index) => {
    if (!p) missingRepresentation.push(representation[index]);else finalProducts.push(p);
  });

  if (missingRepresentation.length > 0) {
    //console.log(missingRepresentation)
    const _newPromises = missingRepresentation.map(async rpr => {
      return await models/* Product.findOne */.xs.findOne({
        categories: {
          $all: rpr.split(" ")
        }
      }, query.field).catch(err => error.push(err.message));
    });

    let missingProducts = await Promise.all(_newPromises); // console.log(missingProducts)

    missingProducts = missingProducts //@ts-ignore
    .map((mongoObj, index) => {
      if (!mongoObj) return; //@ts-ignore

      return _objectSpread(_objectSpread({}, mongoObj._doc), {}, {
        representation: missingRepresentation[index]
      });
    }).filter(e => e); //filters the product that are not defined;;
    //console.log(missingProducts)

    finalProducts.push(...missingProducts); // console.log(missingProducts)
  }

  res.json({
    products: finalProducts,
    error
  });
};

/* harmony default export */ const _get_representation = (_get_representation_handle_get);
// EXTERNAL MODULE: ./_api/middleware/helpers/index.js
var helpers = __webpack_require__(6771);
// EXTERNAL MODULE: ./_api/middleware/enforceRole.ts
var enforceRole = __webpack_require__(7398);
// EXTERNAL MODULE: ./_api/middleware/addUser.ts
var addUser = __webpack_require__(6050);
;// CONCATENATED MODULE: ./_api/handlers/product/index.ts










const PUT_handler = (0,helpers/* createHandler */.o)(addUser/* addUser */.c, (0,enforceRole/* enforceRole */.z)("seller"), blockBot/* blockBot */.C, _put);
const POST_handler = (0,helpers/* createHandler */.o)(addUser/* addUser */.c, (0,enforceRole/* enforceRole */.z)("seller"), blockBot/* blockBot */.C, _post);
const DELETE_handler = (0,helpers/* createHandler */.o)(addUser/* addUser */.c, (0,enforceRole/* enforceRole */.z)("seller"), blockBot/* blockBot */.C, _delete);
const GET_handler = _get;
const GET_WITH_ID_handler = _get_with_id;
const GET_WITH_REPRESENTATION_handler = _get_representation;

/***/ })

};
;