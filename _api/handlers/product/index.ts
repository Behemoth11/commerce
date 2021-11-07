import PUT from "./_put";
import GET from "./_get";
import POST from "./_post";
import DELETE from "./_delete";
import GET_WITH_ID from "./_get_with_id";
import GET_WITH_REPRESENTATION from "./_get_representation";
import { createHandler } from "../../middleware/helpers";
import { enforceRole } from "../../middleware/enforceRole";
import { addUser } from "../../middleware/addUser";

export const PUT_handler = createHandler(addUser, enforceRole("seller"), PUT);
export const POST_handler = createHandler(addUser, enforceRole("seller") ,POST);
export const DELETE_handler = createHandler(
  addUser,
  enforceRole("seller"),
  DELETE
);
export const GET_handler = GET;
export const GET_WITH_ID_handler = GET_WITH_ID;
export const GET_WITH_REPRESENTATION_handler = GET_WITH_REPRESENTATION;
