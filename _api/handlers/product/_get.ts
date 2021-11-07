import { string_and_array_to_array } from "../../../shared/UtilityFunctions";
import { Product } from "../../models";
import cloudinary from "../../utils/cloudinary";

const handle_get = async (req, res) => {
  const query = req.query;
  const error = [];
  let page = 0,
    limit = 50;
  let field = query.field;

  try {
    if (query.page) page = parseInt(query.page) - 1;
    if (query.limit) limit = parseInt(query.limit);
  } catch (err) {
    error.push(err.message);
  }

  delete query.page;
  delete query.limit;
  delete query.field;

  const keys = Object.keys(query);
  const searchQuery: { [key: string]: {} } = {};

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
        searchQuery[key] = { $all: string_and_array_to_array(query[key]) };
        break;
      default:
        searchQuery[key] = { $in: string_and_array_to_array(query[key]) };
    }
  }

  // console.log(searchQuery);

  let products = await Product.find(searchQuery, field)
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

  res.json({
    products,
    error,
    more,
  });
};

export default handle_get;
