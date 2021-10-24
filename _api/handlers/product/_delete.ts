

import { Types } from "mongoose";
import Product from "../../models/Product";
import { eraseImages } from "../../utils/cloudinary";

const handle_delete = async (req, res) => {
  const error = [];
  const Id = req.query.product_id;
  console.log("the request reached me")

  const erasedProduct = await Product.findOneAndDelete({
    _id: new Types.ObjectId(Id),
  }).catch((err) => error.push(err));

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
    error.push(err);
  }

  res.json({
    erasedProduct,
    error,
  });
};

export default handle_delete;
