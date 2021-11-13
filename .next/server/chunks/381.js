"use strict";
exports.id = 381;
exports.ids = [381];
exports.modules = {

/***/ 9801:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5619);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);


const connectDB = handler => async (req, res) => {
  if ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().connections[0].readyState)) {
    return handler(req, res);
  }

  await mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(process.env.mongodburl, {}, () => console.log("I am connnected"));
  return handler(req, res);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (connectDB);

/***/ }),

/***/ 9904:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "QX": () => (/* binding */ models_ContactMessage),
  "x2": () => (/* binding */ models_Feedback),
  "xs": () => (/* binding */ _api_models_Product),
  "E6": () => (/* binding */ RefreshToken),
  "n5": () => (/* binding */ User)
});

// EXTERNAL MODULE: external "mongoose"
var external_mongoose_ = __webpack_require__(5619);
var external_mongoose_default = /*#__PURE__*/__webpack_require__.n(external_mongoose_);
;// CONCATENATED MODULE: ./_api/models/user.ts

var Schema = (external_mongoose_default()).Schema;
const user = new (external_mongoose_default()).Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user"
  },
  cart: {
    type: Array,
    default: []
  },
  phoneNumber: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  pr_pic: {
    type: String
  },
  email: {
    type: String
  },
  Oauth: {
    method: {
      type: String
    },
    id: {
      type: String
    }
  }
}); // @ts-ignore
// mongoose.models = {};
// const User = mongoose.model("User", user);
// export default User;
;// CONCATENATED MODULE: ./_api/models/Product.ts

var Product_Schema = (external_mongoose_default()).Schema;
const product = new (external_mongoose_default()).Schema({
  productName: {
    type: String,
    required: true
  },
  categories: {
    type: Array,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    default: 0
  },
  tags: {
    type: Array,
    required: true
  },
  rating: {
    type: Number
  },
  location: {
    type: String,
    default: "unknown"
  },
  related: {
    type: Array
  },
  owner: {
    type: Product_Schema.Types.ObjectId,
    ref: "User"
  },
  pr_image_url: {
    type: Array,
    required: true
  },
  all_pr_image_url: {
    type: Array,
    required: true,
    minlength: 2
  },
  representation: {
    type: String,
    default: "none"
  },
  addedAt: {
    type: Number,
    required: true
  }
}, {
  strict: false
}); // @ts-ignore

(external_mongoose_default()).models = {
  owner: ""
};
var Product = external_mongoose_default().model("Product", product); // Product.watch().
//     on('change', data => console.log(new Date(), data));

/* harmony default export */ const models_Product = ((/* unused pure expression or super */ null && (Product)));
;// CONCATENATED MODULE: ./_api/models/feedback.ts

var feedback_Schema = (external_mongoose_default()).Schema;
const feedback = new feedback_Schema({
  msg: {
    type: String,
    required: true
  },
  focus: {
    type: Array,
    required: true
  }
}); // @ts-ignore

(external_mongoose_default()).models = {};
var Feedback = external_mongoose_default().model('Feedback', feedback);
/* harmony default export */ const models_feedback = ((/* unused pure expression or super */ null && (Feedback)));
;// CONCATENATED MODULE: ./_api/models/refreshToken.ts

var refreshToken_Schema = (external_mongoose_default()).Schema;
const refreshToken = new refreshToken_Schema({
  token: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  generatedAt: {
    type: Date,
    default: new Date()
  }
}); // @ts-ignore
// mongoose.models = {};
// var RefreshToken = mongoose.model('refreshToken', refreshToken);
// export default RefreshToken;
;// CONCATENATED MODULE: ./_api/models/contact_message.ts

var contact_message_Schema = (external_mongoose_default()).Schema;
const contactMessage = new contact_message_Schema({
  msg: {
    type: String,
    required: true
  },
  focus: {
    type: Array,
    required: true
  }
}); // @ts-ignore

(external_mongoose_default()).models = {};
var ContactMessage = external_mongoose_default().model('ContactMessage', contactMessage);
/* harmony default export */ const contact_message = ((/* unused pure expression or super */ null && (ContactMessage)));
;// CONCATENATED MODULE: ./_api/models/index.ts






const User = external_mongoose_default().model("User", user);
const _api_models_Product = external_mongoose_default().model("Product", product);
const models_Feedback = external_mongoose_default().model("Feedback", feedback);
const RefreshToken = external_mongoose_default().model("RefreshToken", refreshToken);
const models_ContactMessage = external_mongoose_default().model("ContactMessage", contactMessage);

/***/ })

};
;