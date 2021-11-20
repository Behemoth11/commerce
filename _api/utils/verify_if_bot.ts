import axios from "axios";

const verify_if_bot = async (capt_token) => {
  const google_response = await axios
    .post("https://www.google.com/recaptcha/api/siteverify", null, {
      params: {
        secret: process.env.RE_SECRET_KEY,
        response: capt_token,
      },
    })
    .catch((err) => console.log(err.message));

  if (google_response) {
    if (
      google_response.data.success === true &&
      google_response.data.score >= 0.5
    ) {
      return true;
    }
  }

  return false;
};

export default verify_if_bot;
