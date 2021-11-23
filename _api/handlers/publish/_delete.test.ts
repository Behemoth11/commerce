import { getRandomInteger } from "../../../shared/UtilityFunctions";
import axios from "axios";
import { execOnce } from "next/dist/shared/lib/utils";
require("dotenv").config();

const HOST = process.env.HOST || "http://localhost:3000";

describe("publish page -- facebook integration _1 item manipulation _delete", () => {
  let id;
  beforeAll(() => {
    return axios
      .post(
        HOST + "/api/publish",
        {
          ids: [],
          message: "Testing the api_automated",
          post_name: "the post name ",
        },
        {
          headers: {
            authorization: process.env.SELLER_TEST,
          },
          params: {
            target: "group_post"
          }
        }
      )
      .then((response) => (id = response.data.post_id));
  });

  test("Should add item to existing post", async () => {
    let response;
    response = await axios
      .delete(HOST + "/api/publish", {
        params: {
          post_id: id,
        },
        headers: {
          authorization: process.env.SELLER_TEST,
        },
      })
      .catch((err) => (response = err.response));

    expect(response.status).toBe(200);
  });
});
