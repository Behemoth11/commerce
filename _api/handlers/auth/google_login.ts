import Cookies from "cookies";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import { User } from "../../models";
import { getGoogleAuthURL, getGoogleUser } from "../../utils/google_auth";
import {
  createToken,
  createRefreshToken,
  verifyPassword,
} from "../../utils/jwt";

const google_url = getGoogleAuthURL();

const handle_google_login = async (req, res) => {
  const code = req.query.code;
  if (code) {
    const user = await getGoogleUser({ code });
    const { id, given_name, name, email, family_name } = user;
    const myUser = {
      firstName: "",
      username: email,
      password: "google",
      role: "user",
      lastName: family_name,
      Oauth: {
        method: "google",
        id,
      },
      contact: {
        email: email
      },
      cart: [],
    };

    const mongo_response = await User.findOneAndUpdate(
      { "Oauth.method": "google", "Oauth.id": id },
      { $setOnInsert: myUser },
      {
        upsert: true,
        new: true,
      }
    );

    const token = createToken(mongo_response);
    const decodedToken = jwtDecode(token);
    // @ts-ignore
    const expiresAt = decodedToken.exp;
    const refreshToken = await createRefreshToken(mongo_response);

    res.setHeader(
      "Set-Cookie",
      `z_model_23=${refreshToken}; httpOnly ; secure; sameSite; path=/ ; Max-Age=${
        365 * 24 * 60 * 60
      }`
    );

    res.send(`
        <!DOCTYPE html>
        <html>
            <script>
            localStorage.setItem("meta_64","1")
            window.close()
            </script>
        </html>`);
    return;
  }
  console.log("The end point")
  res.send({
    url: google_url,
  });
};

export default handle_google_login;
