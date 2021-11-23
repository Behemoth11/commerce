import LOGOUT_handler from "../../../_api/handlers/auth/logout";
import connectDB from "../../../_api/middleware/mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    await LOGOUT_handler(req, res);
  } else {
    res.send({ message: "I Thing you did something wrong" });
  }
};

export default connectDB(handler);
