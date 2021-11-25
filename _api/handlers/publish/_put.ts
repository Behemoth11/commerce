import { Types } from "mongoose";
import { string_and_array_to_array } from "../../../shared/UtilityFunctions";
import { FacebookPost } from "./../../models/index";

const handle_put = async (req, res) => {
  try {
    const query = req.query;
    const body = req.body;
    const action = query.action;
    const post_ids_string = string_and_array_to_array(query["post_ids[]"]);

    const post_ids = post_ids_string.map((id) => new Types.ObjectId(id));

    switch (action) {
      case "add_to_set":

        console.log(body.update)
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
        
        const mongo_response_1 = await FacebookPost.updateMany(
          { _id: { $in: post_ids }, owner: new Types.ObjectId(req.user._id) },
          { $set: body.update }
        ).catch((err) => err.message);

        if (mongo_response_1.modifiedCount > 0) {
          return res.status(200).json({
            message: "The Post was updated",
          });
        } else if (mongo_response_1.matchedCount === 0) {
          return res.status(404).json({
            message: "the item to update does not exist",
          });
        } else {
          return res.status(404).json({
            message: "something went wrong",
          });
        }
      default:
        return res.status(404).json({
          message: "unknown operation",
        });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      int:"The ids passed must have been wrong"
    });
  }
};

export default handle_put;
