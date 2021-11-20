// import PUT from "./_put";
import GET_post from "./_get";
import POST_post from "./_post";
import UPDATE_post from "./_put";
import DELETE_post from "./_delete";
import { createHandler } from "../../middleware/helpers";
import { addUser } from "../../middleware/addUser";
import { enforceRole } from "../../middleware/enforceRole";

// export const PUT_handler = PUT;
export const GET_handler = createHandler(
  addUser,
  enforceRole("seller"),
  GET_post
);

export const POST_handler = createHandler(
    addUser,
    enforceRole("seller"),
    POST_post
);

export const DELETE_handler = createHandler(
  addUser,
  enforceRole("seller"),
  DELETE_post
);

export const PUT_handler = createHandler(
  addUser,
  enforceRole("seller"),
  UPDATE_post,
)
