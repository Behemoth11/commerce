import axios from "axios";
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

const useCart = (auth) => {
  const [savedProduct_id, setSavedProduct_id] = useState<{ _id: string }[]>([]);
  const [savedProduct, setSavedProduct] = useState<{ _id: string }[]>([{_id: "none"}]);

  const saveToCart = async (product) => {
    // setSavedProduct_id((prevState) => {
    //   if (prevState.some((product_id) => product_id == product._id))
    //     return prevState;
    //   return [...prevState, product._id];
    // });
    setSavedProduct((prevState) => {
      if (prevState.some((_product) => _product._id == product._id))
        return prevState;
      return [...prevState, product];
    });

    let response;
    response = await auth.axios
      .put(`/api/user/userData?field=cart&method=push`, {
        _id: product._id,
      })
      .catch((err) => (response = err.response));
  };
  const removeFromCart = async (_id) => {
    setSavedProduct((prevState) => {
      return prevState.filter((product) => product._id != _id);
    });

    // setSavedProduct_id(prevState => {
    //   return prevState.filter(product_id => product._)
    // })
    let response;
    response = await auth.axios
      .delete(`/api/user/userData?field=cart&_id=${_id}`)
      .catch((err) => (response = err.response));
  };

  useEffect(() => {
    (async () => {
      if (!savedProduct_id || savedProduct_id.length == 0) return setSavedProduct([]);
      let products;
      products = await axios
        .get(`/api/product/withId/${savedProduct_id.join(",")}`)
        .catch((err) => (products = err.response));

      setSavedProduct(products.data?.products);
    })();
  }, [savedProduct_id]);

  const cart_controller = {
    savedProduct,
    saveToCart,
    removeFromCart,
    setSavedProduct,
    setSavedProduct_id,
  };
  return cart_controller;
};

export default useCart;
