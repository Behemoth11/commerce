import RefreshToken from "../../models/refreshToken";
import { createToken, createRefreshToken } from "../../utils/jwt";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";

const handle_refresh = async (req, res) => {
  const refreshToken = req.cookies.z_model_23;

  try {
    let error;
  if (!refreshToken) {
    return res.json({
      message: "You do not deserve a token, you filfy human ahahah",
    });
  }

  const savedToken = await RefreshToken.findOneAndDelete({
    token: refreshToken,
  }).catch((err) => (error = err));
  if (!savedToken)
    return res.json({
      message: "Something went wrong 1",
    });

  let decodedToken;
  try {
    decodedToken = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET
    );
  } catch (error) {
    //console.log(error);
    return res.json({
      message: "why are you trying to hack me",
    });
  }

  //console.log("the decodet token is", decodedToken);
  if (!decodedToken)
    return res.json({
      message: "Something went wrong 2",
    });

  const { username, _id, role } = decodedToken;

  const user = { username, _id, role };

  const newAccessToken = createToken(user);
  const newDecodedToken = jwtDecode(newAccessToken);
  // @ts-ignore
  const expiresAt = newDecodedToken.exp;

  const newRefreshToken = await createRefreshToken(user);

  if (!newRefreshToken) {
    return res.json({ message: "we couldn't refresh the token" });
  }

  //console.log(newRefreshToken);
  // //console.log("I was asked to give a new refresh token")
  res.setHeader(
    "Set-Cookie",
    `z_model_23=${newRefreshToken}; httpOnly ; secure; sameSite; path=/; Max-Age=${
      365 * 24 * 60 * 60
    }`
  );

  res.json({
    message: "Authentication refresh successful!",
    token: newAccessToken,
    expiresAt,
  });
  } catch (err) {
    //console.log(err)
  }
  
};

export default handle_refresh;
