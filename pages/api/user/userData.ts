import {
  DELETE_handler,
  GET_handler,
  PUT_handler,
} from "../../../_api/handlers/user";
import connectDB from "../../../_api/middleware/mongodb";

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      await GET_handler(req, res);
      break;

    case "PUT":
      await PUT_handler(req, res);
      break;

    case "DELETE":
      await DELETE_handler(req, res);
      break;

    default:
      res.send(404).send({ message: "wrong method" });
  }
};

export default connectDB(handler);
