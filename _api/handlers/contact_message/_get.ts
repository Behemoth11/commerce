import {ContactMessage} from "../../models";
import {addUser} from "../../middleware/addUser";

const handle_get = async (req, res) => {
      const error = [];
      const mongo_response = await ContactMessage.find()
        .lean()
        .catch((err) => error.push(err.message));
      res.json({ mongo_response, error });
}

export default handle_get;
