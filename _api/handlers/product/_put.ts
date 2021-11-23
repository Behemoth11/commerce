// import model_name from "../../models/file_name";

import { Types } from "mongoose";
import { FacebookPost, Product } from "../../models";
import { eraseImages, uploadMany } from "../../utils/cloudinary";
import post_with_photo_m from "../../utils/facebook_fn/post_with_photo_m";

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
  if (mongo_product.owner != req.user._id && req.user.role != "admin") {
    return res
      .status(401)
      .json({ message: "you can only modiy items you ownn" });
  }

  const [pr_image_url, all_pr_image_url] = await Promise.all([
    uploadMany(data["presentationImage"], error, not_changed),
    uploadMany(data["images"], error, not_changed),
  ]);

  const erase = await eraseImages(
    old_images.filter((image) => !not_changed[image]),
    error
  );

  const meta = data.meta

  if (meta?.create_post) {
    const message_root =
      data.meta.message ||
      `nous avons un nouvel articles. Suivez le lien pour plus de ${data.categories[0]}`;
    const message_template = `${data.meta.host}/product/${_id}` 

    const message = message_root + "\n" + message_template
    const response = await post_with_photo_m(message, "https://res.cloudinary.com/dkoatnxem/image/upload/" + pr_image_url[0]);
  }
  if (meta?.post_with_group){
    const mongo_response = await FacebookPost.updateMany(
      { _id: { $in: meta.group_selection }, owner: new Types.ObjectId(req.user._id) },
      { $addToSet: {grouping: _id} }
    );

    console.log(mongo_response);
  }

  if (req.user.role != "admin") data.representation = "none";


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
    res.status(200).json({ mongo_response, _id: mongo_response._id });
  }
};

export default handle_put;
