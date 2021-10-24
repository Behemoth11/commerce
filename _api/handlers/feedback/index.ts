// import PUT from "./_put";
import GET_feedback from "./_get";
import POST_feedback from "./_post";
import DELETE_feedback from "./_delete";
import { createHandler } from "../../middleware/helpers";
import { addUser } from "../../middleware/addUser";
import { enforceRole } from "../../middleware/enforceRole";

// export const PUT_handler = PUT;
export const GET_handler = createHandler(
  addUser,
  enforceRole("admin"),
  GET_feedback
);

export const POST_handler = createHandler(
    addUser,
    POST_feedback
);

export const DELETE_handler = createHandler(
  addUser,
  enforceRole("admin"),
  DELETE_feedback
);
