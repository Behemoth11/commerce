import axios from "axios";
import { google } from "googleapis";

const getUrl = () => {
  let ssl;

  if (process.env.VERCEL_ENV == "development"){
    ssl = "http://"
  }else  if (process.env.VERCEL_ENV == "production"){
    ssl = "https://"
  } else if (process.env.VERCEL_ENV == "preview"){
    ssl = "https://"
    return `https://commerce-behemoth11.vercel.app/api/auth/google`
  }
  const url = ssl + process.env.VERCEL_URL + "/api/auth/google";
  return url;
}

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
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
  const { tokens } = await oauth2Client.getToken(code);

  // Fetch the user's profile with the access token and bearer
  const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.id_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.message);
    });

  return googleUser;
}
