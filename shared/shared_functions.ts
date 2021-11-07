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
        `/api/product/representation?representation=all&field=pr_image_url&field=description&field=productName&field=representation&limit=4`
      )
      .catch((err) => console.log(err));
  }
  cb(response.data.products);
};

export const fecthRelated = async (product, cb) => {
  let response;
  if (product.related.length > 0) {
    response = await axios.get(
      `/api/product/withId/${product.related.join(",")}`
    );
  }
  if (response) {
    cb(response.data.products);
  }
};
