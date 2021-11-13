//@ts-ignore
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { getGoogleAuthURL } from "../../../_api/utils/google_auth";
import { useUser, useAuthcontext, useMyWindow } from "../../../Contexts/GlobalContext";

function TPLogin({setEditState}) {
  const [google_url, setGoogle_url] = useState();

  const User = useUser()  
  const auth = useAuthcontext()
  const myWindow = useMyWindow();
  const handleGoogleClick = () => {
    localStorage.setItem("meta_64", "0");

    const checker = setInterval( async () => {
      if (localStorage.getItem("meta_64") == "1"){
        User.setUserData({username: "loading"})
        await auth.getNewToken()
        myWindow.setHashLocation("")
        User.refresh()
        clearInterval(checker)
      }
    }, 1000)
  };


  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/auth/google");
      setGoogle_url(response.data.url);
    })();
  }, []);

  return (
    <div className={styles.TPContainer}>
      <div className={styles.TPheader}>
        <span>or</span>
      </div>
      <div className={styles.TPcontent}>
        <a href={google_url} target={"blank"}>
          <div className={styles.alternative} onClick={handleGoogleClick}>
            <img
              src="/svg/google_icon.svg"
              id="google_icon"
              alt="login using coogle"
            />
            <label htmlFor="google_icon">Google</label>
          </div>
        </a>
      </div>
    </div>
  );
}

export default TPLogin;
