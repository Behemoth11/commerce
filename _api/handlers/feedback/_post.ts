import {Feedback} from "../../models";

const handle_post = async (req, res) => {
        
  const {msg, focus} = req.body;
  const error = [];
  const mongo_response = await Feedback.create({
    msg,
    focus
  }).catch(err => error.push(err.message))
  res.send({
    message: "feedback successfuly added",
    mongo_response,
    error
  })
}

export default handle_post;