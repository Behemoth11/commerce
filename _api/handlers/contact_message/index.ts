// import PUT from "./_put";
import GET_contact_message from "./_get";
import POST_contact_message from "./_post";
import DELETE_contact_message from "./_delete";
import { addUser } from "../../middleware/addUser";
import { createHandler } from "../../middleware/helpers";
import { enforceRole } from "../../middleware/enforceRole";

export const GET_handler = createHandler(
  addUser,
  enforceRole("admin"),
  GET_contact_message
);
export const POST_handler = createHandler(
    addUser,
    POST_contact_message
);
  
export const DELETE_handler = createHandler(
    addUser,
    DELETE_contact_message
  );;
