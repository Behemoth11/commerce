import { string_and_array_to_array } from "../../../shared/UtilityFunctions";
import Product from "../../models/Product";
import cloudinary from "../../utils/cloudinary";
import { Types } from "mongoose";

// req format : /api/product/withId/Id1,Id2,Id3....

const handle_get = async (req, res) => {
  const query = req.query;
  const error = [];

  console.log(req.query)

  const productIds = req.query.product_id
    .split(",")
    .map((Id) => new Types.ObjectId(Id));

  const products = await Product.find({ _id: { $in: productIds } }).catch(err => error.push(err));

  res.json({
    products,
    error,
  });
};

export default handle_get;
