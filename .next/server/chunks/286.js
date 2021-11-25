"use strict";
exports.id = 286;
exports.ids = [286];
exports.modules = {

/***/ 7286:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "V3": () => (/* binding */ createToken),
/* harmony export */   "nE": () => (/* binding */ createRefreshToken),
/* harmony export */   "c_": () => (/* binding */ hashPassword),
/* harmony export */   "Gv": () => (/* binding */ verifyPassword)
/* harmony export */ });
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6552);
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9722);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4151);




__webpack_require__(334).config();

const createToken = user => {
  // Sign the JWT
  if (!user.role) {
    throw new Error('No user role specified');
  }

  const _jwt = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().sign({
    _id: user._id,
    role: user.role,
    iss: process.env.VERCEL_URL,
    aud: process.env.VERCEL_URL
  }, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '1h'
  });

  return _jwt;
};
const createRefreshToken = async user => {
  if (!user.role) {
    throw new Error('No user role specified');
  }

  const _jwt = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().sign({
    _id: user._id,
    username: user.username,
    role: user.role,
    iss: process.env.VERCEL_URL,
    aud: process.env.VERCEL_URL
  }, process.env.JWT_REFRESH_TOKEN_SECRET, {
    algorithm: 'HS256'
  });

  const refreshTokencreated = await _models__WEBPACK_IMPORTED_MODULE_2__/* .RefreshToken.create */ .E6.create({
    token: _jwt,
    userId: user._id
  }).catch(err => console.log(err)); // console.log(refreshTokencreated)
  // console.log(_jwt, "the jwt")

  return refreshTokencreated === null || refreshTokencreated === void 0 ? void 0 : refreshTokencreated.token;
};
const hashPassword = password => {
  return new Promise((resolve, reject) => {
    // Generate a salt at level 12 strength
    bcrypt__WEBPACK_IMPORTED_MODULE_0___default().genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }

      bcrypt__WEBPACK_IMPORTED_MODULE_0___default().hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }

        resolve(hash);
      });
    });
  });
};
const verifyPassword = (passwordAttempt, hashedPassword) => {
  return bcrypt__WEBPACK_IMPORTED_MODULE_0___default().compare(passwordAttempt, hashedPassword);
};

/***/ })

};
;