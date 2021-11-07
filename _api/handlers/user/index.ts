import GET_user from "./_get";
import UPDATE_user from "./_put";
import DELETE_user from "./_delete";
import { addUser } from "../../middleware/addUser";
import { createHandler } from "../../middleware/helpers";
import { enforceRole } from "../../middleware/enforceRole";

// export const PUT_handler = PUT;

export const GET_handler = createHandler(
  addUser,
  GET_user
);
export const PUT_handler = createHandler(
    addUser,
    enforceRole("user"),
    UPDATE_user
);
  
export const DELETE_handler = createHandler(
  addUser,
  enforceRole("user"),
  DELETE_user
);;
