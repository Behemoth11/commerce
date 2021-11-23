import { Types } from "mongoose";
import { formatUrl } from "../../../shared/UtilityFunctions";
import post_with_photo_m from "../../utils/facebook_fn/post_with_photo_m";
import { FacebookPost, Product } from "./../../models/index";

const handle_post = async (req, res) => {
  const data = req.body;
  const target = req.query.target;

  switch (target) {
    case "group_post":
      const product_ids = data["ids[]"];
      const item_group = await FacebookPost.create({
        grouping: product_ids,
        published: {
          kdshop: data.publish_kdshop,
          fb: data.publish_facebook,
        },
        owner: req.user._id,
        message: data.message,
        post_name: data.post_name,
      }).catch((err) => console.log(err.message));

      if (data.publish_facebook) {
        const post_picture = await Product.find(
          { _id: product_ids.map((Id) => new Types.ObjectId(Id)) },
          ["pr_image_url"]
        ).lean();
        const url = formatUrl(post_picture.map((item) => item.pr_image_url[0]));

        const facebook_post = await post_with_photo_m(
          item_group.message,
          ...url
        );

        const final = await FacebookPost.updateOne(
          {
            _id: item_group._id,
          },
          { $set: { fb_id: facebook_post.id } }
        ).catch((err) => console.log(err.message));

        // console.log(final);
      }

      return res.status(200).json({
        message: "it was a success",
        post_id: item_group._id.toString(),
      });
    case "single":
      let url = data.url;

      if (!url) {
        const product = await Product.findById(data._id, "pr_image_url").lean();
        url = product.pr_image_url && product.pr_image_url[0];
      }
      if (!url)
        return res
          .status(200)
          .json({ message: "we had issues finding the picture" });

      const message_root =
        data.message ||
        `nous avons un nouvel articles. Suivez le lien pour plus de ${data.categories[0]}`;
      const message_template = `https://${process.env.VERCEL_URL || data.host}/product/${data._id}`;

      const message = message_root + "\n" + message_template;
      const result = await post_with_photo_m(
        message,
        "https://res.cloudinary.com/dkoatnxem/image/upload/" + url
      ).catch((err) => console.log(err.message));

      if (result.id) {
        return res.status(200).json({
          post_id: result.id,
        });
      }else{
        return res.status(404).json({
          message: "something wen wrong"
        })
      }

      break;
  }
};

export default handle_post;
