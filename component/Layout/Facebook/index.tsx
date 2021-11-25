//@ts-nocheck
import styles from "./style.module.scss";
import { useEffect } from "react";

const Facebook = () => {
  useEffect(() => {
    if (!document || !window) return;
    console.log("The initializer ran")
    
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
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
        page_id={process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID}
        className="fb-customerchat"
      ></div>
    </>
  );
};

export default Facebook;
