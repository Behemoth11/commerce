import { getRandomInteger } from "../../../shared/UtilityFunctions";
import axios from "axios";
import { execOnce } from "next/dist/shared/lib/utils";
require("dotenv").config();

const HOST = process.env.HOST || "http://localhost:3000";

jest.setTimeout(20000);
describe("publish page -- facebook integration _1 item manipulation _delete", () => {
  let id;
  test("Should add item to existing post", async () => {
    let response;
    response = await axios
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
            target: "group_post",
          },
        }
      )
      .catch((err) => (response = err.response));

    expect(response.status).toBe(200);
    expect(response.data.post_id).toBeDefined;
    id = response.data.post_id;
  });

  test("Should create facebook post from given id", async () => {
    let response;

    const product = await axios.get(HOST + "/api/product", {
      params: { limit: 1 },
    });

    console.log(product.data.products[0]._id)

    let _id;

    try {
      _id = product.data.products[0]._id;
    } catch (error) {
      throw new Error("No product was in the database");
    }

    response = await axios
      .post(
        HOST + "/api/publish",
        {
          _id,
          message: "Testing the api_automated",
        },
        {
          headers: {
            authorization: process.env.SELLER_TEST,
          },
          params: {
            target: "single",
          },
        }
      )
      .catch((err) => (response = err.response));

    expect(response.status).toBe(200);
    expect(typeof response.data.post_id).toBe("string");
  });

  test("Should delete newly created item", async () => {
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
