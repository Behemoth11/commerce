"use strict";
exports.id = 962;
exports.ids = [962];
exports.modules = {

/***/ 7756:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CP": () => (/* binding */ getCategories),
/* harmony export */   "lr": () => (/* binding */ ITEM_NATURE),
/* harmony export */   "Mk": () => (/* binding */ navBarSections),
/* harmony export */   "cE": () => (/* binding */ getRelated)
/* harmony export */ });
/* unused harmony exports categories, getRepresentations, REPRESENTATIONS */
/* harmony import */ var _shared_UtilityFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5035);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const getCategories = (object, keys) => {
  const result = [];
  if (!object) return [];
  if (!keys) return [];

  for (let i = 0; i < keys.length; i++) {
    const newObj = object[keys[i]];
    const content = newObj && newObj.content;

    if (content) {
      result.push(...content, ...getCategories(newObj, content));
    }
  }

  const tracker = {};

  for (let i = 0; i < result.length; i++) {
    tracker[result[i]] = "";
  }

  return Object.keys(tracker).sort();
};
const categories = {
  femme: {
    title: "femme",
    content: ["pagne", "robe", "jupe", "bijoux"],
    bijou: {
      title: "bijoux",
      content: ["bracelet", "chainette"]
    }
  },
  homme: {
    title: "homme",
    content: ["veste", "pagne", "pantalons", "chemise", "chapeau", "chaussures"]
  },
  enfant: {
    title: "enfant",
    content: ["sac", "chemise", "pantalons", "t-shirts"]
  },
  ustensils: {
    title: "ustensils",
    content: ["cuisine"]
  }
}; // utilities: {
//   title: "ustensils",
//   content: ["pot", "plates", "ustensils"],
//   ustensils: {
//     title: "ustensils",
//     content: ["spoons", "fork", "knifes"],
//   },
// },
// };

const ITEM_NATURE = getCategories(categories, ["femme", "homme", "enfant", "ustensils"]);
const navBarSections = {
  menu: _objectSpread(_objectSpread({}, categories), {}, {
    title: "menu",
    content: ["femme", "homme", "enfant", "ustensils", "tous"],
    tous: {
      tous: "tous",
      content: ITEM_NATURE
    }
  })
};
const getRepresentations = (object, keys, trail = "") => {
  const result = [];
  if (!object) return [];
  if (!keys) return [];

  for (let i = 0; i < keys.length; i++) {
    const newObj = object[keys[i]];
    const content = newObj && newObj.content;

    if (content) {
      result.push(...(content === null || content === void 0 ? void 0 : content.map(categories => `${trail} ${keys[i]} ${categories}`)), ...getRepresentations(newObj, content, `${trail} ${keys[i]}`));
    }
  }

  const tracker = {};

  for (let i = 0; i < result.length; i++) {
    tracker[result[i]] = "";
  }

  return Object.keys(tracker).sort();
};
const REPRESENTATIONS = getRepresentations(navBarSections.menu, Object.keys(navBarSections.menu));
const getRelated = _categories => {
  let navigationQuery;
  if (_categories == "tous") navigationQuery = [" femme", " homme", " enfant", " bijoux", " ustensils"];else navigationQuery = REPRESENTATIONS.filter(representation => {
    var _string_and_array_to_;

    return (_string_and_array_to_ = (0,_shared_UtilityFunctions__WEBPACK_IMPORTED_MODULE_0__/* .string_and_array_to_array */ .j6)(_categories)) === null || _string_and_array_to_ === void 0 ? void 0 : _string_and_array_to_.some(categorie => {
      return new RegExp(categorie, "i").test(representation);
    });
  });
  return navigationQuery.map(e => `representation=${e.slice(1)}`).join("&"); //we slice here because there is a space at the beginning of the string
};

/***/ }),

/***/ 5962:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ap": () => (/* binding */ fetchNavigation),
/* harmony export */   "rV": () => (/* binding */ fecthRelated),
/* harmony export */   "qu": () => (/* binding */ compare),
/* harmony export */   "Xf": () => (/* binding */ add_captchat_token),
/* harmony export */   "fY": () => (/* binding */ getSelectionArray),
/* harmony export */   "jA": () => (/* binding */ getGroups)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2376);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _component_Layout_NavBar_navBarSections__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7756);


const fetchNavigation = async (categories, cb) => {
  let response;

  if (categories != "all") {
    const representation = (0,_component_Layout_NavBar_navBarSections__WEBPACK_IMPORTED_MODULE_1__/* .getRelated */ .cE)(categories);
    if (representation.length >= 5) response = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`/api/product/representation?${representation}&field=pr_image_url&field=description&field=productName&field=representation`).catch(err => console.log(err));
  }

  if (!response || response.data.products.length < 2) {
    response = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`/api/product/representation?representation=all&field=pr_image_url&field=description&field=productName&field=representation&limit=15`).catch(err => console.log(err));
  }

  cb(response.data.products);
};
const fecthRelated = async (product, cb) => {
  let response;
  response = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`/api/product?categories=search&&categories=${product.categories.join(" ")}&ne=${product._id}&limit=15&field=_id&field=productName&field=price&field=description&field=pr_image_url`).catch(err => response = err.response);

  if (response.status === 200) {
    cb(response.data.products);
  } else {
    cb(null);
  }
};
const compare = (obj1, obj2) => {
  obj1.focus = "";
  obj2.focus = "";
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length != keys2.length) return false;

  for (const key of keys1) {
    if (obj1[key] != obj2[key]) return false;
  }

  return true;
};
const add_captchat_token = async input => {
  if (!input) throw new Error("The input to log the token was empty"); //@ts-ignore

  const captchat = window.grecaptcha;
  const captchat_token = await new Promise((resolve, reject) => {
    captchat.ready(function () {
      captchat.execute("6Lc-lUMdAAAAALrqJdMgC82t5NuX9BfPXfk2aGyP", {
        action: "submit"
      }).then(function (token) {
        resolve(token);
      });
    });
  });
  input["captchat_token"] = captchat_token;
};
const getSelectionArray = selection => {
  const post_to_affect = [];

  for (const post_id in selection) {
    if (selection[post_id]) post_to_affect.push(post_id);
  }

  return post_to_affect;
};
const getGroups = async (auth, setGroups, fields) => {
  let groups_response;
  groups_response = await auth.axios.get("/api/publish", {
    params: {
      which: "mine",
      limit: "10",
      field: fields || ["post_name", "message"]
    }
  }).catch(err => groups_response = err.response);

  if (groups_response.status === 200) {
    setGroups(groups_response.data.posts);
  } else {
    setGroups(null);
  }
};

/***/ })

};
;