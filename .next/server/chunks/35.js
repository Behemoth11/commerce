"use strict";
exports.id = 35;
exports.ids = [35];
exports.modules = {

/***/ 5035:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "j6": () => (/* binding */ string_and_array_to_array),
/* harmony export */   "T4": () => (/* binding */ formatPrice),
/* harmony export */   "uE": () => (/* binding */ checkForm),
/* harmony export */   "CN": () => (/* binding */ formatUrl)
/* harmony export */ });
/* unused harmony exports setProperty, getRandomInteger */
const setProperty = (object, property, value) => {
  object.current.style.setProperty(property, value);
};
const getRandomInteger = (upperBound, lowerBound = 0) => {
  return Math.floor(Math.random() * (upperBound - lowerBound) + lowerBound);
};
const string_and_array_to_array = array => {
  // return Array.isArray(array) ? array : array ? [array] : array;
  return Array.isArray(array) ? array : [array];
};
const formatPrice = price => {
  return new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CFA"
  }).format(parseFloat(price));
};
const checkForm = (formData, nonRequired, errors) => {
  const keys = Object.keys(formData);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (nonRequired[key] || formData[key]) continue;

    if (Array.isArray(formData[key])) {
      let errorOnKey = 0;
      formData[key].forEach(element => {
        if ((element === null || element === void 0 ? void 0 : element.length) <= 0 && errorOnKey == 0) {
          errorOnKey = 1;
          errors.push(`${key} should be entirely field`);
        }
      });
    }

    if (!formData[key]) errors.push(`${key} should be field`);
  }
};
const formatUrl = array => {
  return array.map(item => item ? `https://res.cloudinary.com/dkoatnxem/image/upload/${item}` : "");
};

/***/ })

};
;