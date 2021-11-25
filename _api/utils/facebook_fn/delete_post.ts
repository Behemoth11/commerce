import axios from "axios";

const delete_post = async (post_id) => {
  let response; 
  response =  await axios
    .delete(`https://graph.facebook.com/${post_id}`, {
      params: {
        access_token: process.env.FACEFACEBOOK_PAGE_ACCESS_TOKENBOOK_TOKEN,
      },
    })
    .catch((err) => console.error(err));
    
    return response.data;
};

export default delete_post;