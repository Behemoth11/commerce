import axios from "axios";
import MyLink from "../../component/MyLink";
import { useRouter } from "next/router";
import Popup from "../../component/popup";
import React, { useState, useEffect, useRef, useMemo } from "react";
import styles from "../../styles/product.module.css";
import ProductSlideShow from "../../component/ProductSlideShow";
import MoreProduct from "../../component/ProductList-flex/preset";
import { formatPrice } from "../../shared/UtilityFunctions";
import Loading from "../../component/LoadingController/loading";
import Options from "../../component/Options";
import { fecthRelated, fetchNavigation } from "../../shared/shared_functions";
import {
  useAuthcontext,
  useCartContext,
  useFilterContext,
  useMyWindow,
  useUser,
} from "../../Contexts/GlobalContext";
import Alert from "../../component/popup/Alert";

// const getUrl = (array) => {
//   const query = array.map(
//     (element) => `representation=${element.split("menu ")[1]}`
//   );
//   return query.join("&");
// };

const INIT = Array.from({ length: 10 }).map((e) => ({
  representation: "nothing",
}));

const Product: React.FC = () => {
  const {
    query: { productId },
  } = useRouter();

  const User = useUser();
  const auth = useAuthcontext();
  const myWindow = useMyWindow();
  const [data, setData] = useState<any>();
  const [relatedProducts, setRelatedProducts] = useState(INIT);
  const [navigationItems, setNavigatioinItems] = useState(INIT);

  useEffect(() => {
    setData(null);
    setRelatedProducts(INIT);
    setNavigatioinItems(INIT);
    const getProduct = async () => {
      if (!productId) return;
      const data = await fetch(`/api/product/withId/${productId}`).then((res) =>
        res.json()
      );
      setData(data);
    };

    getProduct();
  }, [productId]);

  useEffect(() => {
    const products = data?.products;

    if (products && products[0]) {
      (async () => {
        fetchNavigation(products[0].categories, setNavigatioinItems);
        fecthRelated(products[0], setRelatedProducts);
      })();
    }
  }, [data]);
  const mainProduct = data?.products && data.products[0];

  const deleteProduct = async (e) => {
    const response = await auth.axios
      .delete(`/api/product/withId/${productId}`)
      .catch((err) => console.log(err));
  };

  const SLIDER_URL = useMemo(
    () =>
      (mainProduct &&
        mainProduct?.pr_image_url?.concat(mainProduct?.all_pr_image_url)) || [
        undefined,
      ],
    [mainProduct]
  );

  return (
    <div className="big-container">
      <main className={`${styles.productPage}`}>
        <div className="flex center-children">
          <div
            className="images-section no-shrink"
            style={{ padding: 0, position: "relative" }}
          >
            <ProductSlideShow imageUrls={SLIDER_URL} />
            {((User.hasAuthorization("seller") && User.Owns(mainProduct)) ||
              User.hasAuthorization("admin")) && (
              <Options name="options">
                <>
                  <button
                    onClick={(e) => {
                      myWindow.setFocusOn("delete_product_alert", e);
                      myWindow.overlay.open(() => myWindow.setFocusOn("none"));
                    }}
                    className={styles.delete}
                    style={{ marginBottom: "10px" }}
                  >
                    delete item
                  </button>

                  <MyLink
                    href={`/upload?_id=${productId}`}
                    className={styles.update}
                  >
                    update item
                  </MyLink>
                </>
              </Options>
            )}
            <Alert name="delete_product_alert" width="100%" type="top">
              <div className={styles.deletePopup}>
                <p>Are you sure you want to delete this item?</p>
                <br />
                <div>
                  <button className={styles.cancel}>Cancel</button>
                  <button className={styles.dangerous} onClick={deleteProduct}>
                    yes, delete
                  </button>
                </div>
              </div>
            </Alert>
          </div>
        </div>

        <div className="product-info" style={{ width: "100%" }}>
          <ProductInformation product={mainProduct || {}} />
        </div>

        <div>
          {relatedProducts && relatedProducts.length >= 0 && (
            <div className={styles.moreProduct}>
              <MoreProduct
                items={relatedProducts}
                title={"Similaire a ce produit"}
                preset="presetnone"
              />
            </div>
          )}

          {navigationItems && navigationItems.length >= 0 && (
            <div className={styles.moreProduct}>
              <MoreProduct
                preset={"preset1"}
                items={navigationItems}
                title={"Ce que nous vendons"}
              />
            </div>
          )}
        </div>
      </main>
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
    owner: {
      _id: String;
      username: String;
      phoneNumber: String;
    };
    location: string;
    description: { head: string; info: string };
  };
  // addToCartAction: () => void;
}

const FR = {
  tags: "tague",
  color: "couleur disponiples",
  materials: "materiaux",
}

const ProductInformation: React.FC<productInformation> = ({ product }) => {
  const cart = useCartContext();
  const filters = useFilterContext();
  const myWindow = useMyWindow();

  const [myState, setMyState] = useState("");

  const saveToCart_message = useRef({ status: "string", message: "" });

  const message = useRef<string>();

  const getMessage = (product) => {
    return `I am interested in buying the ${product?.productName}.\n
    ${window?.location?.href}`;
  };

  useEffect(() => {
    message.current = getMessage(product);
  }, [product]);

  const items_is_in_cart = useMemo(
    () => cart.savedProduct.some((_product) => _product._id == product._id),
    [product._id, cart.savedProduct]
  );

  const handleClick = async (e) => {
    e.preventDefault();
    if (items_is_in_cart) {
      saveToCart_message.current = {
        status: "present_in_cart",
        message: "Click Remove to remove this items from your cart.",
      };
      myWindow.setFocusOn("add_to_cart");
      return;
    }

    setMyState("loading");
    const attempt_to_save = await cart.saveToCart(product);
    setMyState("");

    //@ts-ignore
    if (attempt_to_save == "success") {
      saveToCart_message.current = attempt_to_save;
    } else {
      //@ts-ignore
      saveToCart_message.current = attempt_to_save;
    }
    myWindow.setFocusOn("add_to_cart");
  };

  const AddPopup = () => (
    <div
      className={styles.addedNotification}
      onClick={(e) => {
        e.stopPropagation();
        myWindow.setFocusOn("none");
      }}
    >
      {saveToCart_message.current.message}
      <br />

      {(saveToCart_message.current.status === "present_in_cart" && (
        <>
          <button>cancel</button>
          <button
            className={styles.dangerous}
            onClick={() => cart.removeFromCart(product._id)}
          >
            Remove
          </button>
        </>
      )) || (
        <>
          <button>
            <MyLink href={"/cart"}>show cart?</MyLink>
          </button>
          <button
            className={styles.dangerous}
            onClick={() => cart.removeFromCart(product._id)}
          >
            undo
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="container vertical-flex">
      <button className={`${styles.buyPrompt} sm flex-center`}>
        <a
          href={`https://api.whatsapp.com/send?phone=${
            product.owner?.phoneNumber || "+15312256403"
          }&text=${message.current}`}
        >
          Contact Seller
        </a>
      </button>
      <div className={`${styles.addToCartPrompt} sm flex-center `}>
        <button onClick={handleClick}>
          <Popup duration={300000} type={"theme-color"} name={"add_to_cart"}>
            <AddPopup />
          </Popup>
          <span>
            {(items_is_in_cart && "Remove from Cart") || "Ajouter au panier"}
          </span>

          <Loading
            width={(myState == "loading" && "50px") || "0px"}
            background="var(--theme-color)"
            style={{ display: "inline-block", marginLeft: "var(--margin)" }}
          />
        </button>
      </div>

      <div className={`${styles.informations} vertical-flex`}>
        <div className={`${styles.name_price} flex`}>
          <h2>{product?.productName} </h2>
          <h3>{formatPrice(product?.price)}</h3>
        </div>

        {["tags", "color", "materials"].map((detail) => (
          <>
            {product[detail] && product[detail].length && (
              <div className={styles.arrays} key={detail}>
                <p>{FR[detail] } :</p>
                {product[detail].map((tag, index) => (
                  <MyLink href={"/find?categories=all"} key={tag + index}>
                    <span
                      onClick={() =>
                        filters.setFilter({ [detail]: { [tag]: true } })
                      }
                    >
                      <a>{tag}</a>
                    </span>
                  </MyLink>
                ))}
              </div>
            ) || ""}
          </>
        ))}

        <div className={styles.normal}>
          <p>Location :</p>
          <span
            onClick={() =>
              filters.setFilter([{ origin: { [product.location]: true } }])
            }
          >
            &nbsp; {product?.location}
          </span>
        </div>

        <p className={styles.description}>{product?.description}</p>
        <p>
          Owned by <span>@{product?.owner?.username}</span>
        </p>
      </div>

      <div
        className={`${styles.addToCartPrompt} big flex-center `}
        style={{ marginBottom: "var(--margin)" }}
      >
        <button onClick={handleClick}>
          <Popup duration={300000} type={"theme-color"} name={"add_to_cart"}>
            <AddPopup />
          </Popup>
          <span>
            {(items_is_in_cart && "Remove from Cart") || "Add to Cart"}
          </span>

          <Loading
            width={(myState == "loading" && "50px") || "0px"}
            background="var(--theme-color)"
            style={{ display: "inline-block", marginLeft: "var(--margin)" }}
          />
        </button>
      </div>

      <button className={`${styles.buyPrompt} big flex-center`}>
        <a
          href={`https://api.whatsapp.com/send?phone=15312256403&text=${message.current}`}
        >
          Contacter le vendeur
        </a>
      </button>
    </div>
  );
};
