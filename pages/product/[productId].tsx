import useSWR from "swr";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Popup from "../../component/popup";
import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/product.module.css";
import ProductSlideShow from "../../component/ProductSlideShow";
import MoreProduct from "../../component/ProductList-flex/preset";
import { getRelated } from "../../component/Layout/NavBar/navBarSections";
import { useGlobalContext } from "../../Contexts/GlobalContext";
// import Explore_SectionTitle from "../../component/Explore_SectionTitle";
import { formatPrice } from "../../shared/UtilityFunctions";
import { role_dic } from "../../GLOBALVARIABLE";
import product from "../api/product";
import { fecthRelated, fetchNavigation } from "../../shared/shared_functions";

const fetcher = (productId) => {
  if (productId) {
    return fetch(`/api/product/withId/${productId}`).then((res) => res.json());
  }
};

const getUrl = (array) => {
  const query = array.map(
    (element) => `representation=${element.split("menu ")[1]}`
  );
  return query.join("&");
};

const Product: React.FC = () => {
  const {
    query: { productId },
  } = useRouter();

  const { User, auth } = useGlobalContext();
  const { data, error } = useSWR(productId, fetcher);

  const [navigationItems, setNavigatioinItems] = useState(undefined);
  const [relatedProducts, setRelatedProducts] = useState(undefined);

  useEffect(() => {
    const products = data?.products;

    if (products && products[0]) {
      (async () => {
        fetchNavigation(products[0].categories, setNavigatioinItems);
        fecthRelated(products[0], setRelatedProducts);
      })();
    }
  }, [data]);

  const mainProduct = (data?.products && data.products[0]) || {};

  const deleteProduct = async (e) => {
    const response = await auth.axios
      .delete(`/api/product/withId/${productId}`)
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    document.getElementById("__next").scroll(0, 0);
  }, [productId]);

  return (
    <div className="big-container">
      <main className={`${styles.productPage}`}>
        <div className="flex center-children">
          <div className="images-section no-shrink" style={{ padding: 0 }}>
            <ProductSlideShow imageUrls={mainProduct?.all_pr_image_url} />
          </div>
        </div>

        <div className="product-info" style={{ width: "100%" }}>
          <ProductInformation product={mainProduct} />
        </div>

        <div>
          {relatedProducts && relatedProducts.length > 0 && (
            <div className={styles.moreProduct}>
              <MoreProduct
                items={relatedProducts}
                title={"Similar"}
                preset="presetnone"
              />
            </div>
          )}

          <div className={styles.moreProduct}>
            <MoreProduct
              preset={"preset1"}
              items={navigationItems}
              title={"What we offer"}
            />
          </div>
        </div>
      </main>

      {User.hasAuthorization("seller") && (
        <>
          <button onClick={deleteProduct} className={"button"}>
            delete
          </button>

          <Link href={`/upload?_id=${productId}`}>
            <a className={"button"}>update</a>
          </Link>
        </>
      )}
    </div>
  );
};

export default Product;

interface productInformation {
  product: {
    productName: string;
    price: string;
    materials: [];
    _id: string;
    color: [];
    tags: [];
    owner: String;
    origin: string;
    description: { head: string; info: string };
  };
  // addToCartAction: () => void;
}

const ProductInformation: React.FC<productInformation> = ({ product }) => {
  const { cart, filters } = useGlobalContext();

  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const message = useRef<string>();

  const getMessage = (product) => {
    return `I am interested in buying the ${product?.productName}.\n
    ${window?.location?.href}`;
  };

  useEffect(() => {
    message.current = getMessage(product);
  }, [product]);

  return (
    <div className="container vertical-flex">
      <button className={`${styles.buyPrompt} flex-center`}>
        <a
          href={`https://api.whatsapp.com/send?phone=15312256403&text=${message.current}`}
        >
          Buy
        </a>
      </button>
      <div className={`${styles.addToCartPrompt} flex-center `}>
        <Popup
          type={"theme-color"}
          isVisible={popupIsOpen}
          closePopup={() => setPopupIsOpen(false)}
          duration={3000}
        >
          <div
            className={styles.addedNotification}
            onClick={(e) => e.stopPropagation()}
          >
            Producy successfully added !
            <Link href={"/cart"} passHref>
              <button>show cart?</button>
            </Link>
            <button
              className={styles.dangerous}
              onClick={() => cart.removeFromCart(product._id)}
            >
              undo
            </button>
          </div>
        </Popup>
        <button
          onClick={(e) => {
            e.preventDefault();
            cart.saveToCart(product);
            setPopupIsOpen((prevState) => !prevState);
          }}
        >
          Add to Cart
        </button>
      </div>
      <div className={`${styles.informations} vertical-flex`}>
        <div className={`${styles.name_price} flex`}>
          <h2>{product?.productName} </h2>
          <h3>{formatPrice(product?.price)}</h3>
        </div>

        {["tags", "color", "materials"].map((detail) => (
          <div className={styles.arrays} key={detail}>
            <p>{detail} :</p>
            {product[detail]?.map((tag, index) => (
              <Link href={"/find?categories=all"} key={tag + index}>
                <span
                  onClick={() =>
                    filters.setFilter({ [detail]: { [tag]: true } })
                  }
                >
                  <a>{tag}</a>
                </span>
              </Link>
            ))}
          </div>
        ))}

        <div className={styles.normal}>
          <p>origin :</p>
          <span
            onClick={() =>
              filters.setFilter([{ origin: { [product.origin]: true } }])
            }
          >
            &nbsp; {product?.origin}
          </span>
        </div>

        <p className={styles.description}>{product?.description}</p>
        <p>
          Owned by <span>@{product?.owner}</span>
        </p>
      </div>
    </div>
  );
};
