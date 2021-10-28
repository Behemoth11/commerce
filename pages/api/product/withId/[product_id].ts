import {
  GET_WITH_ID_handler,
  DELETE_handler,
  PUT_handler,
} from "../../../../_api/handlers/product";
import connectDB from "../../../../_api/middleware/mongodb";

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      GET_WITH_ID_handler(req, res);
      break;
      
    case "PUT":
      PUT_handler(req, res);
      break;

    case "DELETE":
      DELETE_handler(req, res);
      break;

    default:
      res.json({ message: "wrong method" });
  }
};

export default connectDB(handler);

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}
