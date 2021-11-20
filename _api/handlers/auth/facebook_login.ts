import axios from "axios";
import jwtDecode from "jwt-decode";
import { User } from "../../models";
import { createRefreshToken, createToken } from "../../utils/jwt";

const handle_facebook_login = async (req, res) => {
  const body = req.body;
  // console.log(body.accessToken)
  const uri = `https://graph.facebook.com/v8.0/me?field=username,first_name,last_name&access_token=${body.accessToken}`;


  let response;
  response = await axios.get(uri).catch((err) => err.response);

  const { id, name, firstName, lastName } = response.data;

  const myUser = {
    password: "facebook",
    role: "user",
    Oauth: {
      method: "facebook",
      id,
    },
    cart: [],
    firstName: firstName,
    lastName: lastName,
    username: name,
  };

  let mongo_response = await User.findOneAndUpdate(
    { "Oauth.method": "facebook", "Oauth.id": id },
    { $setOnInsert: myUser },
    {
      upsert: true,
      new: true,
    }
  ).catch(err => console.log(err.message));

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

  // @ts-ignore
  const { username, role, cart, _id } = mongo_response;

  const userData = {
    firstName,
    lastName,
    username,
    role,
    cart,
    _id,
  };

  res.send({ userData, token: {value: token, expiresAt} });
  return;
};

export default handle_facebook_login;
