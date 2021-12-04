import axios from "axios";
import MyLink from "../component/MyLink";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/LandingPage.module.scss";
import ProductListGrid from "../component/ProductList-grid";
import ProductListFlex from "../component/ProductList-flex";
import { connectDB_frontend } from "../_api/middleware/mongodb";
import { Product } from "../_api/models";
import { distinct } from "../shared/shared_functions";

const getUrl = (array) => {
  const query = array.map((element) => `representation=${element}`);
  return query.join("&");
};

type responseData = {
  more: boolean;
  products: [];
  error: [];
};

export default function Home({ representation_items, hot_deals, new_items }) {

  // console.log(representation_items, hot_deals, new_items)
  return (
    <div
      className={`${styles.landingPage} big-container`}
      style={{ fontSize: "0.8em" }}
    >
      <Head>
        <meta
          name="description"
          content="Articles, deals and autres produits vendu par KdShop"
        />
        <title>Decouvrez nos articles et deals</title>
      </Head>

      <div className={styles.imageContainer}>
        <div className={styles.landingImages}>
          <picture>
            <source
              media="(min-width: 700px)"
              srcSet="https://res.cloudinary.com/dkoatnxem/image/upload/ar_2,c_crop/c_scale,w_1000/v1634645262/chris-ainsworth-tIUXSj2iFVY-unsplash_zlgadf.jpg"
            />
            <source
              media="(min-width: 470px)"
              srcSet="https://res.cloudinary.com/dkoatnxem/image/upload/ar_1.4,c_crop/c_scale,w_800/v1635785732/istockphoto-1254508881-170667a_imegeh.jpg 600w"
            />
            <source srcSet="https://res.cloudinary.com/dkoatnxem/image/upload/v1635785618/photo-1560769629-975ec94e6a86_u1flvd.jpg 600w" />
            <img
              src="https://res.cloudinary.com/dkoatnxem/image/upload/v1635785618/photo-1560769629-975ec94e6a86_u1flvd.jpg "
              alt=""
            />
          </picture>
        </div>
        <div className={styles.c_to_act}>
          <button>
            <MyLink href={"/find?categories=femme"}>Pour Homme</MyLink>
          </button>
          <button>
            <MyLink href={"/find?categories=homme"}>Pour Femme</MyLink>
          </button>
          <button>
            <MyLink href={"/find?categories=enfant"}>Pour Enfant</MyLink>
          </button>
        </div>
      </div>

      {representation_items.length > 0 && (
        <div className={styles.discover}>
          <h3>Nos produits</h3>
          <ProductListFlex items={representation_items} />
        </div>
      )}

      {hot_deals.length > 0 && (
        <div className={styles.proposition}>
          <h3>Nos deals</h3>
          <ProductListGrid
            displayType="single"
            aspect_ratio={120}
            items={hot_deals}
          />
        </div>
      )}

      {new_items.length > 0 && (
        <div className={styles.new}>
          <h3>Nouveaux articles</h3>
          <ProductListGrid
            displayType="double"
            aspect_ratio={120}
            items={new_items}
          />
        </div>
      )}
    </div>
  );
}

export const getStaticProps = async () => {
  await connectDB_frontend();

  let representation_items = await Product.find_visible({ representation: { $nin: ["hot deals", "none"] }, quantity: {$gte: 0} }, [
    "productName",
    "description",
    "representation",
    "pr_image_url"
  ]).lean();

  const verifier = {};

  representation_items.forEach((item) => (item._id = item._id.toString()));
  representation_items  = distinct(representation_items, verifier, (item) => [item._id, item.representation] )

  // console.log(verifier)

  let hot_deals = await Product.find_visible({representation: "hot deals" , quantity: {$gte: 0}}, ["productName", "price", "description", "pr_image_url"]).lean();

  hot_deals.forEach((item) => (item._id = item._id.toString()));
  hot_deals = distinct(hot_deals, verifier)

  // console.log(verifier)

  let new_items = await Product.find({quantity: {$gte: 0}}, ["productName", "price", "description", "pr_image_url"]).sort({addedAt: -1}).limit(20).lean()

  new_items.forEach(item => item._id = item._id.toString())
  new_items = distinct(new_items, verifier)

  return {
    props: { representation_items, hot_deals, new_items },
    revalidate: process.env.VERCEL_ENV === "production" && 5 * 60 && 60
  };

};
