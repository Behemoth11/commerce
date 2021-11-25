"use strict";
exports.id = 460;
exports.ids = [460];
exports.modules = {

/***/ 9801:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5619);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);


__webpack_require__(334).config();

const connectDB = handler => async (req, res) => {
  if ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().connections[0].readyState)) {
    await handler(req, res);
    return;
  }

  await mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(process.env.mongodburl, {}, () => console.log("I am connnected"));
  await handler(req, res);
  return;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (connectDB);

/***/ }),

/***/ 4151:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "QX": () => (/* binding */ ContactMessage),
  "Hu": () => (/* binding */ FacebookPost),
  "x2": () => (/* binding */ Feedback),
  "xs": () => (/* binding */ Product),
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
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  password: {
    type: String
  },
  role: {
    type: String,
    default: "user"
  },
  cart: {
    type: Array,
    default: []
  },
  pr_pic: {
    type: String
  },
  contact: {
    phoneNumber: {
      type: String
    },
    email: {
      type: String
    }
  },
  Oauth: {
    method: {
      type: String
    },
    id: {
      type: String
    }
  }
});
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
  nature: {
    type: String,
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
    required: false
  },
  rating: {
    type: Number
  },
  location: {
    type: String,
    default: "unknown"
  },
  fb: {
    published: {
      type: Boolean,
      default: false
    },
    post_id: {
      type: String,
      default: null
    },
    date_published: {
      type: Number
    }
  },
  owner: {
    type: Product_Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  pr_image_url: {
    type: Array,
    minlength: 1,
    required: true
  },
  all_pr_image_url: {
    type: Array
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
});
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
});
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
});
;// CONCATENATED MODULE: ./_api/models/facebook_post.ts

var facebook_post_Schema = (external_mongoose_default()).Schema;
const facebookPost = new facebook_post_Schema({
  grouping: {
    type: [{
      type: facebook_post_Schema.Types.ObjectId,
      ref: "Product"
    }],
    required: true
  },
  published: {
    kdshop: {
      type: Boolean,
      default: false
    },
    fb: {
      type: Boolean,
      default: false
    }
  },
  fb_id: {
    type: String
  },
  owner: {
    type: facebook_post_Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  message: {
    type: String,
    required: true
  },
  post_name: {
    type: "String"
  }
});
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
  },
  contact: {
    type: Array,
    required: true
  },
  sender_id: {
    type: contact_message_Schema.Types.ObjectId,
    ref: "User"
  }
});
;// CONCATENATED MODULE: ./_api/models/index.ts
const mongoose = __webpack_require__(5619);






 //@ts-ignore

mongoose.models = {};
const User = mongoose.model("User", user);
const Product = mongoose.model("Product", product);
const Feedback = mongoose.model("Feedback", feedback);
const FacebookPost = mongoose.model("FacebookPost", facebookPost);
const RefreshToken = mongoose.model("RefreshToken", refreshToken);
const ContactMessage = mongoose.model("ContactMessage", contactMessage);

/***/ })

};
;