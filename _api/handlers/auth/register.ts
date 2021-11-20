import jwt from "jsonwebtoken";
import { User } from "../../models";
import jwtDecode from "jwt-decode";
import { userType } from "../../models/user";

import { createToken, createRefreshToken, hashPassword } from "../../utils/jwt";
import { createHandler } from "../../middleware/helpers";
import { blockBot } from "../../middleware/blockBot";

const handle_register = async (req, res) => {
  try {
    const { username, firstName, lastName } = req.body;

    const hashedPassword = await hashPassword(req.body.password);

    const userData = {
      username,
      firstName,
      lastName,
      password: hashedPassword,
      role: "user",
    };

    const existingUser = await User.findOne({
      username: userData.username,
    }).lean();

    if (existingUser) {
      return res.status(400).json({ message: "Username already in use " });
    }

    // @ts-ignore
    const savedUser: userType = await User.create(userData);

    if (savedUser) {
      const token = createToken(savedUser);
      const decodedToken = jwtDecode(token);
      // @ts-ignore
      const expiresAt = decodedToken.exp;

      const refreshToken = await createRefreshToken(savedUser);

      res.setHeader(
        "Set-Cookie",
        `z_model_23=${refreshToken}; httpOnly ; secure; sameSite; path=/ ; Max-Age=${
          365 * 24 * 60 * 60
        }`
      );

      const { firstName, lastName, username, role, cart, _id } = savedUser;

      const userData = {
        firstName,
        lastName,
        username,
        role,
        cart,
        _id,
      };

      return res.json({
        message: "User Created!",
        token,
        userData,
        expiresAt,
      });
    } else {
      return res.status(400).json({
        message: "There was a problem creating your account",
      });
    }
  } catch (err) {
    //console.log(err);
    return res.status(400).json({
      message: "There was a problem creating your account",
      err,
    });
  }
};

export default createHandler(blockBot, handle_register);
