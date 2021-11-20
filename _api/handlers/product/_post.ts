import {Product} from "../../models";
import cloudinary, { uploadMany } from "../../utils/cloudinary";

const handle_post = async (req, res) => {
  const data = req.body;
  const error = [];
  
  const [pr_image_url, all_pr_image_url] = await Promise.all([
    await uploadMany(data["presentationImage"],error,{}).catch((err) => error.push(err.message)),
    await uploadMany(data["images"]||[], error,{}).catch((err) => error.push(err.message)),
  ]);


  if (req.user.role != "admin") data.representation = "none";
  
  /************mongoDb upload***************/

  const mongo_response = await Product.insertMany([
    {
      pr_image_url, //array
      tags: data.tags, //array
      all_pr_image_url, //array
      price: data.price, //number
      color: data.color, //array
      owner: req.user._id,
      location: data.location, //string
      materials: data.materials, //array
      categories: data.categories, //array
      description: data.description,
      addedAt: new Date().getTime(),
      productName: data.productName, //string
      representation: data.representation || "none",
    },
  ]).catch((err) => error.push(err.message));

  if (error.length > 0) {
    res.status(406).json({ message: "Something Went wrong", error });
  } else {
    res.status(200).json({ message: "everythin is good",mongo_response, error });
  }
};

export default handle_post;
