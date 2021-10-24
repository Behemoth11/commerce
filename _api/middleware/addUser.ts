import jwt from "jsonwebtoken";

export const addUser = (req, res, cb) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    req.user = null;
    return cb(req, res);
  }

  const token = authorization;
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {

      req.user = null;
      cb(req, res);
      return;
    }
    req.user = user;
    cb(req, res);
  });
};
