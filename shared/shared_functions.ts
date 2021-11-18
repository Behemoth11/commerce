import { categories } from "./../component/Layout/NavBar/navBarSections";
import axios from "axios";
import { getRelated } from "../component/Layout/NavBar/navBarSections";

export const fetchNavigation = async (categories, cb) => {
  let response;
  if (categories != "all") {
    const representation = getRelated(categories);
    if (representation.length >= 5)
      response = await axios
        .get(
          `/api/product/representation?${representation}&field=pr_image_url&field=description&field=productName&field=representation`
        )
        .catch((err) => console.log(err));
  }

  if (!response || response.data.products.length < 2) {
    response = await axios
      .get(
        `/api/product/representation?representation=all&field=pr_image_url&field=description&field=productName&field=representation&limit=15`
      )
      .catch((err) => console.log(err));
  }
  cb(response.data.products);
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
