import { string_and_array_to_array } from "../../../shared/UtilityFunctions";
import { Product } from "../../models";
import cloudinary from "../../utils/cloudinary";
import search from "./helper";

const handle_get = async (req, res) => {
  const query = req.query;
  const error = [];
  let page = 0;
  let limit = 50;
  let field = query.field;

  // console.log(query, 444444444444444444444);

  try {
    if (query.page) page = parseInt(query.page) - 1;
    if (query.limit) limit = parseInt(query.limit);
  } catch (err) {
    error.push(err.message);
  }

  delete query.page;
  delete query.limit;
  delete query.field;

  let is_a_text_search = false;

  const keys = Object.keys(query);
  const searchQuery: { [key: string]: {} } = {};

  if (query.ne) {
    searchQuery._id = { $ne: query.ne };
    delete query.ne;
  }

  if (query.categories && query.categories[0] === "search") {
    is_a_text_search = true;
  }

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    switch (key) {
      case "price":
        const range = query.price.split("to");
        if (range[1] != "infinity") {
          //infinity var rely only on var in frontend
          searchQuery["price"] = { $gt: range[0], $lt: range[1] };
        } else {
          searchQuery["price"] = { $gt: range[0] };
        }
        break;
      case "categories":
        if (is_a_text_search) break;
        searchQuery[key] = { $all: string_and_array_to_array(query[key]) };
        break;
      default:
        searchQuery[key] = { $in: string_and_array_to_array(query[key]) };
    }
  }

  if (is_a_text_search) {
    const { products, more } = await search(query.categories[1], searchQuery, {
      limit,
      field,
      page,
    });
    return res.status(200).json({
      products,
      more,
    });
  }

  let products = await Product.find(searchQuery, field)
    .sort({ addedAt: 1 })
    .skip(page * limit)
    .limit(limit + 1)
    .lean()
    .catch((err) => error.push(err.message));

  //@ts-ignore
  const more = products.length > limit;

  if (more) {
    //@ts-ignore
    products.pop();
  }

  // console.log(products, error)

  res.json({
    products,
    error,
    more,
  });
};

export default handle_get;
