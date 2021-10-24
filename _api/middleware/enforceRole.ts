import { role_dic } from "../../GLOBALVARIABLE"

export const enforceRole = (role) => (req, res, cb) => {
  console.log("the role enforcer is right here")
  console.log(req.user)
  if (!req.user || !req.user.role) {
    return res.status(400).send({message: "insufficiant authorization"})
  } else if (role_dic[req.user.role] >= role_dic[role]) {
    cb(req, res)
  } else {
    console.log("third one one")
    res.status(400).send({message: "insufficiant authorization"})
  }
}