import { Types } from "mongoose";
import { Product } from "../../models";
import { eraseImages } from "../../utils/cloudinary";

const handle_delete = async (req, res) => {
  const error = [];
  const Id = req.query.product_id;
  // console.log("the request reached me")

  const mongo_product = await Product.findOne({
    _id: new Types.ObjectId(Id),
  }).lean();
  //@ts-ignore
  if (mongo_product.owner != req.user._id || req.user.role !== "admin") {
    return res.status(401).json({ message: "could not process the operation" });
  }

  const erasedProduct = await Product.findOneAndUpdate(
    {
      _id: new Types.ObjectId(Id),
    },
    { $set: { quantity: -1 } }
  ).catch((err) => error.push(err.message));

  //@ts-ignore
  if (erasedProduct && erasedProduct.deletedCount == 0) {
    res.json({ message: "The query provided did not match any product" });
    return;
  }

  res.json({
    message: "success: modifications prendrons effet dans quelquest minutes",
    erasedProduct,
    error,
  });
};

export default handle_delete;
