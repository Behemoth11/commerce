// import model_name from "../../models/file_name";

import { Types } from "mongoose";
import { Product } from "../../models";
import { eraseImages, uploadMany } from "../../utils/cloudinary";

const handle_put = async (req, res) => {
  const data = req.body;
  const _id = req.query.product_id;
  const error = [];
  const not_changed = {};
  const old_images = data.pr_image_url.concat(data.all_pr_image_url);

  const mongo_product = await Product.findOne({
    _id: new Types.ObjectId(_id),
  }).lean();
  //@ts-ignore
  if (mongo_product.owner != req.user._id) {
    return res.status(401).json({ message: "could not process the operation" });
  }

  const [pr_image_url, all_pr_image_url] = await Promise.all([
    uploadMany(data["presentationImage"], error, not_changed),
    uploadMany(data["images"], error, not_changed),
  ]);

  const erase = await eraseImages(
    old_images.filter((image) => !not_changed[image]),
    error
  );

  // console.log("the old images are :", old_images)
  // console.log("we erased :", erase)
  // console.log("the one on the server are :" , not_changed)

  const mongo_response = await Product.updateOne(
    { _id: new Types.ObjectId(_id) },
    {
      pr_image_url, //array
      tags: data.tags, //array
      all_pr_image_url, //array
      price: data.price, //number
      color: data.color, //array
      location: data.location, //string
      materials: data.materials, //array
      categories: data.categories, //array
      description: data.description,
      productName: data.productName, //string
      representation: data.representation || "none",
    }
  ).catch((err) => error.push(err.message));

  if (error.length > 0) {
    res.status(406).json({ message: "Something Went wrong", error });
  } else {
    res.status(200).json({ mongo_response, error });
  }
};

export default handle_put;
