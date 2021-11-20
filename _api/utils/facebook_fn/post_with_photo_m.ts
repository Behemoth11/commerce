require("dotenv").config();
import axios from "axios";
const qs = require("qs");

const post_with_photo_m = async (message, ...urls) => {
  const photo_responses = await Promise.all(
    urls.map(
      async (url) =>
        (await axios
          .post("https://graph.facebook.com/104940965341501/photos", null, {
            params: {
              access_token: process.env.FACEBOOK_TOKEN,
              url,
              published: false,
            },
          })
          .catch((err) => console.error(err))) || { data: null }
    )
  );

  const request_body = {};
  photo_responses.forEach(
    (photo_response, index) =>
      photo_response &&
      (request_body[
        `attached_media[${index}]`
      ] = `{media_fbid:${photo_response.data.id}}`)
  );

  // console.log(request_body);

  let post_response;
  post_response = await axios
    .post(
      "https://graph.facebook.com/104940965341501/feed",
      qs.stringify(request_body),
      {
        params: { access_token: process.env.FACEBOOK_TOKEN, message },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .catch((err) => (post_response = err.response));

  return post_response.data;
};

export default post_with_photo_m;
