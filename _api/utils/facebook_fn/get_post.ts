import axios from "axios";

const get_post = async (post_id) => {
  return await axios
    .get(`https://graph.facebook.com/${post_id}`, {
      params: {
        access_token: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
      },
    })
    .catch((err) => console.error(err));
};

export default get_post;