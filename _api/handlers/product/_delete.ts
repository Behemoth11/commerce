

import { Types } from "mongoose";
import {Product} from "../../models";
import { eraseImages } from "../../utils/cloudinary";

const handle_delete = async (req, res) => {
  const error = [];
  const Id = req.query.product_id;
  console.log("the request reached me")

  const mongo_product = await Product.findOne({
    _id: new Types.ObjectId(Id),
  }).lean();
  //@ts-ignore
  if (mongo_product.owner != req.user._id) {
    return res.status(401).json({ message: "could not process the operation" });
  }
  
  const erasedProduct = await Product.findOneAndUpdate({
    _id: new Types.ObjectId(Id),
  }, {$set: {quantity: 0}}).catch((err) => error.push(err.message));

  //@ts-ignore
  if (erasedProduct && erasedProduct.deletedCount == 0) {
    res.json({ message: "The query provided did not match any product" });
    return;
  }

  try {
    eraseImages(
      [
        //@ts-ignore
        ...erasedProduct.pr_image_url,
        //@ts-ignore
        ...erasedProduct.all_pr_image_url,
      ],
      error
    );
  } catch (err) {
    error.push(err.message);
  }

  res.json({
    erasedProduct,
    error,
  });
};

export default handle_delete;
