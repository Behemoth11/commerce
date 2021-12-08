import axios from "axios";
import MyLink from "../../component/MyLink";
import { useRouter } from "next/router";
import Popup from "../../component/popup";
import React, { useState, useEffect, useRef, useMemo } from "react";
import styles from "../../styles/product.module.scss";
import ProductSlideShow from "../../component/ProductSlideShow";
import MoreProduct from "../../component/ProductList-flex/preset";
import { formatPrice } from "../../shared/UtilityFunctions";
import Loading from "../../component/LoadingController/loading";
import Options from "../../component/Options";
import {
  distinct,
  fecthRelated,
  fetchNavigation,
} from "../../shared/shared_functions";
import {
  useAuthcontext,
  useCartContext,
  useFilterContext,
  useMyWindow,
  useUser,
} from "../../Contexts/GlobalContext";
import Alert from "../../component/popup/Alert";
import Head from "next/head";
import connectDB, { connectDB_frontend } from "../../_api/middleware/mongodb";

const ProductShow = ({ mainProduct, navigation, related }) => {
  const router = useRouter();
  const {
    query: { productId },
  } = router;

  const User = useUser();
  const auth = useAuthcontext();
  const myWindow = useMyWindow();

  const deleteProduct = async (e) => {
    setD_state("working");
    const response = await auth.axios
      .delete(`/api/product/withId/${mainProduct._id}`)
      .catch((err) => err.response);

    d_message.current = response.data.message;
    if (response.status == 200) {
      setD_state("success");
    } else {
      setD_state("failure");
    }
  };

  const [d_state, setD_state] = useState("rest");
  const d_message = useRef();

  // console.log(mainProduct)

  const SLIDER_URL = useMemo(
    () => mainProduct?.pr_image_url?.concat(mainProduct?.all_pr_image_url),
    [mainProduct]
  );

  return (
    <div className="big-container">
      <Head>
        <meta
          key="description"
          name="description"
          content={mainProduct.description}
        />
        <meta property="og:title" content={mainProduct.productName} />
        <meta property="og:type" content={mainProduct.nature} />
        <meta property="og:image" content={mainProduct.pr_image_url[0]} />
        <meta property="og:site_name" content="KdShop" />
        <meta
          property="og:description"
          content={mainProduct.description}
        />
        <title key="title">{`${mainProduct.productName} : Article en vente.`}</title>
      </Head>
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
                  <MyLink
                    href={`/upload?_id=${productId}`}
                    className={styles.update}
                  >
                    Metre à jour
                  </MyLink>

                  <button
                    onClick={(e) => {
                      myWindow.setFocusOn("delete_product_alert", e);
                      myWindow.overlay.open(() => myWindow.setFocusOn("none"));
                    }}
                    className={styles.delete}
                    style={{ marginTop: "1em" }}
                  >
                    Effacer produit
                  </button>
                </>
              </Options>
            )}
            <Alert name="delete_product_alert" width="100%" type="top">
              <div className={styles.deletePopup}>
                <p>Êtes-vous sûr de bien vouloir supprimer cet élément?</p>
                <br />
                <WorkState
                  // style={{background: "white", padding: }}
                  type="3"
                  delay={2500}
                  general={d_message.current}
                  state={d_state}
                  setState={setD_state}
                  cb={{
                    success: () => {
                      window.history.go(-1);
                    },
                    general: () => {
                      myWindow.overlay.close();
                      myWindow.setFocusOn("none");
                    },
                  }}
                />
                <div>
                  <button
                    className={styles.cancel}
                    onClick={() => {
                      myWindow.overlay.close();
                      myWindow.setFocusOn("none");
                    }}
                  >
                    Cancel
                  </button>
                  <button className={styles.dangerous} onClick={deleteProduct}>
                    supprimer
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
          {related.length > 0 && (
            <div className={styles.moreProduct}>
              <MoreProduct
                items={related}
                title={"Similaire a ce produit"}
                preset="presetnone"
              />
            </div>
          )}

          {navigation.length > 0 && (
            <div className={styles.moreProduct}>
              <MoreProduct
                preset={"preset1"}
                items={navigation}
                title={"Ce que nous vendons"}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductShow;

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
};

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
          <button>Annuler</button>
          <button
            className={styles.dangerous}
            onClick={() => cart.removeFromCart(product._id)}
          >
            Enlever
          </button>
        </>
      )) || (
        <>
          <button>
            <MyLink href={"/cart"}>afficher le panier ?</MyLink>
          </button>
          <button
            className={styles.dangerous}
            onClick={() => cart.removeFromCart(product._id)}
          >
            annuler
          </button>
        </>
      )}
    </div>
  );

  const contact = (
    <div className={styles.contact}>
      <a
        className={styles.fb}
        //@ts-ignore
        href={`https://m.me/${product.owner?.contact?.fb_id}`}
      >
        <span>Facebook (recommended) </span>
      </a>

      <a
        className={styles.wtp}
        href={`https://api.whatsapp.com/send?phone=${
          //@ts-ignore
          product.owner?.contact?.phoneNumber || "+15312256403"
        }&text=${message.current}`}
      >
        <span>Whatsapp</span>
      </a>
    </div>
  );

  return (
    <div className="container vertical-flex">
      <button
        className={`${styles.buyPrompt} sm flex-center`}
        onClick={(e) => {
          myWindow.setFocusOn("contact_seller", e);
          myWindow.overlay.open(() => myWindow.setFocusOn("none"), "sm");
        }}
        // style={{ marginBottom: "10px" }}
      >
        <a>contacter le vendeur</a>
      </button>

      <Alert
        name="contact_seller"
        width="100vw"
        type="bottom"
        className={styles.ctn}
      >
        {contact}
      </Alert>

      <div className={`${styles.addToCartPrompt} sm flex-center `}>
        <button onClick={handleClick}>
          <Popup duration={30000} type={"theme-color"} name={"add_to_cart"}>
            <AddPopup />
          </Popup>
          <span>
            {(items_is_in_cart && "Retirer du panier") || "Ajouter au panier"}
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

        {["tags", "color", "materials"].map(
          (detail) =>
            (product[detail] && product[detail].length && (
              <div className={styles.arrays} key={detail}>
                <p>{FR[detail]} :</p>
                {product[detail].map((tag, index) => (
                  <MyLink href={"/find?categories=tous"} key={tag + index}>
                    <span
                      onClick={() =>
                        filters.setFilter({ [detail]: { [tag]: true } })
                      }
                    >
                      {tag}
                    </span>
                  </MyLink>
                ))}
              </div>
            )) ||
            ""
        )}

        <div className={styles.normal}>
          <p>Location :</p>
          <span
            onClick={() =>
              filters.setFilter([{ origin: { [product.location]: true } }])
            }
          >
            &nbsp; {product?.location || "inconnue"}
          </span>
        </div>

        <p className={styles.description}>{product?.description}</p>

        <p>
          Vendeur : &nbsp;<span>@{product?.owner?.username}</span>
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

      <button
        className={`${styles.buyPrompt} big flex-center`}
        onClick={(e) => {
          myWindow.setFocusOn("cpt", e);
          // myWindow.overlay.open(() => myWindow.setFocusOn("none"), "sm");
        }}
      >
        <Popup
          duration={30000}
          type={"theme-color"}
          name={"cpt"}
          cb={() => myWindow.overlay.close()}
        >
          <div className={styles.contact_desktop}>
            <a
              className={styles.fb}
              //@ts-ignore
              href={`https://m.me/${product.owner?.contact?.fb_id}`}
            >
              <span>Facebook (recommended) </span>
            </a>

            <a
              className={styles.wtp}
              href={`https://api.whatsapp.com/send?phone=${
                //@ts-ignore
                product.owner?.contact?.phoneNumber || "+15312256403"
              }&text=${message.current}`}
            >
              <span>Whatsapp</span>
            </a>
          </div>
        </Popup>
        <a>Contacter le vendeur</a>
      </button>
    </div>
  );
};

import { Product } from "../../_api/models";
import { getRelated } from "../../component/Layout/NavBar/navBarSections";
import { Types } from "mongoose";

export async function getStaticPaths() {
  // const { MongoClient } = (await import("mongodb")).default;

  await connectDB_frontend();

  const products = await Product.find_visible({}, ["_id"])
    .limit(process.env.VERCEL_ENV == "production" ? 100 : 100)
    .sort({ addedAt: -1 })
    .lean();

  const paths = products.map((product) => ({
    params: { productId: product._id.toString() },
  }));

  // console.log(paths);
  //
  return {
    paths: paths,
    fallback: "blocking", // See the "fallback" section below
  };
}

import { search } from "../../_api/handlers/product/helper";
import WorkState from "../../component/LoadingController/workState/WorkState";

export async function getStaticProps(context) {
  try {
    const product_id = context.params.productId;

    const _id_obj = new Types.ObjectId(product_id);
    await connectDB_frontend();

    let product = await Product.findOne_visible({ _id: _id_obj })
      .populate("owner", ["contact", "username"])
      .lean();

    product._id = product._id.toString();
    delete product.owner._id;

    const rprs = getRelated(product.categories, true);

    const verifier = {};

    // console.log(rprs, true);

    let navigation = await Product.find_visible(
      {
        representation: { $in: rprs },
        _id: { $ne: _id_obj },
        quantity: { $gte: 0 },
      },
      ["productName", "description", "representation", "pr_image_url"]
    ).lean();
    navigation = distinct(navigation, verifier);

    if (navigation.length < 4) {
      await Promise.all(
        rprs.map(async (representation) => {
          const item = await Product.findOne_visible(
            {
              categories: { $in: representation.split(" ") },
              _id: { $ne: _id_obj },
            },
            ["productName", "description", "representation", "pr_image_url"]
          ).lean();

          // console.log("the item I fount", item);

          if (!item) return;
          item._id = item._id.toString();
          item.representation = representation;
          if (verifier[item._id]) return;
          verifier[item._id] = true;
          navigation.push(item);
        })
      );
    }

    let { products: related } = await search(
      product.categories.join(" "),
      {
        _id: { $ne: _id_obj },
      },
      {
        limit: 10,
        page: 0,
        field: ["productName", "description", "price", "pr_image_url"],
      }
    );

    related = distinct(related, verifier);

    return {
      props: { mainProduct: product, navigation, related }, // will be passed to the page component as props
      revalidate: 60 * 50,
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}
