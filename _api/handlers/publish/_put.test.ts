import { getRandomInteger } from "../../../shared/UtilityFunctions";
import axios from "axios";
import { execOnce } from "next/dist/shared/lib/utils";
require("dotenv").config();

const HOST = process.env.HOST || "http://localhost:3000";

jest.setTimeout(10000);
describe("publish page -- facebook integration _1 item manipulation ", function () {
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
        ).then(response => id = response.data.post_id)
  });

  test("Should add item to existing post", async () => {
    let response;
    response = await axios
      .put(
        HOST + "/api/publish",
        { update: { grouping: "61851a750fff42ddcda3e448" } },
        {
          params: {
            post_ids: [id],
            action: "add_to_set",
          },
          headers: {
            authorization: process.env.SELLER_TEST,
          },
        }
      )
      .catch((err) => (response = err.response));

    expect(response.status).toBe(200);
  });

  test("Should return 409 if item already exist", async () => {
    let response;
    response = await axios
      .put(
        HOST + "/api/publish",
        { update: { grouping: "61851a750fff42ddcda3e448" } },
        {
          params: {
            post_ids: [id],
            action: "add_to_set",
          },
          headers: {
            authorization: process.env.SELLER_TEST,
          },
        }
      )
      .catch((err) => (response = err.response));

    expect(response.status).toBe(409);
  });

  test("Should return 404 if the post_id is not found", async () => {
    let response;
    response = await axios
      .put(
        HOST + "/api/publish",
        { update: { grouping: "61851a750fff42ddcda3e448" } },
        {
          params: {
            post_ids: ["619b5580b56ebbf9948854c2"],
            action: "add_to_set",
          },
          headers: {
            authorization: process.env.SELLER_TEST,
          },
        }
      )
      .catch((err) => (response = err.response));

    expect(response.status).toBe(404);
  });

  test("Should return 500 if post_ids is corrupted", async () => {
    let response;
    response = await axios
      .put(
        HOST + "/api/publish",
        { update: { grouping: "61851a750fff42ddcda3e448" } },
        {
          params: {
            post_ids: ["random corrupted string"],
            action: "add_to_set",
          },
          headers: {
            authorization: process.env.SELLER_TEST,
          },
        }
      )
      .catch((err) => (response = err.response));
    expect(response.status).toBe(500);
  });
});

describe("publish page -- facebook integration _1 post data manipulation ", function () {
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
        ).then(response => id = response.data.post_id)
  });


  test("should change post message", async () => {
    let response;
    const randomString = getRandomInteger(100000000, 1).toString();
    response = await axios.put(
      HOST + "/api/publish",
      { update: { message: randomString } },
      {
        params: {
          post_ids: [id],
          action: "update_field",
        },
        headers: {
          authorization: process.env.SELLER_TEST,
        },
      }
    );

    let response_2;

    response_2 = await axios.get(HOST + "/api/publish", {
      params: {
        which: "with_id",
        _id: id,
      },
      headers: {
        authorization: process.env.SELLER_TEST,
      },
    });

    expect(response_2.data.post.message).toBe(randomString);
  });

  test("should change post name and message", async () => {
    let response;
    const randomString_message = getRandomInteger(100000000, 1).toString();
    const randomString_name = getRandomInteger(100000000, 1).toString();

    response = await axios.put(
      HOST + "/api/publish",
      {
        update: { message: randomString_message, post_name: randomString_name },
      },
      {
        params: {
          post_ids: [id],
          action: "update_field",
        },
        headers: {
          authorization: process.env.SELLER_TEST,
        },
      }
    );

    let response_2;

    response_2 = await axios.get(HOST + "/api/publish", {
      params: {
        which: "with_id",
        _id: id,
      },
      headers: {
        authorization: process.env.SELLER_TEST,
      },
    });

    expect(response_2.data.post.message).toBe(randomString_message);
    expect(response_2.data.post.post_name).toBe(randomString_name);
  });

});

export {};
