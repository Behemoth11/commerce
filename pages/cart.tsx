import axios, { AxiosResponse } from "axios";
import MyLink from "../component/MyLink";
import Head from "next/head";
import { useTransition, animated, config } from "react-spring";
import { useEffect, useRef, useState } from "react";
import CartProduct from "../component/CartProduct";
import styles from "../styles/cart.module.css";
import { useCartContext } from "../Contexts/GlobalContext";
import { useRequire } from "../shared/CustomHooks";

type responseData = {
  more: boolean;
  products: [];
  error: [];
};

export default function Home() {
  const { savedProduct } = useCartContext();
  const message = useRef<string>();

  // useRequire("login");

  const animatedProduct = useTransition(savedProduct, {
    enter: { z_of: 10},
    from: { z_of: 0},
    leave: { z_of: 0},
    config: {
      duration: 30000
    }
  });

  const getMessage = (savedProduct) => {
    return `I am interested in buying the following: \n
    ${savedProduct.map((product) => product.productName + ",\n")}
    ${window?.location?.host}/cart/${savedProduct.map(
      (product) => product._id + "/"
    )}`;
  };

  useEffect(() => {
    if (savedProduct?.length) {
      message.current = getMessage(savedProduct);
    }
  }, [savedProduct]);

  useEffect(() => {
    document.getElementById("__next")?.scroll(0, 0);
  }, []);

  return (
    <div
      className="big-container"
      style={{ padding: "0 var(--padding)", flexWrap: "wrap" }}
    >
      <div className={styles.cardsContainer}>
        <h3>What's in your Cart </h3>
        {animatedProduct((style, product) => (
          <animated.div className={styles.itemContainer}>
            <CartProduct
              product={product}
              visible={savedProduct.includes(product)}
            />
          </animated.div>
        ))}
      </div>
    </div>
  );
}
