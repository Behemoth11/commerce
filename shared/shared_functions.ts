import { useAuthcontext } from "./../Contexts/GlobalContext";
import { categories } from "./../component/Layout/NavBar/navBarSections";
import axios from "axios";
import { getRelated } from "../component/Layout/NavBar/navBarSections";

export const fetchNavigation = async (categories, cb, origin?: string) => {
  let response;

  if (categories != "all") {
    const representation = getRelated(categories);
    if (representation.length >= 5)
      response = await axios
        .get(
          `/api/product/representation?${representation}&field=pr_image_url&field=description&field=productName&field=representation&ne=${origin}`
        )
        .catch((err) => console.log(err));
  }

  if (!response || response.data.products.length < 2) {
    response = await axios
      .get(
        `/api/product/representation?representation=all&field=pr_image_url&field=description&field=productName&field=representation&limit=15&ne=${origin}`
      )
      .catch((err) => console.log(err));
  }

  cb(distinct(response.data.products, {}));
};

export const fecthRelated = async (product, cb) => {
  let response;
  response = await axios
    .get(
      `/api/product?categories=search&&categories=${product.categories.join(
        " "
      )}&ne=${
        product._id
      }&limit=15&field=_id&field=productName&field=price&field=description&field=pr_image_url`
    )
    .catch((err) => (response = err.response));
  if (response.status === 200) {
    cb(response.data.products);
  } else {
    cb(null);
  }
};

export const compare = (obj1, obj2) => {
  obj1.focus = "";
  obj2.focus = "";

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length != keys2.length) return false;

  for (const key of keys1) {
    if (obj1[key] != obj2[key]) return false;
  }
  return true;
};

export const add_captchat_token = async (input) => {
  if (!input) throw new Error("The input to log the token was empty");

  //@ts-ignore
  const captchat = window.grecaptcha;

  if (!captchat) return;
  const captchat_token = await new Promise((resolve, reject) => {
    captchat.ready(function () {
      captchat
        .execute(process.env.NEXT_PUBLIC_RE_SITE_KEY, {
          action: "submit",
        })
        .then(function (token) {
          resolve(token);
        });
    });
  });

  input["captchat_token"] = captchat_token;
};

export const getSelectionArray = (selection) => {
  const post_to_affect = [];
  for (const post_id in selection) {
    if (selection[post_id]) post_to_affect.push(post_id);
  }
  return post_to_affect;
};

export const getGroups: (
  auth: any,
  setGroups: any,
  fields?: string[],
  published?: [boolean]
) => void = async (auth, setGroups, fields, published = [false]) => {
  let groups_response;
  groups_response = await auth.axios
    .get("/api/publish", {
      params: {
        which: "mine",
        limit: "10",
        published: published,
        field: fields || ["post_name", "message"],
      },
    })
    .catch((err) => (groups_response = err.response));

  if (groups_response.status === 200) {
    setGroups(groups_response.data.posts);
  } else {
    setGroups(null);
  }
};

export const distinct = (
  arr,
  verifier,
  get_id?: (item: { [prop: string]: string }) => string | string[]
) => {
  let result = [];

  let origin_i = 0;
  let target_i = 0;

  while (origin_i < arr.length) {
    const id = get_id ? get_id(arr[origin_i]) : arr[origin_i]?._id;

    if (verifier[id] === true) {
      origin_i++;
      continue;
    }

    arr[origin_i]._id = arr[origin_i]._id.toString();

    result[target_i] = arr[origin_i];

    if (Array.isArray(id)) {
      id.forEach((id) => (verifier[id] = true));
    } else {
      verifier[id] = true;
    }

    origin_i++;
    target_i++;
  }

  return result;
};

export const getDate = () => {
  var today = new Date();
  var dd: number|string = today.getDate();
  var mm: number | string = today.getMonth() + 1; //January is 0!
  var yyyy:number | string = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }


  return (yyyy + "-" + mm + "-" + dd) as string;
};

export const isEmpty = (arr: string | []) => {
  if (!arr || arr.length < 1) return true;
  return false;
};


export const clamp = (num, min, max) => Math.min(Math.max(num, min), max)