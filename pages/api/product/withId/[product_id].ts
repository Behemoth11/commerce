import {
  GET_WITH_ID_handler,
  DELETE_handler,
  PUT_handler,
} from "../../../../_api/handlers/product";
import connectDB from "../../../../_api/middleware/mongodb";

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      await GET_WITH_ID_handler(req, res);
      break;
      
    case "PUT":
      await PUT_handler(req, res);
      break;

    case "DELETE":
      await DELETE_handler(req, res);
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
