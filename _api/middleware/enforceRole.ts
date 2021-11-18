import { role_dic } from "../../GLOBALVARIABLE"

export const enforceRole = (role) => (req, res, cb) => {
  if (!req.user || !req.user.role) {
    return res.status(400).send({message: "Connect to your seller account to upload!"})
  } else if (role_dic[req.user.role] >= role_dic[role]) {
    cb(req, res)
  } else {
    // console.log("third one one")
    res.status(400).send({message: "you must upgrade your accout to perform this operation"})
  }
}