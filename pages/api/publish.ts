import {
  PUT_handler,
  GET_handler,
  POST_handler,
  DELETE_handler,
} from "../../_api/handlers/publish";
import connectDB from "../../_api/middleware/mongodb";

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      //console.log("get")
      await GET_handler(req, res);
      break;

    case "POST":
      //console.log("post")
      await POST_handler(req, res);
      break;

    case "DELETE":
      //console.log("delete")
      await DELETE_handler(req, res);
      break;

    case "PUT":
      //console.log("delete")
      await PUT_handler(req, res);
      break;

    default:
      res.status(404).send({ message: "wrong method" });
  }
};

export default connectDB(handler);
