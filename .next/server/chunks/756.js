"use strict";
exports.id = 756;
exports.ids = [756];
exports.modules = {

/***/ 7756:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CP": () => (/* binding */ getCategories),
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
  women: {
    title: "women",
    content: ["bags", "watches", "jewelries", "shoes"]
  },
  men: {
    title: "men",
    content: ["suit", "pant", "short", "cap", "shoes"]
  },
  kids: {
    title: "kids",
    content: ["short", "underwear", "children", "leverages"]
  },
  utilities: {
    title: "utilities",
    content: ["pot", "plates", "ustensils"],
    ustensils: {
      title: "ustensils",
      content: ["spoons", "fork", "knifes"]
    }
  }
};
const navBarSections = {
  menu: _objectSpread(_objectSpread({}, categories), {}, {
    title: "menu",
    content: ["women", "men", "kids", "utilities", "all"],
    all: {
      title: "all products",
      content: getCategories(categories, ["women", "men", "kids", "utilities"])
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
  if (_categories == "all") navigationQuery = [" women", " men", " kids", " utilities", " posts", " cars", " and", " laptop"];else navigationQuery = REPRESENTATIONS.filter(representation => {
    var _string_and_array_to_;

    return (_string_and_array_to_ = (0,_shared_UtilityFunctions__WEBPACK_IMPORTED_MODULE_0__/* .string_and_array_to_array */ .j6)(_categories)) === null || _string_and_array_to_ === void 0 ? void 0 : _string_and_array_to_.some(categorie => {
      return new RegExp(categorie, "i").test(representation);
    });
  }); // console.log("the navigation query", navigationQuery)

  return navigationQuery.map(e => `representation=${e.slice(1)}`).join("&"); //we slice here because there is a space at the beginning of the string
};

/***/ })

};
;