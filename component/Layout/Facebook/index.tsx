//@ts-nocheck
import styles from "./style.module.scss";
import { useEffect } from "react";

const Facebook = () => {
  useEffect(() => {
    if (!document || !window) return;
    // console.log("The initializer ran");

    window.fbAsyncInit = () => {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: "v12.0",
      });

      window.FB.AppEvents.logPageView();
    };

    // (function (d, s, id) {
    //   var js,
    //     fjs = d.getElementsByTagName(s)[0];
    //   if (d.getElementById(id)) return;
    //   js = d.createElement(s);
    //   js.id = id;
    //   js.src = "https://connect.facebook.net/fr_FR/sdk/xfbml.customerchat.js";
    //   fjs.parentNode.insertBefore(js, fjs);
    // })(document, "script", "facebook-jssdk");
    
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
