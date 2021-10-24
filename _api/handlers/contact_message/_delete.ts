import ContactMessage from "../../models/contact_message";

const handle_delete = async (req, res) => {
  const {_id}= req.query;
  const error = [];
  if (!_id) return res.send("error: _id field is missing in query")

  const mongo_response = await ContactMessage.findByIdAndDelete(_id).catch(err => error.push(err));

  res.send({
    message: "feedback successfully deleted",
    mongo_response, 
    error
  })
}

export default handle_delete;
