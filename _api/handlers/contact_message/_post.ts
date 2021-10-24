import ContactMessage from "../../models/contact_message";

const handle_post = async (req, res) => {
        
  const {msg, focus} = req.body;
  const error = [];
  const mongo_response = await ContactMessage.create({
    msg,
    focus
  }).catch(err => error.push(err))
  res.send({
    message: "contact message successfuly added",
    mongo_response,
    error
  })
}

export default handle_post;