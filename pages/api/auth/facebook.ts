
import FACEBOOK_LOGIN_handler from "../../../_api/handlers/auth/facebook_login";
import connectDB from "../../../_api/middleware/mongodb";

const handler = async (req, res) => {
    // return res.send("This is the handpoing")
    if (req.method === "POST"){
        
        FACEBOOK_LOGIN_handler(req, res)
    } else{
        res.send({message: "I Thing you did something wrong"})
    }
};

export default connectDB(handler);