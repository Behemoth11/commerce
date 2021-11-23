import { Types } from "mongoose";
import { FacebookPost } from "./../../models/index";

const handle_delete = async (req, res) => {
  try {
    const query = req.query;
    const post_id = req.query.post_id;

    const m_r = await FacebookPost.deleteOne({
      _id: new Types.ObjectId(post_id), owner: req.user._id
    });

    if (m_r.deletedCount > 0 ){
      return res.status(200).json({
        message: "success"
      })
    } else {
      return res.status(404).json({
        message: "item was not found"
      })
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export default handle_delete;
