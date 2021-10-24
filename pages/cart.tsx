import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import Head from "next/head";
import { useTransition, animated, config } from "react-spring";
import { useEffect, useRef, useState } from "react";
import CartProduct from "../component/CartProduct";
import MyImage from "../component/MyImage";
import styles from "../styles/cart.module.css";
import { useGlobalContext } from "../Contexts/GlobalContext";
import { useRequire } from "../shared/CustomHooks";

type responseData = {
  more: boolean;
  products: [];
  error: [];
};

export default function Home() {
  const {
    cart: { savedProduct },
  } = useGlobalContext();
  const message = useRef<string>();

  useRequire("login");

  const animatedProduct = useTransition(savedProduct, {
    enter: { opacity: 1, maxHeight: "250px", x: 0 },
    from: { opacity: 0, maxHeight: "0px", x: -200 },
    leave: { opacity: 0, maxHeight: "0px", x: -200 },
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
          <animated.div style={style} className={styles.itemContainer}>
            <div>
              <CartProduct product={product} />
            </div>
          </animated.div>
        ))}

        <button className={`${styles.buyPrompt} flex-center`}>
          <a
            href={`https://api.whatsapp.com/send?phone=15312256403&text=${message.current}`}
          >
            Buy All
          </a>
        </button>
      </div>
    </div>
  );
}
