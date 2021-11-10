import {GET_handler, POST_handler, DELETE_handler} from "../../../_api/handlers/product";
import connectDB from "../../../_api/middleware/mongodb";

const handler = async (req, res) => {
  switch (req.method) {

    case "GET":
      GET_handler(req, res)
      break;

    case "POST":
      // console.log('tHE POST REQUEST IS BEING THREATED')
      POST_handler(req, res)
      break;
    
    default:
      res.send(404).send({message: "wrong method"})
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