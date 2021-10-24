import axios from "axios";
import { useRouter } from "next/router";
import MyImage from "../component/MyImage";
import styles from "../styles/account.module.css";
import React, { useState, useEffect } from "react";
import Input from "../component/Inputs/NormalInput";
import { useGlobalContext } from "../Contexts/GlobalContext";
import { useRequire } from "../shared/CustomHooks";

function Login() {
  const { User, auth } = useGlobalContext();
  useRequire("login");

  useEffect(() => {
    document.getElementById("__next").scroll(0, 0);
  }, []);

  return (
    <div className="big-container">
      <div className={styles.header}>
        <div>
          {(User.data?.pr_picture && (
            <MyImage
              isVisible={true}
              ASPECT_RATIO={100}
              no_optimization={true}
              imageLink={
                "https://images.unsplash.com/photo-1633957897986-70e83293f3ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=393&q=80"
              }
            />
          )) || (
            <div className={styles.imageReplacement}>
              <span>{User.data?.lastName.slice(0, 1)}{User.data?.firstName.slice(0, 1)}</span>
            </div>
          )}
        </div>
        <div>
          <p>
            {User.data?.firstName} {User.data?.lastName}--{" "}
            <span className="c-at">@{User.data?.username}</span>
          </p>
          <p className="c-th-5">{User.data?.role}</p>
        </div>
      </div>

      <div className={styles.body}>
        <div>
          <p>Open My Cart</p>
        </div>
        <div>
          <p>Become a seller</p>
        </div>
        <div>
          <p>Edit Profile</p>
        </div>
        <div>
          <p>Setting</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
