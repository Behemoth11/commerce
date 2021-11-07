import {Feedback} from "../../models";

const handle_get = async (req, res) => {
      const error = [];
      //console.log("This is a get request")
      const mongo_response = await Feedback.find()
        .lean()
        .catch((err) => error.push(err.message));
      res.json({ mongo_response, error });
}

export default handle_get;
