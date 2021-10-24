import {
  DELETE_handler,
  GET_handler,
  PUT_handler,
} from "../../../_api/handlers/user";
import connectDB from "../../../_api/middleware/mongodb";

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      GET_handler(req, res);
      break;

    case "PUT":
      PUT_handler(req, res);
      break;

    case "DELETE":
      DELETE_handler(req, res);
      break;

    default:
      res.send(404).send({ message: "wrong method" });
  }
};

export default connectDB(handler);
