// @ts-ignore
import styles from "./style.module.css";
import { memo } from "react";

const CaptChat = () => {
  return (
    <div className={styles.captchat}>
      This site is protected by reCAPTCHA and the Google&nbsp;
      <a href="https://policies.google.com/privacy">Privacy Policy</a>&nbsp;
      and&nbsp;
      <a href="https://policies.google.com/terms">Terms of Service</a>&nbsp;
      apply.
    </div>
  );
};

export default CaptChat;
