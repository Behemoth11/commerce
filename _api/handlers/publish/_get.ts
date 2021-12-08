import { Types } from "mongoose";
import { Product, FacebookPost } from "./../../models/index";

const handle_get = async (req, res) => {
  const body = req.body;
  const query = req.query;
  let posts;
  let error;

  switch (query.which) {
    case "mine":
      if (!req.user)
        return res
          .status(500)
          .json({ message: "you need to be connected to see your groups" });

      // console.log("the new query  ", query)

      if (query["field[]"]?.includes("grouping")) {

        posts = await FacebookPost.find(
          {
            owner: new Types.ObjectId(req.user._id),
            "published.fb": { $in: query["published[]"] },
          },
          query["field[]"]
        )
          .limit(query.limit || 20)
          .sort({ lastEdit: -1 })
          .populate("grouping", ["pr_image_url", "productName", "price"])
          .lean();

        // console.log(posts)
      } else {
        posts = await FacebookPost.find(
          {
            owner: new Types.ObjectId(req.user._id),
            "published.fb": { $in: query["published[]"] },
          },
          query["field[]"]
        )
          .limit(query.limit || 20)
          .sort({ lastEdit: -1 })
          .lean();
      }

      res.status(200).json({
        posts,
      });

      break;

    case "with_id":
      if (!req.user)
        return res
          .status(500)
          .json({ message: "you need to be connected to see your groups" });

      const post = await FacebookPost.findOne({
        owner: new Types.ObjectId(req.user._id),
        _id: new Types.ObjectId(req.query._id),
      });
      if (post) {
        res.status(200).json({ post });
      } else {
        res.status(404).json({
          message: "item not found",
        });
      }
      break;

    default:
      posts = await FacebookPost.find(
        { "published.kdshop": true },
        query["field[]"]
      )
        .limit(query.limit || 20)
        .sort({ lastEdit: -1 })
        .lean();
      return res.status(200).json({
        posts,
      });
  }
};

export default handle_get;
