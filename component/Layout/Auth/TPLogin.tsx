//@ts-ignore
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import { getGoogleAuthURL } from "../../../_api/utils/google_auth";
import {
  useUser,
  useAuthcontext,
  useMyWindow,
} from "../../../Contexts/GlobalContext";

function TPLogin({ setEditState }) {
  // const [google_url, setGoogle_url] = useState();

  const User = useUser();
  const auth = useAuthcontext();
  const myWindow = useMyWindow();
  const handleGoogleClick = () => {
    localStorage.setItem("meta_64", "0");

    const checker = setInterval(async () => {
      if (localStorage.getItem("meta_64") == "1") {
        clearInterval(checker);

        User.setUserData({ username: "loading" });
        myWindow.setHashLocation("");

        await auth.getNewToken();
        User.refresh();
      }
    }, 1000);
  };

  const handleFacebookLogin = async () => {
    const { authResponse, status } = await new Promise((resolve, reject) => {
      //@ts-ignore
      window.FB.getLoginStatus((response: { authResponse: {}; status: "" }) =>
        resolve(response)
      );
    });

    const act = async (authResponse) => {
      User.setUserData({ username: "loading" });
      myWindow.setHashLocation("");
  
      const response = await axios.post(`/api/auth/facebook`, {
        accessToken: authResponse.accessToken,
      });
      const data = response.data;
  
      User.setUserData(data.userData);
      auth.setToken(data.token);
    }

    if (status == "connected" && authResponse){
      act(authResponse)
    } else{
      //@ts-ignore
      window.FB.login((response) => {
        if (!response.authResponse) return;
        act(response.authResponse)
      })
    }


  };

  return (
    <div className={styles.TPContainer}>
      <div className={styles.TPheader}>
        <span>or</span>
      </div>
      <div className={styles.TPcontent}>
        <a
          href={
            `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&response_type=code&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${window.location.origin}/api/auth/google`
          }
          target={"blank"}
        >
          <div className={styles.alternative} onClick={handleGoogleClick}>
            <img
              src="/svg/google_icon.svg"
              id="google_icon"
              alt="login using coogle"
            />
            <label htmlFor="google_icon">Google</label>
          </div>
        </a>

        <div className={styles.alternative} onClick={handleFacebookLogin}>
          <img
            src="/svg/facebook_icon.svg"
            id="google_icon"
            alt="login using coogle"
          />
          <label htmlFor="google_icon">Facebook</label>
        </div>
      </div>
    </div>
  );
}

export default TPLogin;
