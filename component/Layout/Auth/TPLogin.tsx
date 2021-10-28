//@ts-ignore
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./style.module.css";
import { getGoogleAuthURL } from "../../../_api/utils/google_auth";
import { useEffect, useState } from "react";

function TPLogin({setEditState}) {
  const [google_url, setGoogle_url] = useState();

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/auth/google");
      setGoogle_url(response.data.url);
    })();
  }, []);

  return (
    <div className={styles.TPContainer} onClick={() => setEditState("loading")} >
      <div className={styles.TPheader}>
        <span>or</span>
      </div>
      <div className={styles.TPcontent}>
        <a href={google_url} target={"blank"}>
          <div className={styles.alternative}>
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
