"use strict";
exports.id = 293;
exports.ids = [293];
exports.modules = {

/***/ 1293:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2376);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);


const qs = __webpack_require__(6850);

const post_with_photo_m = async (message, ...urls) => {
  const photo_responses = await Promise.all(urls.map(async url => (await axios__WEBPACK_IMPORTED_MODULE_0___default().post("https://graph.facebook.com/104940965341501/photos", null, {
    params: {
      access_token: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
      url,
      published: false
    }
  }).catch(err => console.error(err.response.data))) || {
    data: null
  }));
  const request_body = {};
  photo_responses.forEach((photo_response, index) => photo_response && (request_body[`attached_media[${index}]`] = `{media_fbid:${photo_response.data.id}}`));
  let post_response;
  post_response = await axios__WEBPACK_IMPORTED_MODULE_0___default().post("https://graph.facebook.com/104940965341501/feed", qs.stringify(request_body), {
    params: {
      access_token: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
      message
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).catch(err => post_response = err.response);
  return post_response.data;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (post_with_photo_m);

/***/ })

};
;