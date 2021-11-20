import verify_if_bot from "../utils/verify_if_bot";

export const blockBot = async (req, res, cb) => {

  if (process.env.VERCEL_ENV === "development") return cb(req, res);
  
  const captchat_token = req.body.captchat_token;
  if (!captchat_token)
    return res
      .status(400)
      .json({ message: "we could not prove that you were human, try again." });

  const is_not_a_bot = await verify_if_bot(captchat_token);

  if (is_not_a_bot) {
      console.log("is the sender a human : ", is_not_a_bot)
    cb(req, res);
  } else {
    return res
      .status(400)
      .json({ message: "we could not prove that you were human, try again." });
  }
};
