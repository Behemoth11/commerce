import { Types } from "mongoose";
import {
  formatUrls,
  string_and_array_to_array,
} from "../../../shared/UtilityFunctions";
import post_with_photo_m from "../../utils/facebook_fn/post_with_photo_m";
import { FacebookPost } from "./../../models/index";

const handle_put = async (req, res) => {
  try {
    const query = req.query;
    const body = req.body;
    const action = query.action;
    const post_ids_string = string_and_array_to_array(query["post_ids[]"]);

    // console.log("the reuqest reqched hree 1")
    const post_ids = post_ids_string.map((id) => new Types.ObjectId(id));

    // console.log("The request reached here 2")

    switch (action) {
      case "rm_fr_set":
        const rm_response = await FacebookPost.updateMany(
          { _id: { $in: post_ids }, owner: new Types.ObjectId(req.user._id) },
          { $pull: { grouping: new Types.ObjectId(query._id) } }
        );

        if (rm_response.modifiedCount > 0) {
          return res.status(200).json({
            message: "The Post was updated",
          });
        } else if (rm_response.matchedCount === 0) {
          return res.status(404).json({
            message: "the item to update does not exist",
          });
        } else if (
          rm_response.modifiedCount === 0 &&
          rm_response.matchedCount >= 1
        ) {
          return res.status(409).json({
            message: "the item is already in the group",
          });
        } else {
          return res.status(404).json({
            message: "something went wrong",
          });
        }

        break;
      case "add_to_set":
        // console.log(body.update)
        const mongo_response = await FacebookPost.updateMany(
          { _id: { $in: post_ids }, owner: new Types.ObjectId(req.user._id) },
          { $addToSet: body.update }
        );

        if (mongo_response.modifiedCount > 0) {
          return res.status(200).json({
            message: "The Post was updated",
          });
        } else if (mongo_response.matchedCount === 0) {
          return res.status(404).json({
            message: "the item to update does not exist",
          });
        } else if (
          mongo_response.modifiedCount === 0 &&
          mongo_response.matchedCount >= 1
        ) {
          return res.status(409).json({
            message: "the item is already in the group",
          });
        } else {
          return res.status(404).json({
            message: "something went wrong",
          });
        }

      case "update_field":
        delete body.update.fb_id;
        delete body.update.owner;

        // console.log(post_ids);

        if (post_ids.length < 1) {
          return res.status(404).json({
            message: "Aucun groupe spécifié",
          });
        }

        // console.log(body.update)

        const mongo_response_1 = await FacebookPost.updateMany(
          { _id: { $in: post_ids }, owner: new Types.ObjectId(req.user._id) },
          { $set: body.update }
        ).catch((err) => err.message);

        console.log(mongo_response_1);

        if (mongo_response_1.modifiedCount > 0) {
          return res.status(200).json({
            message: "The Post was updated",
          });
        } else if (mongo_response_1.matchedCount === 0) {
          return res.status(404).json({
            message: "Le groupe n'existe pas.",
          });
        } else {
          return res.status(404).json({
            message: "something went wrong",
          });
        }

      case "fb_publish_group":
        const post_id = new Types.ObjectId(query._id);
        const post = await FacebookPost.findOne({
          _id: post_id,
          owner: new Types.ObjectId(req.user._id),
        })
          .populate("grouping", "pr_image_url")
          .lean();

        if (post.published.fb)
          return res
            .status(500)
            .json({ message: "published post cannot be republished" });

        const raw_url = post.grouping.map((item) => item.pr_image_url[0]);

        // const post_picture = await Product.find(
        //   { _id: product_ids.map((Id) => new Types.ObjectId(Id)) },
        //   ["pr_image_url"]
        // ).lean();

        // const Post =

        const link = `https://${
          body.host || process.env.VERCEL_URL
        }/groups/${post._id}`;

        const url = formatUrls(raw_url);

        const facebook_post = await post_with_photo_m(
          post.message,  link,
          ...url
        );

        FacebookPost.updateOne(
          {
            _id: post._id,
          },
          {
            $set: {
              "published.fb": true,
              "published.kdshop": true,
              fb_id: facebook_post.id,
            },
          }
        ).catch((err) => console.log(err.message));

        if (post.post_type != "normal_post") {
          // FacebookPost.create({
          //   grouping: [],
          //   owner: req.user._id,
          //   message: post.message,
          //   post_name: post.post_name,
          // });
        }

        if (facebook_post.id)
          return res.status(200).json({
            message: "item successfully posted",
          });

        break;

      default:
        return res.status(404).json({
          message: "unknown operation",
        });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      int: "The ids passed must have been wrong",
    });
  }
};

export default handle_put;
