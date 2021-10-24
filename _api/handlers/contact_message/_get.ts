import ContactMessage from "../../models/contact_message";
import {addUser} from "../../middleware/addUser";

const handle_get = async (req, res) => {
      const error = [];
      const mongo_response = await ContactMessage.find()
        .lean()
        .catch((err) => error.push(err));
      res.json({ mongo_response, error });
}

export default handle_get;
