import { Product } from "../../models";
import cloudinary, { uploadMany } from "../../utils/cloudinary";
import post_with_photo_m from "../../utils/facebook_fn/post_with_photo_m";

const handle_post = async (req, res) => {
  const data = req.body;
  const error = [];

  const [pr_image_url, all_pr_image_url] = await Promise.all([
    await uploadMany(data["presentationImage"], error, {}).catch((err) =>
      error.push(err.message)
    ),
    await uploadMany(data["images"] || [], error, {}).catch((err) =>
      error.push(err.message)
    ),
  ]);

  if (req.user.role != "admin") delete data.representation;

  const meta = data.meta;

  const _categories = data.categories || [];

  let categories = [data.nature];
  for (let i=0; i < _categories.length; i ++){
    if (_categories[i] != data.nature) categories.push(_categories[i]);
  }

  /************mongoDb upload***************/

  const mongo_response = await Product.create({
    categories, //array
    pr_image_url, //array
    tags: data.tags, //array
    all_pr_image_url, //array
    price: data.price, //number
    color: data.color, //array
    owner: req.user._id,
    nature: data.nature,
    quantity: data.quantity,
    location: data.location, //string
    materials: data.materials, //array
    description: data.description,
    addedAt: new Date().getTime(),
    productName: data.productName, //string
    representation: data.representation || "none",
  }).catch((err) => error.push(err.message));


  if (error.length > 0) {
    res.status(406).json({ message: "Something Went wrong", error });
  } else {
    res.status(200).json({ message: "everything is good" , _id: mongo_response._id});
  }

};

export default handle_post;
