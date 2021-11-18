//@ts-nocheck
import styles from "./style.module.css";
import { useEffect } from "react";

const Facebook = () => {
  useEffect(() => {
    if (!document || !window) return;
    console.log("The initializer ran")
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "971187146826531",
        cookie: true,
        xfbml: true,
        version: "v12.0",
      });

      window.FB.AppEvents.logPageView();
    };
  }, []);

  return (
    <>
      <div id="fb-root"></div>
      <div
        id="fb-customer-chat"
        attribution="biz_inbox"
        page_id="104940965341501"
        className="fb-customerchat"
      ></div>
    </>
  );
};

export default Facebook;
