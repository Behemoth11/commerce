import { resetHistory } from "cypress/types/sinon";
import { ContactMessage } from "../../models";

const handle_post = async (req, res) => {
  const { msg, focus, contact } = req.body;
  const sender_id = req.user.id;

  let error;
  const mongo_response = await ContactMessage.create({
    msg,
    focus,
    contact,
    sender_id,
  }).catch((err) => (error = err.message));

  if (error) {
    res.status(500).json({
      message: "something went wrong",
      error
    });
  } else {
    res.send({
      message: "contact message successfuly added",
      mongo_response,
    });
  }
};

export default handle_post;
