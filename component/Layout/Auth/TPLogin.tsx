//@ts-ignore
import styles from "./style.module.css";

function TPLogin() {
  return (
    <div className={styles.TPContainer}>

      <div className={styles.TPheader}>
        <span>or</span>
      </div>
      <div className={styles.TPcontent}>
        <div className={styles.alternative}>
          <img
            src="/svg/google_icon.svg"
            id="google_icon"
            alt="login using coogle"
          />
          <label htmlFor="google_icon">Google</label>
        </div>
        
      </div>
    </div>
  );
}

export default TPLogin;
