import { string_and_array_to_array } from "../../../shared/UtilityFunctions";
import {Product} from "../../models";
import cloudinary from "../../utils/cloudinary";
import { Types } from "mongoose";

// req format : /api/product/withId/Id1,Id2,Id3....

const handle_get = async (req, res) => {
  const query = req.query;
  const error = [];
  const field = query.field;

  // console.log(req.query);
  // console.log("I was hit");
  let products;

  const productIds = req.query.product_id
    .split(",")
    .filter((Id) => Id)
    .map((Id) => new Types.ObjectId(Id));

  if (!field || field.includes("owner")){
    products = await Product.find({ _id: { $in: productIds } }, field)
    .populate("owner", ["username", "phonenumber", "email"])
    .exec()
    .catch((err) => error.push(err.message));
  } else {
    products = await Product.find({ _id: { $in: productIds } }, field)
    .exec()
    .catch((err) => error.push(err.message));
  }

  res.json({
    products,
    error,
  });

};

export default handle_get;
