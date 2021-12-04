import axios from "axios";
import { google } from "googleapis";

const getUrl = () => {
  let ssl;

  if (process.env.VERCEL_ENV == "development"){
    return`http://${process.env.VERCEL_URL}/api/auth/google`
  }
  const url = process.env.HOST_URI + "/api/auth/google";
  return url;
}

const oauth2Client = new google.auth.OAuth2(
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  getUrl()
);

export function getGoogleAuthURL() {
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes, // If you only need one scope you can pass it as string
  });
}

export async function getGoogleUser({ code }) {

  // console.log("Just before the supects")

  const { tokens } = await oauth2Client.getToken(code);
  // console.log("The tokens from the code : ", tokens)
  // console.log("Just after the suspect ")
  // Fetch the user's profile with the access token and bearer
  let response;
  response = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.id_token}`,
        },
      }
    )
    .catch((error) => {
      // console.log("the error I go from the request is : ", error);
      throw new Error(error.response);
    });

  return response.data;
}
