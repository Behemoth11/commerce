import { Types } from "mongoose";
import { formatUrls } from "../../../shared/UtilityFunctions";
import post_with_photo_m from "../../utils/facebook_fn/post_with_photo_m";
import { FacebookPost, Product } from "./../../models/index";

const handle_post = async (req, res) => {
  const data = req.body || {};
  const query = req.query;
  const target = req.query.target;
  // console.log(data)
  let error = "";

  switch (target) {
    case "group_post":
      const product_ids = data["ids[]"];
      // console.log(data)
      const item_group = await FacebookPost.create({
        grouping: product_ids,
        published: {
          kdshop: query.publish_kdshop || query.publish_facebook,
          fb: query.publish_facebook,
        },
        owner: req.user._id,
        lastEdit: new Date().getTime(),
        ...data
      }).catch((err) => error = err.message);

      if (data.publish_facebook) {
        const post_picture = await Product.find_visible(
          { _id: product_ids.map((Id) => new Types.ObjectId(Id)) },
          ["pr_image_url"]
        ).lean();
        const url = formatUrls(post_picture.map((item) => item.pr_image_url[0]));

        const link = `https://${
          data.host || process.env.VERCEL_URL
        }/groups/${item_group._id}`;

        const facebook_post = await post_with_photo_m(
          item_group.message , link,
          ...url
        );

        const final = await FacebookPost.updateOne(
          {
            _id: item_group._id,
          },
          { $addToSet: { fb_id: facebook_post.id } }
        ).catch((err) => console.log(err.message));

        // console.log(final);
      }

      if (error.length > 0)
        return res.status(500).json({ message: "something went wront", error });

      return res.status(200).json({
        message: "it was a success",
        post_id: item_group._id.toString(),
      });
    case "single":
      let url = data.url;

      if (!url) {
        const product = await Product.findOne_visible(
          {
            _id: new Types.ObjectId(data._id),
            owner: new Types.ObjectId(req.user._id),
          },
          "pr_image_url"
        )
          .lean()
          .catch((err) => console.log(err));
        url = product.pr_image_url && product.pr_image_url[0];
      }
      if (!url)
        return res
          .status(200)
          .json({ message: "we had issues finding the picture" });

      const message =
        data.message ||
        `nous avons un nouvel articles. Suivez le lien pour plus de ${data.nature}`;
      const link = `https://${
        data.host || process.env.VERCEL_URL
      }/product/${data._id}`;

      // const message = message_root + "\n\n" + link;
      const result = await post_with_photo_m(
        message,link,
        `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/` +
          url
      ).catch((err) => console.error(err.message));

      Product.updateOne(
        {
          _id: new Types.ObjectId(data._id),
          owner: new Types.ObjectId(req.user._id),
        },
        {
          $addToSet: { "fb.post_id": result._id },
          $set: { "fb.date_published": new Date().getTime() },
        }
      );

      console.log(result)
      if (result.id) {
        return res.status(200).json({
          post_id: result.id,
        });
      } else {
        return res.status(404).json({
          message: "something went wrong",
        });
      }
  }
};

export default handle_post;
