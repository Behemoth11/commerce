import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import ProductListFlex from "../../component/ProductList-flex";
import MoreProduct from "../../component/ProductList-flex/preset";
import ProductListGrid from "../../component/ProductList-grid";
import Header from "../../component/Text/Header";
import styles from "../../styles/groups.module.scss";

const INIT = Array.from({ length: 10 }).map((e) => ({ price: 100 }));

const get_prevalent = async (item_array) => {
  const CATEGORY = {};
  item_array.forEach((item) =>
    item.categories.forEach((category) =>
      CATEGORY[category] ? CATEGORY[category]++ : (CATEGORY[category] = 1)
    )
  );

  const arr_CATEGORY = [];

  for (const category in CATEGORY) {
    arr_CATEGORY.push([category, CATEGORY[category]]);
  }

  arr_CATEGORY.sort((cat_a, cat_b) => cat_b[1] - cat_a[1]);

  // console.log(arr_CATEGORY)
  return arr_CATEGORY;
};

const groups = ({ group, navigation }) => {
  const verifier = {};

  return (
    <div
      className={`big-container content`}
      style={{ padding: "0 var(--padding)", flexWrap: "wrap" }}
    >
      <Header level={2}>{group.post_name}</Header>
      <ProductListGrid
        displayType="double"
        aspect_ratio={120}
        items={group.grouping}
      />
      <br />

      {Object.keys(navigation).map((ctx) => {
        return (
          <MoreProduct
            items={navigation[ctx].map_unique(verifier)}
            title={`Voire plus de ${ctx}`}
            style={{ marginTop: "2em" }}
          />
        );
      }, verifier)}
    </div>
  );
};

export default groups;

import { Types } from "mongoose";
import { connectDB_frontend } from "../../_api/middleware/mongodb";
import { FacebookPost, Product } from "../../_api/models";
import { result } from "cypress/types/lodash";

export async function getStaticPaths() {
  // const { MongoClient } = (await import("mongodb")).default;

  await connectDB_frontend();

  const groups = await FacebookPost.find({ "published.kdshop": true }, ["_id"])
    .limit(1)
    .lean()
    .catch((err) => console.log(err));
  //   console.log(products);

  const paths = groups.map((group) => ({
    params: { groupId: group._id.toString() },
  }));

  //   console.log(paths);

  return {
    paths: paths,
    fallback: "blocking", // See the "fallback" section below
  };
}

export async function getStaticProps(context) {
  //   console.log("get static props");
  try {
    const group_id = context.params.groupId;
    await connectDB_frontend();

    //   console.log(group_id, "*********************");
    let group = await FacebookPost.find({
      _id: new Types.ObjectId(group_id),
      "published.kdshop": true,
    })
      .populate("owner", ["contact", "username"])
      .populate("grouping", [
        "pr_image_url",
        "productName",
        "price",
        "description",
        "categories",
      ])
      .lean();

    group = group[0]

    if (!group) {
      throw new Error("The page is not found");
    }

    group._id = group._id.toString();
    delete group.owner._id;

    group.grouping = group.grouping.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));

    const getLinks = async () => {
      const result = [];
      const prevalent = await get_prevalent(group.grouping);

      //   console.log("what is prevalent is ", prevalent)

      //   getCategories()

      const Max_FIELD = 4;

      var used_field = 0;

      if (group.theme) {
        result.concat(group.theme);
        used_field++;
      }

      for (let arr_cateogry of prevalent) {
        if (used_field == Max_FIELD) return result;
        result.push(arr_cateogry[0]);
        used_field++;
      }

      return result;
    };

    const links = await getLinks();

    const navigation_composed = {};

    const getCategories = async (category, obj, not_include) => {
      //   console.log(category)
      const response = await Product.find_visible(
        {
          categories: { $in: [category] },quantity: {$gte: 0} ,
          _id: {
            $nin: not_include.map((item) => new Types.ObjectId(item._id)),
          },
        },
        ["pr_image_url", "price", "description", "productName"]
      ).lean();

      // console.log(response, "the response")
      if (response.length > 0) {
        response.forEach((item) => (item._id = item._id.toString()));
        obj[category] = response;
      }
    };

    await Promise.all(
      links.map(
        async (link) =>
          await getCategories(link, navigation_composed, group.grouping)
      )
    );

    //   console.log(navigation_composed);

    //   console.log(links);

    // console.log(group)

    return {
      props: { group: group, navigation: navigation_composed }, // will be passed to the page component as props
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
