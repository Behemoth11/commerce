import { GET_WITH_REPRESENTATION_handler } from "../../../_api/handlers/product";
import connectDB from "../../../_api/middleware/mongodb";

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      await GET_WITH_REPRESENTATION_handler(req, res);
      break;

    default:
      res.send(404).send({ message: "wrong method" });
  }
};

export default connectDB(handler);
