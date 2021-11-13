import axios from "axios";
import { lte } from "lodash";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type hooks = (authAxios: any) => {
  savedProduct: {
    _id: string;
  }[];
  saveToCart: (product: { _id }) => void;
  removeFromCart: (_id: any) => void;
  setSavedProduct: Dispatch<
    SetStateAction<
      {
        _id: string;
      }[]
    >
  >;
};

const useCart = (auth, User) => {
  const [savedProduct_id, setSavedProduct_id] = useState<{ _id: string }[]>([]);
  const [savedProduct, setSavedProduct] = useState<{ _id: string }[]>([
    { _id: "none" },
  ]);

  const saveToCart = async (product) => {
    var pursue = false;

    setSavedProduct((prevState) => {
      if (prevState.some((_product) => _product._id == product._id))
        return prevState;
      pursue = true;
      return [...prevState, product];
    });

    if (!pursue) return { status: "failure", message: "Item already in cart" };

    if (!User.data) {
      const cart = JSON.parse(localStorage.getItem("userCart")) || [];
      cart.push(product._id);
      localStorage.setItem("userCart", JSON.stringify(cart));
      return { status: "success", message: "Item saved In Local storage" };
    }

    let response;
    response = await auth.axios
      .put(`/api/user/userData?field=cart&method=push`, {
        _id: product._id,
      })
      .catch((err) => (response = err.response));

    if (response.status == 200) {
      return { status: "success", message: "Item successfuly saved" };
    } else {
      return { status: "failure", message: "Something went wrong!" };
    }
  };

  const removeFromCart = async (_id) => {
    setSavedProduct((prevState) => {
      return prevState.filter((product) => product._id != _id);
    });

    if (!User.data) {
      let cart = JSON.parse(localStorage.getItem("userCart")) || [];
      cart = cart.filter((id) => id != _id);
      localStorage.setItem("userCart", JSON.stringify(cart));
      return { status: "success", message: "Item successfully removed" };
    }

    let response;
    response = await auth.axios
      .delete(`/api/user/userData?field=cart&_id=${_id}`)
      .catch((err) => (response = err.response));

    if (response.status) {
      return { status: "success", message: "Item successfully removed" };
    } else {
      return {status: "failure", message: "Something went wrong."};
    }
  };

  useEffect(() => {
    // console.log("the new user data", userData)
    if (!User.data)
      return setSavedProduct_id(JSON.parse(localStorage.getItem("userCart")));
    if (User.data.username != "loading")
      return setSavedProduct_id(User.data.cart);
  }, [User.data]);

  useEffect(() => {
    (async () => {
      if (!savedProduct_id || savedProduct_id.length == 0)
        return setSavedProduct([]);
      let products;
      products = await axios
        .get(`/api/product/withId/${savedProduct_id.join(",")}`)
        .catch((err) => (products = err.response));

      setSavedProduct(products.data?.products);
    })();
  }, [savedProduct_id]);

  const cart_controller = {
    saveToCart,
    savedProduct,
    removeFromCart,
    setSavedProduct,
    setSavedProduct_id,
  };
  return cart_controller;
};

export default useCart;
