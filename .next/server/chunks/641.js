"use strict";
exports.id = 641;
exports.ids = [641];
exports.modules = {

/***/ 641:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "C": () => (/* binding */ blockBot)
});

// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(2376);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
;// CONCATENATED MODULE: ./_api/utils/verify_if_bot.ts


const verify_if_bot = async capt_token => {
  const google_response = await external_axios_default().post("https://www.google.com/recaptcha/api/siteverify", null, {
    params: {
      secret: process.env.RE_SECRET_KEY,
      response: capt_token
    }
  }).catch(err => console.log(err.message));

  if (google_response) {
    if (google_response.data.success === true && google_response.data.score >= 0.5) {
      return true;
    }
  }

  return false;
};

/* harmony default export */ const utils_verify_if_bot = (verify_if_bot);
;// CONCATENATED MODULE: ./_api/middleware/blockBot.ts

const blockBot = async (req, res, cb) => {
  if (process.env.VERCEL_ENV === "development" || process.env.VERCEL_ENV === "preview") return cb(req, res);
  const captchat_token = req.body.captchat_token;
  if (!captchat_token) return res.status(400).json({
    message: "we could not prove that you were human, try again."
  });
  const is_not_a_bot = await utils_verify_if_bot(captchat_token);

  if (is_not_a_bot) {
    // console.log("is the sender a human : ", is_not_a_bot)
    cb(req, res);
  } else {
    return res.status(400).json({
      message: "we could not prove that you were human, try again."
    });
  }
};

/***/ })

};
;