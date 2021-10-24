import User from "../../models/user";
import RefreshToken from "../../models/refreshToken";
import { createHandler } from "../../middleware/helpers";
import { addUser } from "../../middleware/addUser";
import { enforceRole } from "../../middleware/enforceRole";

const handle_logout = async (req, res) => {
    const cookies = req.cookies;

    const erasedToken = RefreshToken.findOneAndDelete({ token: cookies.z_model_23 })
    res.setHeader("Set-Cookie",  `z_model_23=bye; httpOnly ; secure; sameSite; path=/;`)

    if (erasedToken){
        res.status(200).json({
            message: "successul logout"
        })
    }else{
        res.status(404).json({
            message: "we could not remove your session"
        })
    }

}

// export default createHandler(addUser, enforceRole("user"), handle_logout);
export default handle_logout;