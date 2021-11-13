"use strict";
exports.id = 311;
exports.ids = [311];
exports.modules = {

/***/ 1005:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ZP": () => (/* binding */ GlobalContext),
  "BU": () => (/* binding */ useAuthcontext),
  "iQ": () => (/* binding */ useCartContext),
  "j4": () => (/* binding */ useFilterContext),
  "$9": () => (/* binding */ useMyWindow),
  "aF": () => (/* binding */ useUser)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(2376);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
// EXTERNAL MODULE: ./shared/CustomHooks.tsx
var CustomHooks = __webpack_require__(8740);
;// CONCATENATED MODULE: ./Contexts/gobalHooks/cart.tsx



const useCart = (auth, User) => {
  const {
    0: savedProduct_id,
    1: setSavedProduct_id
  } = (0,external_react_.useState)([]);
  const {
    0: savedProduct,
    1: setSavedProduct
  } = (0,external_react_.useState)([{
    _id: "none"
  }]);

  const saveToCart = async product => {
    var pursue = false;
    setSavedProduct(prevState => {
      if (prevState.some(_product => _product._id == product._id)) return prevState;
      pursue = true;
      return [...prevState, product];
    });
    if (!pursue) return {
      status: "failure",
      message: "Item already in cart"
    };

    if (!User.data) {
      const cart = JSON.parse(localStorage.getItem("userCart")) || [];
      cart.push(product._id);
      localStorage.setItem("userCart", JSON.stringify(cart));
      return {
        status: "success",
        message: "Item saved In Local storage"
      };
    }

    let response;
    response = await auth.axios.put(`/api/user/userData?field=cart&method=push`, {
      _id: product._id
    }).catch(err => response = err.response);

    if (response.status == 200) {
      return {
        status: "success",
        message: "Item successfuly saved"
      };
    } else {
      return {
        status: "failure",
        message: "Something went wrong!"
      };
    }
  };

  const removeFromCart = async _id => {
    setSavedProduct(prevState => {
      return prevState.filter(product => product._id != _id);
    });

    if (!User.data) {
      let cart = JSON.parse(localStorage.getItem("userCart")) || [];
      cart = cart.filter(id => id != _id);
      localStorage.setItem("userCart", JSON.stringify(cart));
      return {
        status: "success",
        message: "Item successfully removed"
      };
    }

    let response;
    response = await auth.axios.delete(`/api/user/userData?field=cart&_id=${_id}`).catch(err => response = err.response);

    if (response.status) {
      return {
        status: "success",
        message: "Item successfully removed"
      };
    } else {
      return {
        status: "failure",
        message: "Something went wrong."
      };
    }
  };

  (0,external_react_.useEffect)(() => {
    // console.log("the new user data", userData)
    if (!User.data) return setSavedProduct_id(JSON.parse(localStorage.getItem("userCart")));
    if (User.data.username != "loading") return setSavedProduct_id(User.data.cart);
  }, [User.data]);
  (0,external_react_.useEffect)(() => {
    (async () => {
      var _products$data;

      if (!savedProduct_id || savedProduct_id.length == 0) return setSavedProduct([]);
      let products;
      products = await external_axios_default().get(`/api/product/withId/${savedProduct_id.join(",")}`).catch(err => products = err.response);
      setSavedProduct((_products$data = products.data) === null || _products$data === void 0 ? void 0 : _products$data.products);
    })();
  }, [savedProduct_id]);
  const cart_controller = {
    saveToCart,
    savedProduct,
    removeFromCart,
    setSavedProduct,
    setSavedProduct_id
  };
  return cart_controller;
};

/* harmony default export */ const gobalHooks_cart = (useCart);
;// CONCATENATED MODULE: ./Contexts/gobalHooks/filters.ts
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

 // type myType =

const useFilter = () => {
  const {
    0: filter,
    1: setFilter
  } = (0,external_react_.useState)({});

  const toggleFilter = (filter, name, _callback) => {
    const callback = _callback || setFilter;
    callback(_prevState => {
      let prevState = _objectSpread({}, _prevState);

      let update = prevState[filter];
      update = update || {};

      if (filter == "price") {
        delete prevState.price;
      } else if (!update[name]) {
        update[name] = true;
        prevState[filter] = update; // prevState[filter] = {[name]: true}// to enable a only one choise effect
      } else {
        delete update[name];
        if (Object.keys(update).length == 0) delete prevState[filter];
      }

      return prevState;
    });
  };

  return {
    value: filter,
    toggleFilter,
    setFilter
  };
};

/* harmony default export */ const gobalHooks_filters = (useFilter);
;// CONCATENATED MODULE: ./Contexts/gobalHooks/windowStates.ts


const useFocus = () => {
  const {
    0: overlay_state,
    1: setOverlay
  } = (0,external_react_.useState)({
    open: false,
    callbacks: []
  });
  const {
    0: phase,
    1: setPhase
  } = (0,external_react_.useState)("fadeIn");
  const {
    0: isFocused,
    1: _setFocusOn
  } = (0,external_react_.useState)("none");

  const setFocusOn = (payload, e) => {
    if (e) e.stopPropagation();

    _setFocusOn(payload);
  };

  (0,external_react_.useEffect)(() => {
    const unfocus = () => {
      setFocusOn("none");
    };

    window.addEventListener("click", unfocus);
    return () => window.removeEventListener("click", unfocus);
  }, []);
  const {
    0: resize,
    1: setResize
  } = (0,external_react_.useState)(1);
  (0,external_react_.useEffect)(() => {
    const resizeEvent = () => setResize(prevState => prevState + 1);

    window.addEventListener("resize", resizeEvent);
    return () => window.removeEventListener("resize", resizeEvent);
  }, []); //overlay

  const open_overlay = cb => {
    setOverlay(prevState => ({
      open: true,
      callbacks: cb && prevState.callbacks.concat(cb) || prevState.callbacks
    }));
  };

  const close_overlay = cb => {
    const callbacks = overlay_state.callbacks.concat(cb);
    setOverlay({
      open: false,
      callbacks: []
    });

    for (let i = 0; i < callbacks.length; i++) {
      if (!callbacks[i]) continue;
      callbacks[i]();
    }
  };

  const overlay = {
    close: close_overlay,
    open: open_overlay,
    isOpen: overlay_state.open
  }; //inpage navigation

  const {
    0: hashLocation,
    1: setHashLocation
  } = (0,external_react_.useState)("");

  const open = id => {
    window.location.hash = id;
    setHashLocation(id);
  };

  (0,external_react_.useEffect)(() => {
    const handler = e => {
      setHashLocation(window.location.hash);
    };

    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  (0,external_react_.useEffect)(() => {
    if (hashLocation === "" || hashLocation === "") {
      close_overlay();
    } else {
      open_overlay(() => open(""));
    }
  }, [hashLocation]);
  console.log("The focus is on ", isFocused);
  return {
    size: resize,
    overlay,
    isFocused,
    setFocusOn,
    phase,
    setPhase,
    hashLocation,
    setHashLocation: open
  };
};

/* harmony default export */ const windowStates = (useFocus);
// EXTERNAL MODULE: ./GLOBALVARIABLE.ts
var GLOBALVARIABLE = __webpack_require__(9770);
;// CONCATENATED MODULE: ./Contexts/gobalHooks/userData.ts



const useUserData = auth => {
  const {
    0: userData,
    1: setUserData
  } = (0,external_react_.useState)({
    username: "loading"
  });
  const {
    0: _refresh,
    1: setRefresh
  } = (0,external_react_.useState)(0);

  const refresh = () => setRefresh(prevState => prevState + 1);

  const fetchUserData = async () => {
    let serverResponse;
    serverResponse = await auth.axios.get("/api/user/userData").catch(err => serverResponse = err.response); // console.log("the request resolve")

    if (serverResponse.status == 200) {
      setUserData(serverResponse.data.userData);
    } else {
      // console.log("The else par ran")
      setUserData(undefined);
    }
  };

  (0,external_react_.useEffect)(() => {
    if (_refresh == 0) return;
    fetchUserData();
  }, [_refresh]);
  (0,external_react_.useEffect)(() => {
    var _auth$token, _auth$token2;

    console.log("The value of the token", auth.token);

    if ((userData === null || userData === void 0 ? void 0 : userData.username) == "loading" && (_auth$token = auth.token) !== null && _auth$token !== void 0 && _auth$token.value && ((_auth$token2 = auth.token) === null || _auth$token2 === void 0 ? void 0 : _auth$token2.value) != "loading") {
      fetchUserData();
    } else if (!auth.token) {
      setUserData(undefined);
    }
  }, [auth.token]);

  const hasAuthorization = requiredRole => {
    return userData && GLOBALVARIABLE/* role_dic */.m[userData.role] >= GLOBALVARIABLE/* role_dic */.m[requiredRole] || false;
  };

  const Owns = product => {
    var _product$owner;

    return (product === null || product === void 0 ? void 0 : (_product$owner = product.owner) === null || _product$owner === void 0 ? void 0 : _product$owner._id) == (userData === null || userData === void 0 ? void 0 : userData._id);
  };

  return {
    data: userData,
    setUserData,
    refresh,
    hasAuthorization,
    Owns
  };
};

/* harmony default export */ const userData = (useUserData);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./Contexts/GlobalContext.tsx








let bn;
const CartContext = /*#__PURE__*/(0,external_react_.createContext)({
  savedProduct: [{
    _id: ""
  }],
  saveToCart: async product => ({
    status: "string",
    message: "string"
  }),
  removeFromCart: product => console.log(0),
  setSavedProduct: undefined
});
const useCartContext = () => {
  return (0,external_react_.useContext)(CartContext);
};
const AuthContext = /*#__PURE__*/(0,external_react_.createContext)({
  axios: external_axios_default().create(),
  token: {
    value: "",
    expiresAt: ""
  },
  setToken: payload => console.log(0),
  getNewToken: async () => console.log(0)
});
const useAuthcontext = () => {
  return (0,external_react_.useContext)(AuthContext);
};
const MyWindowContext = /*#__PURE__*/(0,external_react_.createContext)({
  isFocused: "",
  setFocusOn: (id, e) => console.log(0),
  phase: "",
  setPhase: id => console.log(0),
  size: 0,
  overlay: {
    open: cb => console.log(5),
    close: cb => console.log(5),
    isOpen: Math.random() == 1
  },
  hashLocation: "",
  setHashLocation: id => console.log(0)
});
const useMyWindow = () => {
  return (0,external_react_.useContext)(MyWindowContext);
};
const UserContext = /*#__PURE__*/(0,external_react_.createContext)({
  data: undefined,
  refresh: () => console.log(0),
  Owns: product => Math.random() == 1,
  setUserData: payload => console.log(0),
  hasAuthorization: requiredRole => bn
});
const useUser = () => {
  return (0,external_react_.useContext)(UserContext);
};
const FilterContext = /*#__PURE__*/(0,external_react_.createContext)({
  value: {},
  toggleFilter: (filter, name, _callback) => console.log(0),
  setFilter: payload => console.log(0)
});
const useFilterContext = () => {
  return (0,external_react_.useContext)(FilterContext);
};

function GlobalContextProvider({
  children
}) {
  const auth = (0,CustomHooks/* useAuthAxios */.J0)();
  const User = userData(auth);
  const cart = gobalHooks_cart(auth, User);
  const filters = gobalHooks_filters();
  const myWindow = windowStates();
  (0,external_react_.useEffect)(() => {
    localStorage.setItem("meta_64", "0");
  }, []);
  return /*#__PURE__*/jsx_runtime_.jsx(CartContext.Provider, {
    value: cart,
    children: /*#__PURE__*/jsx_runtime_.jsx(AuthContext.Provider, {
      value: auth,
      children: /*#__PURE__*/jsx_runtime_.jsx(FilterContext.Provider, {
        value: filters,
        children: /*#__PURE__*/jsx_runtime_.jsx(UserContext.Provider, {
          value: User,
          children: /*#__PURE__*/jsx_runtime_.jsx(MyWindowContext.Provider, {
            value: myWindow,
            children: children
          })
        })
      })
    })
  });
}

/* harmony default export */ const GlobalContext = (GlobalContextProvider);

/***/ }),

/***/ 9770:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "m": () => (/* binding */ role_dic)
/* harmony export */ });
const role_dic = {
  user: 0,
  seller: 200,
  admin: 1000
};
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ({
  role_dic
});

/***/ }),

/***/ 8740:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LI": () => (/* binding */ useIsomorphicLayoutEffect),
/* harmony export */   "O5": () => (/* binding */ useFirstTimeLoading),
/* harmony export */   "S1": () => (/* binding */ useIntersectionObserver),
/* harmony export */   "J0": () => (/* binding */ useAuthAxios),
/* harmony export */   "Vv": () => (/* binding */ useRequire)
/* harmony export */ });
/* unused harmony export useScreenSize */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2376);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Contexts_GlobalContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1005);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6731);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);




const useIsomorphicLayoutEffect =  false ? 0 : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;
const useFirstTimeLoading = () => {
  const load = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(true);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    load.current = false;
  }, []);
  return load.current;
};
const useScreenSize = () => {
  const {
    0: screenSize,
    1: setScreeSize
  } = useState(undefined);
  useEffect(() => {
    const resize = () => {
      setScreeSize(window.innerWidth);
    };

    resize();
    window.addEventListener("resize", resize, false);
    return () => window.removeEventListener("resize", resize);
  }, []);
  if (screenSize >= 570) return "big";
  if (screenSize < 570) return "small";
};
const useIntersectionObserver = rootMargin => {
  const {
    0: visibilityIndex,
    1: setVisibilityIndex
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const {
    0: observer,
    1: setObserver
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const observerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setObserver(new IntersectionObserver(entry => {
      console.log("The intersection observer fired");
      entry.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibilityIndex(prevIndex => prevIndex + 1);
        }
      });
    }, {
      root: observerRef.current || document.getElementById("__next"),
      rootMargin: rootMargin || "500px"
    }));
  }, []);
  return [visibilityIndex, observer, observerRef];
};
const useAuthAxios = () => {
  const {
    0: token,
    1: _setToken
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    value: "loading",
    expiresAt: "loading"
  });
  const tokenRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();

  const setToken = payload => {
    _setToken(payload);

    tokenRef.current = payload;
  };

  const authAxios = axios__WEBPACK_IMPORTED_MODULE_1___default().create({
    withCredentials: true
  });
  authAxios.interceptors.request.use(config => {
    config.headers.authorization = `${token === null || token === void 0 ? void 0 : token.value}`;
    return config;
  }, error => {
    return Promise.reject(error);
  });
  authAxios.interceptors.response.use(response => {
    return response;
  }, error => {
    const code = error && error.response ? error.response.status : 0;

    if (code === 401 || code === 403) {//console.log("error code", code);
    }

    return Promise.reject(error);
  });

  const getNewToken = async () => {
    let axiosResponse;
    axiosResponse = await authAxios.get("/api/auth/token").catch(err => axiosResponse = err.response);

    if (axiosResponse.status == 200) {
      const {
        token,
        expiresAt
      } = axiosResponse.data;
      setToken({
        value: token,
        expiresAt
      });
    } else {
      setToken(undefined);
    }
  };

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const tokenChecker = setInterval(() => {
      if (!tokenRef.current) return;
      const timeLeft = parseInt(tokenRef.current.expiresAt) * 1000 - new Date().getTime() - 1000 * 60 * 7;

      if (timeLeft <= 0) {
        //console.log("I will refresh because it is time")
        getNewToken();
      }
    }, 1000 * 60 * 5);
    return () => clearInterval(tokenChecker);
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    getNewToken();
  }, []);
  return {
    axios: authAxios,
    token,
    setToken,
    getNewToken
  };
};
const useRequire = userState => {
  var _User$data;

  let should_be_redirected = false;
  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
  const User = (0,_Contexts_GlobalContext__WEBPACK_IMPORTED_MODULE_2__/* .useUser */ .aF)();

  switch (userState) {
    case "login":
      if (!((_User$data = User.data) !== null && _User$data !== void 0 && _User$data.username)) {
        should_be_redirected = true;
      }

      break;
  }

  if (should_be_redirected) router.push("/");
};

/***/ })

};
;